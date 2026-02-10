import { redirect } from "next/navigation";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { supabaseServer } from "@/lib/supabase/server";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = supabaseServer() as any;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/auth?role=student");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!profile) {
    redirect("/auth");
  }

  if (profile.role !== "student") {
    redirect(profile.role === "teacher" ? "/teacher" : "/admin");
  }

  return (
    <DashboardLayout
      title="Кабинет ученика"
      navItems={[
        { href: "/student", label: "Дашборд" },
        { href: "/student/homework", label: "Домашние задания" },
        { href: "/student/schedule", label: "Расписание" },
        { href: "/student/messages", label: "Сообщения" },
        { href: "/student/dictionary", label: "Словарь" },
        { href: "/student/progress", label: "Прогресс" },
      ]}
    >
      {children}
    </DashboardLayout>
  );
}
