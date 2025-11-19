import { NextResponse } from "next/server";
import path from "node:path";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { Readable } from "node:stream";

export const runtime = "nodejs";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "downloads", "vic-dataset.zip");

  try {
    const fileStats = await stat(filePath);
    const nodeStream = createReadStream(filePath);
    const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

    return new NextResponse(webStream, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="vic-dataset.zip"',
        "Content-Length": fileStats.size.toString(),
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Failed to serve ViC dataset download:", error);

    return NextResponse.json(
      { error: "ViC dataset not found." },
      {
        status: 404,
      },
    );
  }
}
