// src/lib/email.ts (o dove lo tieni tu)

import nodemailer from "nodemailer";

const DEFAULT_RECIPIENTS = ["info@intusai.com", "serena.busceti@aimsacademy.org"];
const recipients =
  process.env.SUPPORT_EMAILS?.split(",")
    .map((v) => v.trim())
    .filter(Boolean) ?? DEFAULT_RECIPIENTS;

type EmailPayload = {
  subject: string;
  text: string;
  replyTo?: string;
};

function getEnv(name: string, required = true): string {
  const value = process.env[name];
  if (!value && required) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value as string;
}

// Transporter SMTP verso SiteGround
const transporter = nodemailer.createTransport({
  host: getEnv("SMTP_HOST"),
  port: Number(getEnv("SMTP_PORT")),
  secure: getEnv("SMTP_SECURE", false)?.toString() === "true", // 465 = true
  auth: {
    user: getEnv("SMTP_USER"),
    pass: getEnv("SMTP_PASS"),
  },
});

export async function sendEmail(payload: EmailPayload) {
  const from = getEnv("SMTP_FROM");

  try {
    const info = await transporter.sendMail({
      from,
      to: recipients,
      subject: payload.subject,
      text: payload.text,
      replyTo: payload.replyTo,
    });

    console.log("✅ Email inviata:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Errore invio email SMTP:", err);
    throw err;
  }
}
