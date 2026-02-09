export default function StudentHomeworkDetailPage({
  params,
}: {
  params: { assignmentId: string };
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        ДЗ: {params.assignmentId}
      </h1>
      <p className="text-muted-foreground">
        TODO: показать требования, прогресс и прикрепленные материалы.
      </p>
    </div>
  );
}
