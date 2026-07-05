export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          email: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          email: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          email?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          doctor_id: string
          first_name: string
          last_name: string
          phone: string | null
          email: string | null
          birth_date: string | null
          gender: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          doctor_id: string
          first_name: string
          last_name: string
          phone?: string | null
          email?: string | null
          birth_date?: string | null
          gender?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          doctor_id?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          email?: string | null
          birth_date?: string | null
          gender?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      encounters: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          chief_complaint: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          chief_complaint?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string
          chief_complaint?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      clinical_notes: {
        Row: {
          id: string
          encounter_id: string
          doctor_id: string
          note_type: string
          content: Json
          created_by: string
          review_status: string
          approved_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          encounter_id: string
          doctor_id: string
          note_type: string
          content: Json
          created_by: string
          review_status?: string
          approved_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          encounter_id?: string
          doctor_id?: string
          note_type?: string
          content?: Json
          created_by?: string
          review_status?: string
          approved_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      audio_sessions: {
        Row: {
          id: string
          encounter_id: string
          doctor_id: string
          audio_url: string | null
          transcript: string | null
          status: string
          error_message: string | null
          created_at: string
          processed_at: string | null
        }
        Insert: {
          id?: string
          encounter_id: string
          doctor_id: string
          audio_url?: string | null
          transcript?: string | null
          status?: string
          error_message?: string | null
          created_at?: string
          processed_at?: string | null
        }
        Update: {
          id?: string
          encounter_id?: string
          doctor_id?: string
          audio_url?: string | null
          transcript?: string | null
          status?: string
          error_message?: string | null
          created_at?: string
          processed_at?: string | null
        }
      }
      audit_logs: {
        Row: {
          id: string
          doctor_id: string
          action: string
          entity_type: string
          entity_id: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          doctor_id: string
          action: string
          entity_type: string
          entity_id: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          doctor_id?: string
          action?: string
          entity_type?: string
          entity_id?: string
          metadata?: Json | null
          created_at?: string
        }
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
  }
}
