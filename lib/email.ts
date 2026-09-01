// lib/email.ts
import { Resend } from 'resend';

const DEFAULT_RECIPIENTS = ["info@intus-ai.com"];

const recipients =
  process.env.SUPPORT_EMAILS?.split(",")
    .map((v) => v.trim())
    .filter(Boolean) ?? DEFAULT_RECIPIENTS;

export type EmailPayload = {
  subject: string;
  text: string;
  replyTo?: string;
};

// Inizializza Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Funzione con retry logic
async function sendWithRetry(
  fn: () => Promise<any>,
  retries = 3,
  delay = 1000
): Promise<any> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries === 0) throw error;
    
    console.warn(`⚠️ Retry ${4 - retries}/3 dopo ${delay}ms...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return sendWithRetry(fn, retries - 1, delay * 1.5);
  }
}

// Funzione principale di invio email
export async function sendEmail(payload: EmailPayload) {
  try {
    const result = await sendWithRetry(async () => {
      return await resend.emails.send({
        from: 'Intus.AI <onboarding@resend.dev>',
        to: recipients,
        subject: payload.subject,
        text: payload.text,
        replyTo: payload.replyTo,
      });
    });

    if (result.error) {
      console.error("❌ Errore Resend:", result.error);
      throw new Error(result.error.message);
    }

    console.log("✅ Email inviata via Resend:", result.data?.id);
    return result.data;
  } catch (error: any) {
    console.error("❌ Errore invio email:", {
      message: error.message,
      name: error.name,
    });
    throw error;
  }
}

// Alias per compatibilità
export async function sendSupportEmail(payload: EmailPayload) {
  return sendEmail(payload);
}

// Verifica configurazione
export async function verifyEmailConnection() {
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY non configurata");
    return false;
  }
  console.log("✅ Resend configurato correttamente");
  return true;
}