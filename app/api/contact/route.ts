// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validazione campi obbligatori
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tutti i campi sono obbligatori" },
        { status: 400 }
      );
    }

    // Validazione email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email non valida" },
        { status: 400 }
      );
    }

    // Invia email
    await sendEmail({
      subject: `Nuovo messaggio da ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`,
      replyTo: email,
    });

    console.log(`✅ Messaggio ricevuto da: ${name} (${email})`);

    return NextResponse.json({ 
      success: true,
      message: "Messaggio inviato con successo" 
    });
  } catch (error: any) {
    console.error("❌ Contact request failed:", error);
    
    return NextResponse.json(
      { 
        error: "Errore nell'invio del messaggio. Riprova più tardi.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}