import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Not implemented",
      message: "TODO: проверить права и выдать signed URL",
    },
    { status: 501 },
  );
}
