import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PhotoWatermark from '@/components/PhotoWatermark';
import { supabase } from '@/integrations/supabase/client';

interface CatPost {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  post_date: string;
  tags: string[];
  photo_url: string | null;
  body_md: string;
}

// Minimal markdown renderer: headings, bold, italics, paragraphs.
function renderMarkdown(md: string) {
  const blocks = md.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return blocks.map((block, i) => {
    if (/^#{3}\s/.test(block)) {
      return <h3 key={i} className="text-2xl font-serif font-bold mt-6 mb-3">{block.replace(/^#{3}\s/, '')}</h3>;
    }
    if (/^#{2}\s/.test(block)) {
      return <h2 key={i} className="text-3xl font-serif font-bold mt-8 mb-4">{block.replace(/^#{2}\s/, '')}</h2>;
    }
    if (/^#\s/.test(block)) {
      return <h1 key={i} className="text-4xl font-serif font-bold mt-8 mb-4">{block.replace(/^#\s/, '')}</h1>;
    }
    // inline formatting
    const html = block
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
    return (
      <p
        key={i}
        className="mb-5 leading-relaxed text-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
}

const JournalPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<CatPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await supabase
        .from('cat_posts')
        .select('id, slug, title, location, post_date, tags, photo_url, body_md')
        .eq('slug', id)
        .eq('published', true)
        .maybeSingle();
      setPost((data as CatPost) ?? null);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-32 pb-20 text-center text-muted-foreground">Loading…</main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Post Not Found</h1>
          <Button asChild>
            <Link to="/journal">Back to Journal</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-20">
        <article className="container mx-auto px-4 max-w-3xl">
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/journal">
              <ArrowLeft size={20} className="mr-2" />
              Back to Journal
            </Link>
          </Button>

          {post.photo_url && (
            <PhotoWatermark>
              <img
                src={post.photo_url}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg"
              />
            </PhotoWatermark>
          )}

          <header className="mb-8 animate-fade-in">
            <h1 className="text-5xl font-serif font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
              {post.location && (
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  {post.location}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {new Date(post.post_date).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric',
                })}
              </span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            )}
          </header>

          <div className="animate-fade-in-delay">{renderMarkdown(post.body_md)}</div>

          <div className="mt-12 pt-8 border-t">
            <Button asChild>
              <Link to="/journal">
                <ArrowLeft size={20} className="mr-2" />
                Back to All Posts
              </Link>
            </Button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default JournalPost;
