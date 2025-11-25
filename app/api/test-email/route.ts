import { NextResponse } from "next/server";
import { verifyEmailConnection, sendEmail } from "@/lib/email";

export async function GET() {
  try {
    console.log("🧪 Testing SMTP connection...");
    
    const isConnected = await verifyEmailConnection();
    
    if (!isConnected) {
      return NextResponse.json(
        { error: "SMTP connection failed" },
        { status: 500 }
      );
    }

    console.log("📧 Sending test email...");
    await sendEmail({
      subject: "Test Email - IntusAI",
      text: "Se ricevi questa email, la configurazione SMTP funziona correttamente!",
    });

    return NextResponse.json({ 
      success: true,
      message: "Email inviata con successo"
    });
  } catch (error: any) {
    console.error("❌ Test failed:", error);
    return NextResponse.json(
      { 
        error: error.message, 
        code: error.code,
        command: error.command 
      },
      { status: 500 }
    );
  }
}