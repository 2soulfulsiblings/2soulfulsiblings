CREATE TABLE public.cat_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  location TEXT,
  post_date DATE NOT NULL DEFAULT CURRENT_DATE,
  assignment TEXT,
  tone TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  photo_url TEXT,
  body_md TEXT NOT NULL DEFAULT '',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.cat_posts TO anon;
GRANT SELECT ON public.cat_posts TO authenticated;
GRANT ALL ON public.cat_posts TO service_role;

ALTER TABLE public.cat_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published cat posts are public"
  ON public.cat_posts FOR SELECT
  USING (published = true);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER cat_posts_set_updated_at
  BEFORE UPDATE ON public.cat_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX cat_posts_published_date_idx ON public.cat_posts (published, post_date DESC);