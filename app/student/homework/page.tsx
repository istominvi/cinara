import Link from "next/link";

export default function StudentHomeworkPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Домашние задания</h1>
      <p className="text-muted-foreground">
        TODO: список назначенных ДЗ.
      </p>
      <Link
        href="/student/homework/demo-assignment"
        className="inline-flex rounded-md border px-4 py-2 text-sm hover:bg-muted"
      >
        Открыть демо ДЗ
      </Link>
    </div>
  );
}
