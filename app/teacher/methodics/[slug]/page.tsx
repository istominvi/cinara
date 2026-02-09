import Link from "next/link";

export default function TeacherMethodicDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const lessons = Array.from({ length: 5 }).map((_, index) => ({
    id: index + 1,
    title: `Урок ${index + 1}`,
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Методика: {params.slug}</h1>
      <p className="text-muted-foreground">
        TODO: проверить подписку и разблокировать уроки. Пока доступен только
        первый урок.
      </p>
      <div className="space-y-2">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between rounded-md border p-3"
          >
            <div>{lesson.title}</div>
            {lesson.id === 1 ? (
              <Link
                className="text-sm text-primary hover:underline"
                href={`/teacher/methodics/${params.slug}/lessons/${lesson.id}`}
              >
                Открыть
              </Link>
            ) : (
              <span className="text-sm text-muted-foreground">Locked</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
