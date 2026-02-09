import { redirect } from "next/navigation";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { supabaseServer } from "@/lib/supabase/server";

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/auth?role=teacher");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!profile) {
    redirect("/auth");
  }

  if (profile.role !== "teacher") {
    redirect(profile.role === "student" ? "/student" : "/admin");
  }

  return (
    <DashboardLayout
      title="Кабинет учителя"
      navItems={[
        { href: "/teacher", label: "Дашборд" },
        { href: "/teacher/methodics", label: "Методики" },
        { href: "/teacher/students", label: "Ученики и группы" },
        { href: "/teacher/schedule", label: "Расписание" },
        { href: "/teacher/messages", label: "Сообщения" },
        { href: "/teacher/settings/team", label: "Команда" },
        { href: "/teacher/settings/billing", label: "Оплата" },
      ]}
    >
      {children}
    </DashboardLayout>
  );
}
