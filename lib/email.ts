import nodemailer from "nodemailer";

const DEFAULT_RECIPIENTS = ["info@intusai.com", "serena.busceti@aimsacademy.org"];
const recipients =
  process.env.SUPPORT_EMAILS?.split(",")
    .map((value) => value.trim())
    .filter(Boolean) ?? DEFAULT_RECIPIENTS;

type EmailPayload = {
  subject: string;
  text: string;
  replyTo?: string;
};

function getEnv(name: string, required = true) {
  const value = process.env[name];
  if (required && (!value || value.trim() === "")) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

function getTransport() {
  const host = getEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT ?? "587");
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  console.log(`📧 Configuring SMTP: ${host}:${port} (secure: ${secure})`);

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
    // Timeout più lunghi per connessioni lente
    connectionTimeout: 60000, // 60 secondi
    greetingTimeout: 30000,   // 30 secondi
    socketTimeout: 60000,     // 60 secondi
    // Debugging
    debug: process.env.DEBUG?.includes("nodemailer") ?? false,
    logger: process.env.DEBUG?.includes("nodemailer") ?? false,
    // Opzioni SSL/TLS più permissive
    tls: {
      rejectUnauthorized: false, // Accetta tutti i certificati
      ciphers: 'SSLv3',
      minVersion: "TLSv1",
    },
    // Ignora certificati autofirmati
    ignoreTLS: false,
    requireTLS: !secure, // Richiedi TLS solo se non è già secure
  });
}

export async function sendSupportEmail(payload: EmailPayload) {
  const from = getEnv("SMTP_FROM");
  const transporter = getTransport();

  try {
    // Test della connessione SMTP
    console.log("🔌 Testing SMTP connection...");
    const verified = await transporter.verify();
    console.log("✅ SMTP connection verified:", verified);
  } catch (verifyError) {
    console.error("❌ SMTP verification failed:", verifyError);
    // Log dettagliato dell'errore
    if (verifyError instanceof Error) {
      console.error("Error details:", {
        message: verifyError.message,
        name: verifyError.name,
        stack: verifyError.stack,
      });
    }
    throw new Error(`SMTP connection failed: ${verifyError instanceof Error ? verifyError.message : String(verifyError)}`);
  }

  try {
    console.log(`📨 Sending email to: ${recipients.join(", ")}`);
    const info = await transporter.sendMail({
      from,
      to: recipients.join(","),
      subject: payload.subject,
      text: payload.text,
      html: payload.text.replace(/\n/g, "<br />"),
      replyTo: payload.replyTo,
    });
    
    console.log("✅ Email sent successfully:", info.messageId);
    return info;
  } catch (sendError) {
    console.error("❌ Failed to send email:", sendError);
    if (sendError instanceof Error) {
      console.error("Send error details:", {
        message: sendError.message,
        name: sendError.name,
      });
    }
    throw sendError;
  }
}