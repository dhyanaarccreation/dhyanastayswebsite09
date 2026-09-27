import { NextResponse } from "next/server";
import { appendLead } from "@/lib/leads";

// POST /api/leads — submission endpoint for the DHN-26 Contact form (whose
// "Host" category now carries host enquiries — the standalone Become-a-Host
// form was removed). See lib/leads.ts and README.md "Lead capture" for why
// this exists as a scoped exception to the front-end-only rule. Requires the Node runtime (exceljs uses Node APIs
// that aren't available on the Edge runtime).
export const runtime = "nodejs";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a real visitor never fills this hidden field. Pretend success
  // so a bot can't tell it was dropped, but don't write it to the workbook.
  if (isNonEmptyString(body.companyWebsite)) {
    return NextResponse.json({ ok: true });
  }

  const formType = body.formType;

  try {
    if (formType === "contact") {
      const { category, name, email, categoryDetail, message } = body;
      if (![category, name, email, message].every(isNonEmptyString)) {
        return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
      }
      await appendLead("contact", {
        submittedAt: new Date().toISOString(),
        category,
        name,
        email,
        categoryDetail: isNonEmptyString(categoryDetail) ? categoryDetail : "",
        message,
      });
      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error("Failed to record lead submission", error);
    return NextResponse.json({ ok: false, error: "Could not save your enquiry. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: false, error: "Unknown form type." }, { status: 400 });
}
