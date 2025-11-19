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

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });
}

export async function sendSupportEmail(payload: EmailPayload) {
  const from = getEnv("SMTP_FROM");
  const transporter = getTransport();

  await transporter.sendMail({
    from,
    to: recipients.join(","),
    subject: payload.subject,
    text: payload.text,
    html: payload.text.replace(/\n/g, "<br />"),
    replyTo: payload.replyTo,
  });
}
