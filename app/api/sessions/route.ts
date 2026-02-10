import { NextResponse } from "next/server";

import { supabaseRoute } from "@/lib/supabase/route";

function generateRoomKey() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Buffer.from(bytes).toString("base64url");
}

export async function GET() {
  const supabase = supabaseRoute() as any;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("class_sessions")
    .select(
      "id, starts_at, duration_min, meeting_room_key, target_type, target_id, status",
    )
    .order("starts_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ sessions: data });
}

export async function POST(request: Request) {
  const supabase = supabaseRoute() as any;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!profile || profile.role !== "teacher") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const targetType = body.targetType as string;
  const targetId = body.targetId as string;
  const startsAt = body.startsAt as string;
  const durationMin = Number(body.durationMin ?? 60);

  if (!targetType || !targetId || !startsAt) {
    return NextResponse.json(
      { error: "targetType, targetId, startsAt are required" },
      { status: 400 },
    );
  }

  const meetingRoomKey = body.meetingRoomKey ?? generateRoomKey();

  const { data, error } = await supabase
    .from("class_sessions")
    .insert({
      teacher_id: session.user.id,
      target_type: targetType,
      target_id: targetId,
      starts_at: startsAt,
      duration_min: durationMin,
      meeting_room_key: meetingRoomKey,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ id: data.id });
}
