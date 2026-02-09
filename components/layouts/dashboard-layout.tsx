import Link from "next/link";

import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

type DashboardLayoutProps = {
  title: string;
  navItems: NavItem[];
  children: React.ReactNode;
};

export function DashboardLayout({ title, navItems, children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/20 p-6">
        <div className="text-xl font-semibold">{title}</div>
        <nav className="mt-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
