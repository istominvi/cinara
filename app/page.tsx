import Link from "next/link";

import { AuthMenu } from "@/components/landing/auth-menu";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="text-xl font-semibold">Cinara</div>
        <AuthMenu />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-4xl font-semibold">Методики и онлайн-уроки китайского</h1>
        <p className="max-w-2xl text-muted-foreground">
          Cinara.ru — платформа для учителей и школ: методики, расписание,
          домашние задания, словарь и коммуникации. Скоро здесь будет полноценный
          продукт.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/auth?role=teacher">Я учитель</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/auth?role=student">Я ученик</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
