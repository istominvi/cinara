"use client";

import * as React from "react";
import Link from "next/link";

export type Session = {
  id: string;
  starts_at: string;
  duration_min: number;
  meeting_room_key: string;
  status: string;
};

export function StudentScheduleList() {
  const [sessions, setSessions] = React.useState<Session[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/sessions");
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error ?? "Не удалось загрузить занятия.");
        return;
      }

      setSessions(payload.sessions ?? []);
    };

    load();
  }, []);

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (sessions.length === 0) {
    return <p className="text-sm text-muted-foreground">Занятий пока нет.</p>;
  }

  return (
    <div className="space-y-2">
      {sessions.map((session) => (
        <div key={session.id} className="rounded-md border p-3 text-sm">
          <div className="font-medium">
            {new Date(session.starts_at).toLocaleString()}
          </div>
          <div className="text-muted-foreground">
            Длительность: {session.duration_min} мин
          </div>
          <Link
            href={`/classrooms/${session.meeting_room_key}`}
            className="mt-2 inline-flex text-sm text-primary hover:underline"
          >
            Присоединиться
          </Link>
        </div>
      ))}
    </div>
  );
}
