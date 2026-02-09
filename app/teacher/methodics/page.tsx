import Link from "next/link";

export default function TeacherMethodicsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Методики</h1>
      <p className="text-muted-foreground">
        TODO: список методик с paywall. Пока доступна демо-методика.
      </p>
      <Link
        href="/teacher/methodics/basic"
        className="inline-flex rounded-md border px-4 py-2 text-sm hover:bg-muted"
      >
        Открыть демо-методику
      </Link>
    </div>
  );
}
