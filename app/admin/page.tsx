import { redirect } from "next/navigation";

import { supabaseServer } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/auth");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/auth");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Админка</h1>
      <p className="text-muted-foreground">
        Заглушка для админ-панели. TODO: управление методиками, пользователями и
        подписками.
      </p>
    </div>
  );
}
