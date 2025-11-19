const DEFAULT_RECIPIENT = "info@intusai.com";
const endpointFromEnv = process.env.SUPPORT_FORM_ENDPOINT;
const supportEmail = process.env.SUPPORT_EMAIL ?? DEFAULT_RECIPIENT;
const formEndpoint = endpointFromEnv ?? `https://formsubmit.co/ajax/${supportEmail}`;

type EmailPayload = {
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendSupportEmail(payload: EmailPayload) {
  const response = await fetch(formEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _subject: payload.subject,
      _replyto: payload.replyTo ?? supportEmail,
      _captcha: "false",
      message: payload.text,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Email service responded with ${response.status}: ${details}`);
  }
}
