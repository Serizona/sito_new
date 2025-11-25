import { Resend } from 'resend';

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

export async function sendSupportEmail(payload: EmailPayload) {
  const apiKey = getEnv("RESEND_API_KEY");
  const from = getEnv("SMTP_FROM");
  
  const resend = new Resend(apiKey);

  try {
    console.log(`📨 Sending email via Resend to: ${recipients.join(", ")}`);
    
    const { data, error } = await resend.emails.send({
      from: from,
      to: recipients,
      subject: payload.subject,
      text: payload.text,
      html: payload.text.replace(/\n/g, "<br />"),
      replyTo: payload.replyTo,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log("✅ Email sent successfully:", data?.id);
    return data;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
}