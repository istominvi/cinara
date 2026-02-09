export default function TeacherLessonPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        {params.slug}: урок {params.id}
      </h1>
      <p className="text-muted-foreground">
        TODO: загрузить контент урока, материалы и шаблон ДЗ.
      </p>
    </div>
  );
}
