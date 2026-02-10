"use client";

import * as React from "react";
import { Suspense } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { AuthDialog } from "@/components/auth/auth-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Role = "teacher" | "student";

export function AuthMenu() {
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState<Role>("teacher");

  return (
    <div className="relative">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">Вход</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          align="end"
          className="mt-2 w-48 rounded-md border bg-background p-1 shadow-lg"
        >
          <DropdownMenu.Item
            onSelect={() => {
              setRole("teacher");
              setOpen(true);
            }}
            className={cn(
              "cursor-pointer rounded-sm px-3 py-2 text-sm outline-none hover:bg-muted",
            )}
          >
            Вход
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => {
              setRole("student");
              setOpen(true);
            }}
            className={cn(
              "cursor-pointer rounded-sm px-3 py-2 text-sm outline-none hover:bg-muted",
            )}
          >
            Ученик
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => {
              setRole("teacher");
              setOpen(true);
            }}
            className={cn(
              "cursor-pointer rounded-sm px-3 py-2 text-sm outline-none hover:bg-muted",
            )}
          >
            Учитель
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Suspense fallback={null}>
        <AuthDialog
          defaultRole={role}
          open={open}
          onOpenChange={setOpen}
        />
      </Suspense>
    </div>
  );
}
