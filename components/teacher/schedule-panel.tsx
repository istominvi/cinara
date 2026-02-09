"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TARGET_OPTIONS = [
  { value: "student", label: "Ученик" },
  { value: "group", label: "Группа" },
];

type Session = {
  id: string;
  starts_at: string;
  duration_min: number;
  meeting_room_key: string;
  target_type: string;
  target_id: string;
  status: string;
};

export function SchedulePanel() {
  const [sessions, setSessions] = React.useState<Session[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const loadSessions = React.useCallback(async () => {
    const response = await fetch("/api/sessions");
    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error ?? "Не удалось загрузить занятия.");
      return;
    }

    setSessions(payload.sessions ?? []);
  }, []);

  React.useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const targetType = String(formData.get("targetType"));
    const targetId = String(formData.get("targetId") || "").trim();
    const startsAt = String(formData.get("startsAt") || "");
    const durationMin = Number(formData.get("durationMin") || 60);

    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetType, targetId, startsAt, durationMin }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error ?? "Не удалось создать занятие.");
      setLoading(false);
      return;
    }

    await loadSessions();
    event.currentTarget.reset();
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="targetType">Тип занятия</Label>
          <select
            id="targetType"
            name="targetType"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            defaultValue="student"
          >
            {TARGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="targetId">ID ученика/группы</Label>
          <Input id="targetId" name="targetId" placeholder="UUID" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startsAt">Дата и время</Label>
          <Input id="startsAt" name="startsAt" type="datetime-local" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="durationMin">Длительность (мин)</Label>
          <Input
            id="durationMin"
            name="durationMin"
            type="number"
            min={15}
            defaultValue={60}
            required
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Создаем..." : "Создать занятие"}
        </Button>
      </form>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Ближайшие занятия</h2>
        {sessions.length === 0 ? (
          <p className="text-sm text-muted-foreground">Занятий пока нет.</p>
        ) : (
          <div className="space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="rounded-md border p-3 text-sm"
              >
                <div>
                  <span className="font-medium">{session.target_type}</span> · {session.target_id}
                </div>
                <div className="text-muted-foreground">
                  {new Date(session.starts_at).toLocaleString()} · {session.duration_min} мин
                </div>
                <div className="text-muted-foreground">
                  Комната: {session.meeting_room_key}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
