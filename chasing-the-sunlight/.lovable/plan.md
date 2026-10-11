## Overview

Repurpose the existing Journal section into the **Traveling Maine Coons** blog, written from the POV of your two Maine Coon sisters, **Stevie Bridget** and **Jewels**. You'll upload a photo + a short "assignment" (the topic/situation), and Lovable AI will draft a blog post in their voices. The rest of the site (Home, Map, Gallery, About, Support, Contact, memorial branding) stays as-is for now.

## What changes

### 1. Journal → "The Cats' Journal"
- Rename page heading & intro on `/journal` to introduce Stevie & Jewels.
- Each post displays: hero photo (watermarked), title, location, date, tags, and the AI-generated narrative formatted as a back-and-forth between Stevie and Jewels (or co-written, depending on assignment).
- Keep existing post detail route `/journal/:id`.

### 2. New "Compose" admin page (`/journal/new`)
- Photo uploader (drag/drop, stored in Lovable Cloud Storage).
- Fields: Title (optional — AI can suggest), Location, Date, Assignment prompt (e.g., "We hiked Acadia and Jewels got scared of a chipmunk"), Tone (playful / dramatic / reflective), Tags.
- "Generate draft" button → calls edge function → returns draft → you can edit inline → "Publish".
- Simple passcode gate (stored as a secret) so only you can access it. No full auth system unless you want one later.

### 3. Lovable Cloud backend
- Enable Lovable Cloud (database + storage + edge functions + AI gateway).
- Tables:
  - `cat_posts` — id, title, slug, location, date, assignment, tone, tags[], photo_url, body_md, published, created_at.
- Storage bucket: `cat-photos` (public read).
- Edge function `generate-cat-post`: takes photo URL + assignment + tone, calls Lovable AI (`google/gemini-3-flash-preview`, multimodal — sees the photo) with a system prompt establishing Stevie & Jewels' personalities, returns markdown draft.
- Edge function `publish-cat-post`: passcode-protected insert/update.

### 4. Stevie & Jewels character bible (system prompt)
Baked into the generate function. Tell me more about their personalities if you want — defaults I'll use unless you change them:
- **Stevie Bridget** — the bold one, leads the adventures, opinionated, a little sassy.
- **Jewels** — the thoughtful sister, cautious but curious, notices small beautiful details.
- Sisters from the same litter, full-time travelers, narrate posts in alternating short paragraphs ("Stevie:" / "Jewels:") or as a duet depending on the assignment.

### 5. Home page tie-in (small)
- Add a "Latest from Stevie & Jewels" strip on the homepage pulling the 3 newest cat posts.
- Keep the memorial dedication intact.

## Out of scope (ask later if wanted)
- Instagram auto-sync from @travelingmainecoons
- Full user accounts / multi-author
- Comments, likes, subscribers
- Full rebrand away from "Chasing the Sunlight" (you chose hybrid)

## Technical summary
- Stack: existing React + Vite + Tailwind + shadcn.
- Lovable Cloud: Postgres table `cat_posts` with RLS (public read for `published=true`; writes restricted via edge function + passcode header), Storage bucket `cat-photos`, two edge functions.
- AI: Lovable AI Gateway, multimodal chat completion with photo as `image_url` content block, system prompt defines the cats' voices, returns markdown.
- Old `src/data/journal.ts` static posts: kept as fallback/seed or migrated into the DB on first load — I'll migrate them as the first 3 cat posts (rewritten) only if you want; otherwise I'll archive them.

## Questions before I build
1. Confirm Stevie & Jewels personality defaults above, or give me more detail.
2. Should the 3 existing Dad-memorial journal entries be **archived/hidden**, **kept on a separate `/memorial-journal` page**, or **rewritten as cat posts**?
3. Passcode for the compose page — I'll add a secret `BLOG_ADMIN_PASSCODE` you set after Cloud is enabled. OK?
