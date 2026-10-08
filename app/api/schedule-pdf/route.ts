import { buildSchedulePdf } from "@/lib/build-pdf";

export async function GET(request: Request) {
  const duty = new URL(request.url).searchParams.get("duty") === "1";
  const pdf = await buildSchedulePdf(duty);
  const filename = duty
    ? "ssc-je-cs-8-31-oct-saturday-duty.pdf"
    : "ssc-je-cs-8-31-oct.pdf";
  return new Response(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
