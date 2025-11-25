// app/api/test-email/route.ts
import { NextResponse } from "next/server";
import { verifyEmailConnection, sendEmail } from "@/lib/email";

export async function GET() {
  try {
    console.log("🧪 Testing email service...");
    
    // Verifica configurazione
    const isConfigured = await verifyEmailConnection();
    
    if (!isConfigured) {
      return NextResponse.json(
        { 
          error: "Email service not configured",
          hint: "Check RESEND_API_KEY environment variable"
        },
        { status: 500 }
      );
    }

    console.log("📧 Sending test email...");
    
    // Invia email di test
    const result = await sendEmail({
      subject: "Test Email - IntusAI",
      text: "Questa è un'email di test dal sistema IntusAI.\n\nSe la ricevi, la configurazione Resend funziona correttamente! ✅",
    });

    return NextResponse.json({ 
      success: true,
      message: "Email inviata con successo",
      emailId: result?.id
    });
  } catch (error: any) {
    console.error("❌ Test failed:", error);
    
    return NextResponse.json(
      { 
        error: error.message || "Unknown error",
        name: error.name,
        details: process.env.NODE_ENV === "development" ? error : undefined
      },
      { status: 500 }
    );
  }
}