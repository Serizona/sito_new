import { NextResponse } from "next/server";
import { sendSupportEmail } from "@/lib/email";

export const runtime = "nodejs";

type ManualRequestPayload = {
  firstName?: string;
  lastName?: string;
  hospital?: string;
  department?: string;
  workEmail?: string;
  phone?: string;
  country?: string;
  useCase?: string;
  notes?: string;
  privacy?: boolean;
  marketing?: boolean;
};

function validateString(value?: string) {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ManualRequestPayload;
    const requiredFields: Array<keyof ManualRequestPayload> = [
      "firstName",
      "lastName",
      "hospital",
      "department",
      "workEmail",
      "country",
    ];

    const missing = requiredFields.filter((field) => !validateString(data[field] as string | undefined));
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    const text = [
      "New ViC manual request:",
      `First name: ${data.firstName}`,
      `Last name: ${data.lastName}`,
      `Hospital: ${data.hospital}`,
      `Department: ${data.department}`,
      `Country: ${data.country}`,
      `Work email: ${data.workEmail}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Use case: ${data.useCase || "Not provided"}`,
      `Notes: ${data.notes || "Not provided"}`,
      `Privacy consent: ${data.privacy ? "Yes" : "No"}`,
      `Marketing consent: ${data.marketing ? "Yes" : "No"}`,
    ].join("\n");

    await sendSupportEmail({
      subject: "ViC User Manual request",
      text,
      replyTo: data.workEmail,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Manual request email failed", error);
    const details = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Unable to send request.", details }, { status: 500 });
  }
}
