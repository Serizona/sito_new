// src/lib/email.ts

import nodemailer from "nodemailer";

const DEFAULT_RECIPIENTS = ["info@intusai.com", "serena.busceti@aimsacademy.org"];

const recipients =
  process.env.SUPPORT_EMAILS?.split(",")
    .map((v) => v.trim())
    .filter(Boolean) ?? DEFAULT_RECIPIENTS;

export type EmailPayload = {
  subject: string;
  text: string;
  replyTo?: string;
};

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

// Configurazione transporter SMTP (SiteGround)
const transporter = nodemailer.createTransport({
  host: getEnv("SMTP_HOST"),
  port: Number(process.env.SMTP_PORT ?? "465"),
  secure: process.env.SMTP_SECURE === "true", // true se usi porta 465
  auth: {
    user: getEnv("SMTP_USER"),
    pass: getEnv("SMTP_PASS"),
  },
});

// Funzione principale di invio email
export async function sendEmail(payload: EmailPayload) {
  const from = getEnv("SMTP_FROM");

  const info = await transporter.sendMail({
    from,
    to: recipients,
    subject: payload.subject,
    text: payload.text,
    replyTo: payload.replyTo,
  });

  console.log("✅ Email inviata:", info.messageId);
  return info;
}

// Alias per compatibilità col codice esistente
export async function sendSupportEmail(payload: EmailPayload) {
  return sendEmail(payload);
}
