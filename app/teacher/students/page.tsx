import Link from "next/link";

export default function TeacherStudentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Ученики и группы</h1>
      <p className="text-muted-foreground">
        TODO: создать группу, добавить ученика по email/телефону, инвайты.
      </p>
      <div className="flex gap-2">
        <Link
          href="/invite/demo-token"
          className="inline-flex rounded-md border px-4 py-2 text-sm hover:bg-muted"
        >
          Создать инвайт (демо)
        </Link>
      </div>
    </div>
  );
}
