// src/lib/email.ts
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

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

// Configurazione transporter con timeout e retry
const transporter: Transporter = nodemailer.createTransport({
  host: getEnv("SMTP_HOST"),
  port: Number(process.env.SMTP_PORT ?? "465"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: getEnv("SMTP_USER"),
    pass: getEnv("SMTP_PASS"),
  },
  // ⭐ AGGIUNGI QUESTI TIMEOUT
  connectionTimeout: 15000, // 15 secondi
  greetingTimeout: 10000,   // 10 secondi
  socketTimeout: 15000,      // 15 secondi
  // Opzionale: abilita debug in sviluppo
  debug: process.env.NODE_ENV === "development",
  logger: process.env.NODE_ENV === "development",
});

// Verifica connessione SMTP all'avvio
export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log("✅ SMTP server is ready");
    return true;
  } catch (error) {
    console.error("❌ SMTP connection failed:", error);
    return false;
  }
}

// Funzione con retry logic
async function sendWithRetry(
  fn: () => Promise<any>,
  retries = 3,
  delay = 2000
): Promise<any> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    console.warn(`⚠️ Retry ${4 - retries}/3 dopo ${delay}ms...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return sendWithRetry(fn, retries - 1, delay * 1.5);
  }
}

// Funzione principale di invio email
export async function sendEmail(payload: EmailPayload) {
  const from = getEnv("SMTP_FROM");

  try {
    const info = await sendWithRetry(async () => {
      return await transporter.sendMail({
        from,
        to: recipients,
        subject: payload.subject,
        text: payload.text,
        replyTo: payload.replyTo,
      });
    });

    console.log("✅ Email inviata:", info.messageId);
    return info;
  } catch (error: any) {
    console.error("❌ Errore invio email:", {
      code: error.code,
      command: error.command,
      message: error.message,
    });
    throw error;
  }
}

// Alias per compatibilità
export async function sendSupportEmail(payload: EmailPayload) {
  return sendEmail(payload);
}