import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/lib/supabase/client";

export const supabaseServer = () =>
  createServerComponentClient<Database>({
    cookies,
  });
