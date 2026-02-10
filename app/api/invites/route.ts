import { NextResponse } from "next/server";

import { requireRouteRole } from "@/lib/auth/route";

function generateToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  return Buffer.from(bytes).toString("base64url");
}

export async function POST(request: Request) {
  const auth = await requireRouteRole("teacher");

  if (!auth.ok) {
    return auth.response;
  }

  const body = await request.json();
  const inviteType = body.inviteType as string;
  const studentEmail = body.studentEmail as string | undefined;
  const studentPhone = body.studentPhone as string | undefined;
  const workspaceId = body.workspaceId as string | undefined;

  if (!inviteType) {
    return NextResponse.json(
      { error: "inviteType is required" },
      { status: 400 },
    );
  }

  const token = generateToken();

  const { data, error } = await auth.supabase
    .from("invites")
    .insert({
      token,
      invite_type: inviteType,
      teacher_id: auth.user.id,
      workspace_id: workspaceId ?? null,
      student_email: studentEmail ?? null,
      student_phone: studentPhone ?? null,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    })
    .select("token")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ token: data.token });
}
