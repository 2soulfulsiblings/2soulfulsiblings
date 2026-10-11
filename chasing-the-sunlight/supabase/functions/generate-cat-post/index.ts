// Generate a blog post in Stevie & Jewels' voices from a photo + assignment.
// Passcode-gated. Returns markdown body and a suggested title.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SYSTEM_PROMPT = `You are ghostwriting a travel blog written by two Maine Coon sisters: Stevie Bridget and Jewels. They are full-time travelers from the same litter.

VOICES:
- Stevie Bridget (named after their human's late dad): the trouble-maker explorer, girly, bold, leads the adventures, sneaks where she shouldn't, opinionated.
- Jewels: sassy, exploratory, beautiful and majestic, notices the small magical details, sharp-tongued, vain in a charming way.

FORMAT:
- Markdown.
- Open with a one-line title (## Heading) suggesting it.
- Then alternate short paragraphs labeled **Stevie:** and **Jewels:** like a back-and-forth, OR write a co-narrated piece if the assignment calls for it.
- Keep it warm, witty, observational. Reference what's actually visible in the photo.
- 200–400 words. No emojis. No hashtags. No AI disclaimers.
- End with a single italic closing line they both say together.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const passcode = req.headers.get("x-admin-passcode");
    const expected = Deno.env.get("BLOG_ADMIN_PASSCODE");
    if (!expected || passcode !== expected) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { photoBase64, mimeType, assignment, tone, location } = await req.json();
    if (!photoBase64 || !mimeType || !assignment) {
      return new Response(JSON.stringify({ error: "photoBase64, mimeType and assignment are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userText = [
      `Assignment: ${assignment}`,
      location ? `Location: ${location}` : "",
      tone ? `Desired tone: ${tone}` : "",
      "Write the post now based on what you see in the photo.",
    ].filter(Boolean).join("\n");

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: userText },
              { type: "image_url", image_url: { url: `data:${mimeType};base64,${photoBase64}` } },
            ],
          },
        ],
      }),
    });

    if (!aiResp.ok) {
      const errText = await aiResp.text();
      const status = aiResp.status === 429 || aiResp.status === 402 ? aiResp.status : 500;
      return new Response(JSON.stringify({ error: `AI error: ${errText}` }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResp.json();
    const markdown: string = aiData.choices?.[0]?.message?.content ?? "";

    // Extract title from first markdown heading
    const titleMatch = markdown.match(/^#{1,3}\s+(.+)$/m);
    const suggestedTitle = titleMatch ? titleMatch[1].trim() : "";
    const body = titleMatch ? markdown.replace(titleMatch[0], "").trim() : markdown;

    return new Response(JSON.stringify({ title: suggestedTitle, body_md: body }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
