import { NextResponse } from "next/server";
import { readLeadsWorkbookBuffer } from "@/lib/leads";

// GET /api/leads/export — downloads the leads workbook (Contact Enquiries
// sheet, plus any legacy Host Enquiries sheet already in the file) as .xlsx,
// for reporting/analysis. Protected by LEADS_EXPORT_TOKEN so lead PII (names,
// emails, phone numbers, property locations) is never publicly downloadable —
// see README.md "Lead capture".
// Disabled (503) by default until that env var is set.
export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = process.env.LEADS_EXPORT_TOKEN;
  if (!isNonEmptyString(token)) {
    return NextResponse.json(
      { ok: false, error: "Export disabled: set LEADS_EXPORT_TOKEN to enable /api/leads/export." },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const provided = bearer ?? searchParams.get("token");

  if (provided !== token) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const buffer = await readLeadsWorkbookBuffer();
  // Buffer's ArrayBufferLike backing isn't assignable to BodyInit/BlobPart in
  // strict TS lib typings (it may be a SharedArrayBuffer) — copy into a
  // fresh Uint8Array<ArrayBuffer> to satisfy that.
  const bytes = Uint8Array.from(buffer);
  const filename = `dhyana-leads-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new NextResponse(new Blob([bytes]), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
