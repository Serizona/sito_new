import nodemailer from "nodemailer";

type EmailPayload = {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

function getTransportConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host) {
    throw new Error("SMTP_HOST is not configured");
  }

  return {
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  };
}

export async function sendSupportEmail(payload: EmailPayload) {
  const from = process.env.SMTP_FROM;
  const to = process.env.SMTP_TO ?? "info@intusai.com";

  if (!from) {
    throw new Error("SMTP_FROM is not configured");
  }

  const transporter = nodemailer.createTransport(getTransportConfig());

  await transporter.sendMail({
    from,
    to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html ?? payload.text.replace(/\n/g, "<br />"),
    replyTo: payload.replyTo,
  });
}
