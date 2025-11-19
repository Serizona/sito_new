import { NextResponse } from "next/server";
import { sendSupportEmail } from "@/lib/email";

export const runtime = "nodejs";

type ContactPayload = {
  contactName?: string;
  contactEmail?: string;
  contactMessage?: string;
  contactPrivacy?: boolean;
};

const requiredFields: Array<keyof ContactPayload> = ["contactName", "contactEmail", "contactMessage"];

function hasValue(value?: string) {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const missing = requiredFields.filter((field) => !hasValue(payload[field] as string | undefined));
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    const text = [
      "New contact request:",
      `Name: ${payload.contactName}`,
      `Email: ${payload.contactEmail}`,
      `Consented to privacy: ${payload.contactPrivacy ? "Yes" : "No"}`,
      "",
      "Message:",
      payload.contactMessage,
    ].join("\n");

    await sendSupportEmail({
      subject: "Support contact request",
      text,
      replyTo: payload.contactEmail,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact request email failed", error);
    return NextResponse.json({ error: "Unable to send message." }, { status: 500 });
  }
}
