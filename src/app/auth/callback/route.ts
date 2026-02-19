
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            return NextResponse.redirect(`${request.nextUrl.origin}${next}`)
        }
    }

    // return the user to an error page with instructions
    // TODO: Create a proper error page
    return NextResponse.redirect(`${request.nextUrl.origin}/login?error=auth`)
}
