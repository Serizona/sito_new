// app/api/test-email/route.ts
import { NextResponse } from "next/server";
import { verifyEmailConnection, sendEmail } from "@/lib/email";

export async function GET() {
  try {
    console.log("🧪 Testing email connection...");
    
    // Verifica configurazione
    const isConfigured = await verifyEmailConnection();
    
    if (!isConfigured) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    console.log("📧 Sending test email...");
    
    // Invia email di test
    await sendEmail({
      subject: "Test Email - IntusAI",
      text: "Se ricevi questa email, la configurazione Resend funziona correttamente!",
    });

    return NextResponse.json({ 
      success: true,
      message: "Email inviata con successo"
    });
  } catch (error: any) {
    console.error("❌ Test failed:", error);
    return NextResponse.json(
      { 
        error: error.message || "Unknown error",
        name: error.name,
      },
      { status: 500 }
    );
  }
}