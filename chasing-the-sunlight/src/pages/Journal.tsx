import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, ArrowRight, PawPrint, PenLine } from 'lucide-react';
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

const Journal = () => {
  const [posts, setPosts] = useState<CatPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('cat_posts')
        .select('id, slug, title, location, post_date, tags, photo_url, body_md')
        .eq('published', true)
        .order('post_date', { ascending: false });
      setPosts((data as CatPost[]) ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in max-w-3xl mx-auto">
            <PawPrint className="w-12 h-12 mx-auto mb-4 text-secondary" />
            <h1 className="text-5xl font-serif font-bold mb-4">The Cats' Journal</h1>
            <p className="text-xl text-muted-foreground mb-3">
              Dispatches from <span className="font-semibold">Stevie Bridget</span> &{' '}
              <span className="font-semibold">Jewels</span> — two Maine Coon sisters chasing the
              sunlight across America.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Stevie is the trouble-maker explorer. Jewels is the sassy, majestic observer.
              Together they tell us where they've been, what they sniffed, and who they judged.
            </p>
            <div className="mt-6">
              <Button asChild variant="outline" size="sm">
                <Link to="/journal/new">
                  <PenLine size={16} className="mr-2" /> Compose a new post
                </Link>
              </Button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {loading && (
              <p className="text-center text-muted-foreground">Loading the girls' latest…</p>
            )}

            {!loading && posts.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    No posts yet. Upload a photo of Stevie or Jewels to get them started.
                  </p>
                  <Button asChild>
                    <Link to="/journal/new">Compose the first post</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {posts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {post.photo_url && (
                  <PhotoWatermark>
                    <img
                      src={post.photo_url}
                      alt={post.title}
                      className="w-full h-72 object-cover"
                    />
                  </PhotoWatermark>
                )}
                <CardContent className="p-8">
                  <h2 className="text-3xl font-serif font-bold mb-2">{post.title}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                    {post.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {post.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(post.post_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-lg leading-relaxed mb-6 line-clamp-3">
                    {post.body_md.replace(/[*_#>]/g, '').slice(0, 240)}…
                  </p>

                  <Link
                    to={`/journal/${post.slug}`}
                    className="inline-flex items-center text-secondary hover:text-secondary/80 font-medium transition-colors"
                  >
                    Read full story
                    <ArrowRight size={18} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Journal;
