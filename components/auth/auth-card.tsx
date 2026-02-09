"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { AuthForm } from "@/components/auth/auth-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Role = "teacher" | "student";

export function AuthCard() {
  const searchParams = useSearchParams();
  const queryRole = searchParams.get("role") as Role | null;
  const [role, setRole] = React.useState<Role>(queryRole ?? "teacher");

  React.useEffect(() => {
    if (queryRole && (queryRole === "teacher" || queryRole === "student")) {
      setRole(queryRole);
    }
  }, [queryRole]);

  return (
    <Tabs value={role} onValueChange={(value) => setRole(value as Role)}>
      <TabsList className="w-full">
        <TabsTrigger value="student" className="flex-1">
          Ученик
        </TabsTrigger>
        <TabsTrigger value="teacher" className="flex-1">
          Учитель
        </TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <AuthForm role="student" />
      </TabsContent>
      <TabsContent value="teacher">
        <AuthForm role="teacher" />
      </TabsContent>
    </Tabs>
  );
}
