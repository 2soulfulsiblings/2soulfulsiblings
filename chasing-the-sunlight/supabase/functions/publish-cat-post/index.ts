// Upload the photo, generate a long-lived signed URL, and insert the post row.
// Passcode-gated.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function slugify(s: string): string {
  return s.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 64) || `post-${Date.now()}`;
}

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

    const body = await req.json();
    const {
      title, location, postDate, assignment, tone, tags,
      photoBase64, mimeType, bodyMd, publish,
    } = body;

    if (!title || !bodyMd || !photoBase64 || !mimeType) {
      return new Response(JSON.stringify({ error: "title, bodyMd, photoBase64, mimeType are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Generate slug
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let n = 0;
    while (true) {
      const { data: existing } = await supabase
        .from("cat_posts").select("id").eq("slug", slug).maybeSingle();
      if (!existing) break;
      n++;
      slug = `${baseSlug}-${n}`;
    }

    // Upload photo
    const ext = (mimeType.split("/")[1] || "jpg").replace("jpeg", "jpg");
    const path = `${slug}-${Date.now()}.${ext}`;
    const bytes = Uint8Array.from(atob(photoBase64), (c) => c.charCodeAt(0));
    const { error: upErr } = await supabase.storage
      .from("cat-photos")
      .upload(path, bytes, { contentType: mimeType, upsert: false });
    if (upErr) {
      return new Response(JSON.stringify({ error: `Upload failed: ${upErr.message}` }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: signed, error: signErr } = await supabase.storage
      .from("cat-photos")
      .createSignedUrl(path, ONE_YEAR_SECONDS);
    if (signErr || !signed) {
      return new Response(JSON.stringify({ error: `Sign URL failed: ${signErr?.message}` }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: row, error: insErr } = await supabase
      .from("cat_posts")
      .insert({
        slug,
        title,
        location: location || null,
        post_date: postDate || new Date().toISOString().slice(0, 10),
        assignment: assignment || null,
        tone: tone || null,
        tags: Array.isArray(tags) ? tags : [],
        photo_url: signed.signedUrl,
        body_md: bodyMd,
        published: !!publish,
      })
      .select()
      .single();

    if (insErr) {
      return new Response(JSON.stringify({ error: `Insert failed: ${insErr.message}` }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ post: row }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
