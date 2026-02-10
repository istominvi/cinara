import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireRouteRole } from "@/lib/auth/route";

export async function GET(
  _request: Request,
  { params }: { params: { token: string } },
) {
  const supabase = supabaseAdmin() as any;

  const { data, error } = await supabase
    .from("invites")
    .select(
      "invite_type, teacher_id, workspace_id, student_email, student_phone, expires_at, accepted_at",
    )
    .eq("token", params.token)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Invite not found" }, { status: 404 });
  }

  return NextResponse.json({ invite: data });
}

export async function POST(
  _request: Request,
  { params }: { params: { token: string } },
) {
  const auth = await requireRouteRole(["teacher", "student"]);

  if (!auth.ok) {
    return auth.response;
  }

  const admin = supabaseAdmin() as any;
  const { data: inviteData, error } = await admin
    .from("invites")
    .select(
      "id, invite_type, teacher_id, workspace_id, expires_at, accepted_at",
    )
    .eq("token", params.token)
    .single();

  const invite = inviteData as {
    id: string;
    invite_type: "student" | "workspace_teacher" | "teacher";
    teacher_id: string | null;
    workspace_id: string | null;
    expires_at: string | null;
    accepted_at: string | null;
  } | null;

  if (error || !invite) {
    return NextResponse.json({ error: "Invite not found" }, { status: 404 });
  }

  if (invite.accepted_at) {
    return NextResponse.json(
      { error: "Invite already accepted" },
      { status: 400 },
    );
  }

  if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
    return NextResponse.json({ error: "Invite expired" }, { status: 400 });
  }

  const { data: profileData } = await auth.supabase
    .from("profiles")
    .select("role")
    .eq("id", auth.user.id)
    .single();

  const profile = profileData as {
    role: "teacher" | "student" | "admin";
  } | null;

  if (!profile) {
    return NextResponse.json({ error: "Profile missing" }, { status: 400 });
  }

  if (invite.invite_type === "student") {
    if (profile.role !== "student") {
      return NextResponse.json(
        { error: "Only students can accept" },
        { status: 403 },
      );
    }

    const { error: linkError } = await admin.from("teacher_students").insert({
      teacher_id: invite.teacher_id,
      student_id: auth.user.id,
      workspace_id: invite.workspace_id ?? null,
    });

    if (linkError) {
      return NextResponse.json({ error: linkError.message }, { status: 400 });
    }
  }

  if (invite.invite_type === "workspace_teacher") {
    if (profile.role !== "teacher") {
      return NextResponse.json(
        { error: "Only teachers can accept" },
        { status: 403 },
      );
    }

    if (!invite.workspace_id) {
      return NextResponse.json({ error: "Workspace missing" }, { status: 400 });
    }

    const { error: memberError } = await admin
      .from("workspace_members")
      .insert({
        workspace_id: invite.workspace_id,
        user_id: auth.user.id,
        role: "member",
      });

    if (memberError) {
      return NextResponse.json({ error: memberError.message }, { status: 400 });
    }
  }

  await admin
    .from("invites")
    .update({ accepted_at: new Date().toISOString() })
    .eq("id", invite.id);

  return NextResponse.json({ ok: true });
}
