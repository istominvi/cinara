"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabaseBrowser = () =>
  createClientComponentClient<Database>();

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: "teacher" | "student" | "admin";
          full_name: string;
          phone: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          role: "teacher" | "student" | "admin";
          full_name: string;
          phone?: string | null;
          created_at?: string;
        };
        Update: {
          role?: "teacher" | "student" | "admin";
          full_name?: string;
          phone?: string | null;
        };
      };
    };
  };
};
