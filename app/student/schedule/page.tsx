import { StudentScheduleList } from "@/components/student/schedule-list";

export default function StudentSchedulePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Расписание</h1>
      <p className="text-muted-foreground">
        Ваши ближайшие занятия и ссылки на подключение.
      </p>
      <StudentScheduleList />
    </div>
  );
}
