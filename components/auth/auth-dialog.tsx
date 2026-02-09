"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { AuthForm } from "@/components/auth/auth-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type Role = "teacher" | "student";

type AuthDialogProps = {
  defaultRole?: Role;
  triggerLabel?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function AuthDialog({
  defaultRole,
  triggerLabel,
  open,
  onOpenChange,
}: AuthDialogProps) {
  const searchParams = useSearchParams();
  const queryRole = searchParams.get("role") as Role | null;
  const initialRole = queryRole ?? defaultRole ?? "teacher";
  const [role, setRole] = React.useState<Role>(initialRole);

  React.useEffect(() => {
    if (queryRole && (queryRole === "teacher" || queryRole === "student")) {
      setRole(queryRole);
    }
  }, [queryRole]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {triggerLabel ? (
        <DialogTrigger asChild>
          <Button variant="outline">{triggerLabel}</Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Вход в Cinara</DialogTitle>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}
