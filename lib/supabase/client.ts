"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabaseBrowser = () =>
  createClientComponentClient<Database>();

type Role = "teacher" | "student" | "admin";

type GenericTable = {
  Row: Record<string, any>;
  Insert: Record<string, any>;
  Update: Record<string, any>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      [key: string]: GenericTable;
      profiles: {
        Row: {
          id: string;
          role: Role;
          full_name: string;
          phone: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          role: Role;
          full_name: string;
          phone?: string | null;
          created_at?: string;
        };
        Update: {
          role?: Role;
          full_name?: string;
          phone?: string | null;
        };
        Relationships: [];
      };
      invites: {
        Row: {
          id: string;
          token: string;
          invite_type: "student" | "teacher" | "workspace_teacher";
          workspace_id: string | null;
          teacher_id: string | null;
          student_email: string | null;
          student_phone: string | null;
          expires_at: string | null;
          created_at: string;
          accepted_at: string | null;
        };
        Insert: Record<string, any>;
        Update: Record<string, any>;
        Relationships: [];
      };
      teacher_students: {
        Row: Record<string, any>;
        Insert: {
          teacher_id: string;
          student_id: string;
          workspace_id?: string | null;
        };
        Update: Record<string, any>;
        Relationships: [];
      };
      workspace_members: {
        Row: Record<string, any>;
        Insert: {
          workspace_id: string;
          user_id: string;
          role?: "owner" | "admin" | "member";
        };
        Update: Record<string, any>;
        Relationships: [];
      };
      class_sessions: {
        Row: Record<string, any>;
        Insert: Record<string, any>;
        Update: Record<string, any>;
        Relationships: [];
      };
    };
  };
};
