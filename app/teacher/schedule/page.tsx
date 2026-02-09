import { SchedulePanel } from "@/components/teacher/schedule-panel";

export default function TeacherSchedulePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Расписание</h1>
      <p className="text-muted-foreground">
        Создавайте занятия для ученика или группы и делитесь ссылкой на комнату.
      </p>
      <SchedulePanel />
    </div>
  );
}
