export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      data_verification: {
        Row: {
          created_at: string
          data_key: string
          id: string
          is_verified: boolean
          notes: string | null
          section: string
          source_url: string | null
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          data_key: string
          id?: string
          is_verified?: boolean
          notes?: string | null
          section: string
          source_url?: string | null
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          data_key?: string
          id?: string
          is_verified?: boolean
          notes?: string | null
          section?: string
          source_url?: string | null
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      gtm_content: {
        Row: {
          content_type: string
          content_value: Json
          created_at: string | null
          id: string
          section: string
          updated_at: string | null
        }
        Insert: {
          content_type: string
          content_value: Json
          created_at?: string | null
          id?: string
          section: string
          updated_at?: string | null
        }
        Update: {
          content_type?: string
          content_value?: Json
          created_at?: string | null
          id?: string
          section?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      gtm_phase_activities: {
        Row: {
          created_at: string
          description: string | null
          id: string
          order_index: number
          phase_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          phase_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          phase_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gtm_phase_activities_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "gtm_phases"
            referencedColumns: ["id"]
          },
        ]
      }
      gtm_phase_criteria: {
        Row: {
          created_at: string
          criterion: string
          id: string
          order_index: number
          phase_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          criterion: string
          id?: string
          order_index?: number
          phase_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          criterion?: string
          id?: string
          order_index?: number
          phase_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gtm_phase_criteria_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "gtm_phases"
            referencedColumns: ["id"]
          },
        ]
      }
      gtm_phase_metrics: {
        Row: {
          created_at: string
          current_value: string | null
          id: string
          metric_name: string
          order_index: number
          phase_id: string
          target_value: string
          unit: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_value?: string | null
          id?: string
          metric_name: string
          order_index?: number
          phase_id: string
          target_value: string
          unit?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_value?: string | null
          id?: string
          metric_name?: string
          order_index?: number
          phase_id?: string
          target_value?: string
          unit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gtm_phase_metrics_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "gtm_phases"
            referencedColumns: ["id"]
          },
        ]
      }
      gtm_phases: {
        Row: {
          created_at: string
          description: string
          features_goal: string | null
          id: string
          name: string
          phase_number: number
          revenue_goal: string | null
          status: string
          timeline: string
          updated_at: string
          users_goal: string | null
        }
        Insert: {
          created_at?: string
          description: string
          features_goal?: string | null
          id?: string
          name: string
          phase_number: number
          revenue_goal?: string | null
          status?: string
          timeline: string
          updated_at?: string
          users_goal?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          features_goal?: string | null
          id?: string
          name?: string
          phase_number?: number
          revenue_goal?: string | null
          status?: string
          timeline?: string
          updated_at?: string
          users_goal?: string | null
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
