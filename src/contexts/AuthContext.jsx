
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        // 1. Check active session
        const initSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                await fetchUserData(session.user);
            } else {
                setLoading(false);
            }
        };

        initSession();

        // 2. Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                if (user?.id !== session.user.id) {
                    await fetchUserData(session.user);
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchUserData = async (authUser) => {
        try {
            const [profileRes, memberRes] = await Promise.all([
                supabase.from('users').select('*').eq('id', authUser.id).single(),
                supabase.from('wedding_members').select('*').eq('user_id', authUser.id).maybeSingle()
            ]);

            const profile = profileRes.data;
            const member = memberRes.data;

            let wedding = null;
            if (member?.wedding_id) {
                const { data } = await supabase.from('weddings').select('*').eq('id', member.wedding_id).single();
                wedding = data;
            }

            setUser({
                id: authUser.id,
                email: authUser.email,
                name: profile?.name || authUser.user_metadata?.name,
                phone: profile?.phone,
                avatar_url: profile?.avatar_url,
                // Wedding Context
                role: member?.role || 'viewer',
                modules: member?.modules || [],
                weddingId: member?.wedding_id,
                // Flattened wedding details
                brideName: wedding?.bride_name || '',
                groomName: wedding?.groom_name || '',
                weddingDate: wedding?.wedding_date || '',
                plan: wedding?.plan || 'mangal',
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true };
    };

    const signup = async (data) => {
        try {
            // 1. SignUp
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        name: data.name,
                        phone: data.phone, // Store in metadata too as backup
                    },
                },
            });

            if (authError) throw authError;

            if (authData.user && !authData.session) {
                return { success: true, message: "Please check your email to confirm signup." };
            }

            if (authData.session) {
                // 2. Setup Wedding
                const res = await fetch('/api/weddings/setup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        brideName: data.brideName,
                        groomName: data.groomName,
                        weddingDate: data.weddingDate,
                        plan: data.plan
                    })
                });

                const result = await res.json();
                if (!res.ok) throw new Error(result.error || 'Setup failed');

                // 3. Refresh user data
                await fetchUserData(authData.user);
                return { success: true };
            }

            return { success: false, error: "Unexpected auth state" };

        } catch (error) {
            console.error("Signup error:", error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push('/login');
    };

    const updateUser = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
