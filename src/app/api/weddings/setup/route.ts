
import { type NextRequest } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { apiSuccess, apiError } from '@/lib/utils/api-response'
import { setupSchema } from '@/lib/utils/validate'

export async function POST(request: NextRequest) {
    try {
        // 1. Authenticate User (Current Session)
        const supabase = await createClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return apiError('Unauthorized', 401)
        }

        // 2. Validate Input
        const body = await request.json()
        const validation = setupSchema.safeParse(body)

        if (!validation.success) {
            return apiError(validation.error.errors[0].message, 400)
        }

        const { brideName, groomName, weddingDate, plan } = validation.data

        // 3. Use Service Role Client for Admin Operations (Bypass RLS)
        // We need this to ensure both wedding and member are created successfully
        const adminClient = createAdminClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_SECRET_KEY!,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false,
                },
            }
        )

        // 4. Create Wedding
        const { data: wedding, error: weddingError } = await adminClient
            .from('weddings')
            .insert({
                bride_name: brideName,
                groom_name: groomName,
                wedding_date: weddingDate ? new Date(weddingDate).toISOString() : null,
                plan: plan, // 'mangal', 'shubh', etc.
                created_by: user.id
            })
            .select()
            .single()

        if (weddingError) {
            console.error('Wedding creation failed:', weddingError)
            throw new Error('Failed to create wedding')
        }

        // 5. Create Wedding Member (Admin)
        const { error: memberError } = await adminClient
            .from('wedding_members')
            .insert({
                wedding_id: wedding.id,
                user_id: user.id,
                role: 'admin',
                status: 'active',
                modules: [] // Default access to no special modules? Or all? Admin implies full access usually.
            })

        if (memberError) {
            console.error('Member creation failed:', memberError)
            // Rollback wedding
            await adminClient.from('weddings').delete().eq('id', wedding.id)
            throw new Error('Failed to assign admin role')
        }

        // 6. Return Success
        return apiSuccess({
            wedding,
            message: 'Wedding setup complete'
        })

    } catch (error: any) {
        console.error('Setup error:', error)
        return apiError(error.message || 'Internal Server Error', 500)
    }
}
