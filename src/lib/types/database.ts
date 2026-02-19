export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            activity_log: {
                Row: {
                    action: string
                    created_at: string
                    id: string
                    metadata: Json | null
                    target_id: string | null
                    target_type: string | null
                    user_id: string | null
                    wedding_id: string
                }
                Insert: {
                    action: string
                    created_at?: string
                    id?: string
                    metadata?: Json | null
                    target_id?: string | null
                    target_type?: string | null
                    user_id?: string | null
                    wedding_id: string
                }
                Update: {
                    action?: string
                    created_at?: string
                    id?: string
                    metadata?: Json | null
                    target_id?: string | null
                    target_type?: string | null
                    user_id?: string | null
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "activity_log_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "activity_log_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            budget_items: {
                Row: {
                    actual: number | null
                    budgeted: number | null
                    category: string
                    created_at: string
                    id: string
                    notes: string | null
                    updated_at: string
                    wedding_id: string
                }
                Insert: {
                    actual?: number | null
                    budgeted?: number | null
                    category: string
                    created_at?: string
                    id?: string
                    notes?: string | null
                    updated_at?: string
                    wedding_id: string
                }
                Update: {
                    actual?: number | null
                    budgeted?: number | null
                    category?: string
                    created_at?: string
                    id?: string
                    notes?: string | null
                    updated_at?: string
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "budget_items_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            decor_plans: {
                Row: {
                    colors: string | null
                    created_at: string
                    event_id: string | null
                    highlight: string | null
                    id: string
                    notes: string | null
                    theme: string
                    updated_at: string
                    wedding_id: string
                }
                Insert: {
                    colors?: string | null
                    created_at?: string
                    event_id?: string | null
                    highlight?: string | null
                    id?: string
                    notes?: string | null
                    theme: string
                    updated_at?: string
                    wedding_id: string
                }
                Update: {
                    colors?: string | null
                    created_at?: string
                    event_id?: string | null
                    highlight?: string | null
                    id?: string
                    notes?: string | null
                    theme?: string
                    updated_at?: string
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "decor_plans_event_id_fkey"
                        columns: ["event_id"]
                        isOneToOne: false
                        referencedRelation: "events"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "decor_plans_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            event_guests: {
                Row: {
                    created_at: string
                    event_id: string
                    guest_id: string
                    rsvp_status: string | null
                }
                Insert: {
                    created_at?: string
                    event_id: string
                    guest_id: string
                    rsvp_status?: string | null
                }
                Update: {
                    created_at?: string
                    event_id?: string
                    guest_id?: string
                    rsvp_status?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "event_guests_event_id_fkey"
                        columns: ["event_id"]
                        isOneToOne: false
                        referencedRelation: "events"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "event_guests_guest_id_fkey"
                        columns: ["guest_id"]
                        isOneToOne: false
                        referencedRelation: "guests"
                        referencedColumns: ["id"]
                    },
                ]
            }
            events: {
                Row: {
                    created_at: string
                    date: string | null
                    end_time: string | null
                    id: string
                    name: string
                    notes: string | null
                    start_time: string | null
                    status: string
                    updated_at: string
                    wedding_id: string
                }
                Insert: {
                    created_at?: string
                    date?: string | null
                    end_time?: string | null
                    id?: string
                    name: string
                    notes?: string | null
                    start_time?: string | null
                    status?: string
                    updated_at?: string
                    wedding_id: string
                }
                Update: {
                    created_at?: string
                    date?: string | null
                    end_time?: string | null
                    id?: string
                    name?: string
                    notes?: string | null
                    start_time?: string | null
                    status?: string
                    updated_at?: string
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "events_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            food_menus: {
                Row: {
                    created_at: string
                    event_id: string | null
                    headcount: number | null
                    id: string
                    items: Json | null
                    menu_type: string
                    status: string
                    updated_at: string
                    wedding_id: string
                }
                Insert: {
                    created_at?: string
                    event_id?: string | null
                    headcount?: number | null
                    id?: string
                    items?: Json | null
                    menu_type: string
                    status?: string
                    updated_at?: string
                    wedding_id: string
                }
                Update: {
                    created_at?: string
                    event_id?: string | null
                    headcount?: number | null
                    id?: string
                    items?: Json | null
                    menu_type?: string
                    status?: string
                    updated_at?: string
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "food_menus_event_id_fkey"
                        columns: ["event_id"]
                        isOneToOne: false
                        referencedRelation: "events"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "food_menus_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            gifts: {
                Row: {
                    created_at: string
                    description: string
                    estimated_value: number | null
                    from_name: string
                    id: string
                    thank_you_status: string
                    updated_at: string
                    wedding_id: string
                }
                Insert: {
                    created_at?: string
                    description: string
                    estimated_value?: number | null
                    from_name: string
                    id?: string
                    thank_you_status?: string
                    updated_at?: string
                    wedding_id: string
                }
                Update: {
                    created_at?: string
                    description?: string
                    estimated_value?: number | null
                    from_name?: string
                    id?: string
                    thank_you_status?: string
                    updated_at?: string
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "gifts_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            guests: {
                Row: {
                    count: number | null
                    created_at: string
                    email: string | null
                    id: string
                    name: string
                    notes: string | null
                    phone: string | null
                    rsvp: string
                    side: string | null
                    updated_at: string
                    wedding_id: string
                }
                Insert: {
                    count?: number | null
                    created_at?: string
                    email?: string | null
                    id?: string
                    name: string
                    notes?: string | null
                    phone?: string | null
                    rsvp?: string
                    side?: string | null
                    updated_at?: string
                    wedding_id: string
                }
                Update: {
                    count?: number | null
                    created_at?: string
                    email?: string | null
                    id?: string
                    name?: string
                    notes?: string | null
                    phone?: string | null
                    rsvp?: string
                    side?: string | null
                    updated_at?: string
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "guests_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            invitations: {
                Row: {
                    channel: string | null
                    created_at: string
                    delivered_count: number | null
                    design_name: string | null
                    event_id: string | null
                    id: string
                    opened_count: number | null
                    sent_count: number | null
                    template_url: string | null
                    updated_at: string
                    wedding_id: string
                }
                Insert: {
                    channel?: string | null
                    created_at?: string
                    delivered_count?: number | null
                    design_name?: string | null
                    event_id?: string | null
                    id?: string
                    opened_count?: number | null
                    sent_count?: number | null
                    template_url?: string | null
                    updated_at?: string
                    wedding_id: string
                }
                Update: {
                    channel?: string | null
                    created_at?: string
                    delivered_count?: number | null
                    design_name?: string | null
                    event_id?: string | null
                    id?: string
                    opened_count?: number | null
                    sent_count?: number | null
                    template_url?: string | null
                    updated_at?: string
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "invitations_event_id_fkey"
                        columns: ["event_id"]
                        isOneToOne: false
                        referencedRelation: "events"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "invitations_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            itinerary_slots: {
                Row: {
                    activity: string
                    created_at: string
                    event_id: string
                    id: string
                    responsible: string | null
                    sort_order: number | null
                    time: string | null
                    updated_at: string
                }
                Insert: {
                    activity: string
                    created_at?: string
                    event_id: string
                    id?: string
                    responsible?: string | null
                    sort_order?: number | null
                    time?: string | null
                    updated_at?: string
                }
                Update: {
                    activity?: string
                    created_at?: string
                    event_id?: string
                    id?: string
                    responsible?: string | null
                    sort_order?: number | null
                    time?: string | null
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "itinerary_slots_event_id_fkey"
                        columns: ["event_id"]
                        isOneToOne: false
                        referencedRelation: "events"
                        referencedColumns: ["id"]
                    },
                ]
            }
            notifications: {
                Row: {
                    created_at: string
                    id: string
                    message: string
                    read: boolean | null
                    type: string
                    user_id: string
                    wedding_id: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    message: string
                    read?: boolean | null
                    type: string
                    user_id: string
                    wedding_id: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    message?: string
                    read?: boolean | null
                    type?: string
                    user_id?: string
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "notifications_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "notifications_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            tasks: {
                Row: {
                    assignee_id: string | null
                    created_at: string
                    due_date: string | null
                    id: string
                    priority: string
                    status: string
                    title: string
                    updated_at: string
                    wedding_id: string
                }
                Insert: {
                    assignee_id?: string | null
                    created_at?: string
                    due_date?: string | null
                    id?: string
                    priority?: string
                    status?: string
                    title: string
                    updated_at?: string
                    wedding_id: string
                }
                Update: {
                    assignee_id?: string | null
                    created_at?: string
                    due_date?: string | null
                    id?: string
                    priority?: string
                    status?: string
                    title?: string
                    updated_at?: string
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "tasks_assignee_id_fkey"
                        columns: ["assignee_id"]
                        isOneToOne: false
                        referencedRelation: "wedding_members"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "tasks_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            travel_plans: {
                Row: {
                    arrival_datetime: string | null
                    created_at: string
                    details: string | null
                    guest_id: string
                    id: string
                    mode: string | null
                    pickup_status: string
                    updated_at: string
                    wedding_id: string
                }
                Insert: {
                    arrival_datetime?: string | null
                    created_at?: string
                    details?: string | null
                    guest_id: string
                    id?: string
                    mode?: string | null
                    pickup_status?: string
                    updated_at?: string
                    wedding_id: string
                }
                Update: {
                    arrival_datetime?: string | null
                    created_at?: string
                    details?: string | null
                    guest_id?: string
                    id?: string
                    mode?: string | null
                    pickup_status?: string
                    updated_at?: string
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "travel_plans_guest_id_fkey"
                        columns: ["guest_id"]
                        isOneToOne: false
                        referencedRelation: "guests"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "travel_plans_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            users: {
                Row: {
                    avatar_url: string | null
                    created_at: string
                    email: string
                    id: string
                    name: string
                    phone: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string
                    email: string
                    id: string
                    name?: string
                    phone?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string
                    email?: string
                    id?: string
                    name?: string
                    phone?: string | null
                }
                Relationships: []
            }
            vendors: {
                Row: {
                    amount: number | null
                    category: string
                    created_at: string
                    email: string | null
                    id: string
                    name: string
                    notes: string | null
                    payment_status: string
                    phone: string | null
                    rating: number | null
                    updated_at: string
                    wedding_id: string
                }
                Insert: {
                    amount?: number | null
                    category: string
                    created_at?: string
                    email?: string | null
                    id?: string
                    name: string
                    notes?: string | null
                    payment_status?: string
                    phone?: string | null
                    rating?: number | null
                    updated_at?: string
                    wedding_id: string
                }
                Update: {
                    amount?: number | null
                    category?: string
                    created_at?: string
                    email?: string | null
                    id?: string
                    name?: string
                    notes?: string | null
                    payment_status?: string
                    phone?: string | null
                    rating?: number | null
                    updated_at?: string
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "vendors_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            venues: {
                Row: {
                    address: string | null
                    assigned_rooms: number | null
                    contact_name: string | null
                    contact_phone: string | null
                    cost: number | null
                    created_at: string
                    event_id: string | null
                    id: string
                    name: string
                    status: string
                    total_rooms: number | null
                    updated_at: string
                    wedding_id: string
                }
                Insert: {
                    address?: string | null
                    assigned_rooms?: number | null
                    contact_name?: string | null
                    contact_phone?: string | null
                    cost?: number | null
                    created_at?: string
                    event_id?: string | null
                    id?: string
                    name: string
                    status?: string
                    total_rooms?: number | null
                    updated_at?: string
                    wedding_id: string
                }
                Update: {
                    address?: string | null
                    assigned_rooms?: number | null
                    contact_name?: string | null
                    contact_phone?: string | null
                    cost?: number | null
                    created_at?: string
                    event_id?: string | null
                    id?: string
                    name?: string
                    status?: string
                    total_rooms?: number | null
                    updated_at?: string
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "venues_event_id_fkey"
                        columns: ["event_id"]
                        isOneToOne: false
                        referencedRelation: "events"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "venues_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            wedding_members: {
                Row: {
                    created_at: string
                    id: string
                    invited_email: string | null
                    modules: string[] | null
                    role: string
                    status: string
                    updated_at: string
                    user_id: string
                    wedding_id: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    invited_email?: string | null
                    modules?: string[] | null
                    role: string
                    status?: string
                    updated_at?: string
                    user_id: string
                    wedding_id: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    invited_email?: string | null
                    modules?: string[] | null
                    role?: string
                    status?: string
                    updated_at?: string
                    user_id?: string
                    wedding_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "wedding_members_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "wedding_members_wedding_id_fkey"
                        columns: ["wedding_id"]
                        isOneToOne: false
                        referencedRelation: "weddings"
                        referencedColumns: ["id"]
                    },
                ]
            }
            weddings: {
                Row: {
                    bride_name: string
                    created_at: string
                    created_by: string | null
                    groom_name: string
                    id: string
                    plan: string
                    total_budget: number | null
                    updated_at: string
                    wedding_date: string | null
                }
                Insert: {
                    bride_name: string
                    created_at?: string
                    created_by?: string | null
                    groom_name: string
                    id?: string
                    plan?: string
                    total_budget?: number | null
                    updated_at?: string
                    wedding_date?: string | null
                }
                Update: {
                    bride_name?: string
                    created_at?: string
                    created_by?: string | null
                    groom_name?: string
                    id?: string
                    plan?: string
                    total_budget?: number | null
                    updated_at?: string
                    wedding_date?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "weddings_created_by_fkey"
                        columns: ["created_by"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
