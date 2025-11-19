const DEFAULT_RECIPIENTS = ["info@intusai.com", "serena.busceti@aimsacademy.org"];
const endpointFromEnv = process.env.SUPPORT_FORM_ENDPOINT;
const supportEmail = process.env.SUPPORT_EMAIL?.split(",").map((value) => value.trim()).filter(Boolean) ?? DEFAULT_RECIPIENTS;
const formEndpoint = endpointFromEnv ?? "https://formsubmit.co/ajax";

type EmailPayload = {
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendSupportEmail(payload: EmailPayload) {
  for (const recipient of supportEmail) {
    const response = await fetch(`${formEndpoint}/${recipient}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _subject: payload.subject,
        _replyto: payload.replyTo ?? recipient,
        _captcha: "false",
        message: payload.text,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Email service responded with ${response.status}: ${details}`);
    }
  }
}
