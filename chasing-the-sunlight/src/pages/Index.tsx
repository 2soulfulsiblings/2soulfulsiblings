import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Heart, Calendar, ArrowRight, BookOpen, PawPrint } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PhotoWatermark from '@/components/PhotoWatermark';
import InteractiveMap from '@/components/InteractiveMap';
import { statesData } from '@/data/states';
import { getStateFeaturedImage } from '@/utils/imageMap';
import { supabase } from '@/integrations/supabase/client';
import heroImage from '@/assets/hawaii-sunset.jpg';

interface CatPostPreview {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  post_date: string;
  photo_url: string | null;
  body_md: string;
  tags: string[] | null;
}

const Index = () => {
  const completedStates = statesData.filter((state) => state.status === 'completed');
  const latestState = completedStates[completedStates.length - 1];
  const [catPosts, setCatPosts] = useState<CatPostPreview[]>([]);
  const [duoPosts, setDuoPosts] = useState<CatPostPreview[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('cat_posts')
        .select('id, slug, title, location, post_date, photo_url, body_md, tags')
        .eq('published', true)
        .order('post_date', { ascending: false })
        .limit(12);
      const posts = (data as CatPostPreview[]) ?? [];
      setCatPosts(posts.slice(0, 3));

      // Prefer explicitly tagged duo photos; fall back to latest posts with a photo.
      const tagged = posts.filter((p) =>
        (p.tags ?? []).some((t) => ['duo', 'both', 'stevie & jewels', 'together'].includes(t.toLowerCase())) && p.photo_url
      );
      const withPhoto = posts.filter((p) => p.photo_url);
      setDuoPosts((tagged.length ? tagged : withPhoto).slice(0, 6));
    })();
  }, []);

  const newestPost = catPosts[0];

  const scrollToMap = () => {
    document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/80" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary-foreground mb-4">
            Chasing the Sunlight
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-2 font-serif italic">
            In Memory of our Father Steven Reed · 9.19.66 – 5.15.25
          </p>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-6 inline-flex flex-wrap items-center justify-center gap-x-2">
            <PawPrint size={18} className="text-secondary" />
            <span>Traveling with Stevie &amp; Jewels —</span>
            <a
              href="https://instagram.com/travelingmainecoons"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-secondary"
            >
              @travelingmainecoons
            </a>
          </p>
          <p className="text-xl md:text-2xl text-primary-foreground mb-8 leading-relaxed">
            One road trip. Fifty states. Fifty sunsets. Two Maine Coon sisters riding shotgun.
            A journey of healing, remembrance, and the open road.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={scrollToMap}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6"
            >
              Follow the Journey
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/journal">
                <PawPrint className="mr-2" size={20} />
                Meet Stevie &amp; Jewels
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dedication Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-serif font-bold text-center mb-8">
              Why This Journey Matters
            </h2>
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-lg leading-relaxed mb-6">
                This road trip is dedicated to my dad, who taught me to love the open road and never
                miss a sunset. After losing him this year, I wanted to honor his memory in a way that
                reflects both his spirit and my love for travel.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                In every state I visit, I'll pause to capture a sunset—a reminder that endings can be
                beautiful too.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">Read the Full Story</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/dads-story">Dad's Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Preview */}
      <section id="map-section" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-serif font-bold mb-4">50 States, 50 Sunsets</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Click on any state to see its sunset. Follow along as the map fills with color and memories.
            </p>

            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-secondary" />
                <span className="text-sm">Completed ({completedStates.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-muted" />
                <span className="text-sm">Pending ({50 - completedStates.length})</span>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="max-w-6xl mx-auto mb-8">
            <InteractiveMap statesData={statesData} />
          </div>

          {/* Progress Card */}
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-3xl font-serif font-bold mb-4">
                  {completedStates.length} / 50 States
                </p>
                <div className="w-full bg-muted rounded-full h-3 mb-6">
                  <div
                    className="bg-gradient-to-r from-secondary to-accent h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(completedStates.length / 50) * 100}%` }}
                  />
                </div>
                <Button asChild size="lg">
                  <Link to="/map">View Full Map Page</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Latest Sunset */}
      {latestState && (
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-serif font-bold mb-4">Most Recent Sunset</h2>
            </div>

            <Link to={`/state/${latestState.code}`}>
              <Card className="max-w-4xl mx-auto overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300">
                <PhotoWatermark>
                  <img
                    src={getStateFeaturedImage(latestState.photos)}
                    alt={`Sunset in ${latestState.name}`}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </PhotoWatermark>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {latestState.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(latestState.date!).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground">
                      {latestState.name}
                    </Badge>
                  </div>
                  <p className="text-lg leading-relaxed mb-6">{latestState.reflection}</p>
                  <div className="flex items-center text-secondary font-semibold group-hover:gap-3 gap-2 transition-all">
                    <span>View Full Story</span>
                    <ArrowRight size={20} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-serif font-bold mb-4">Sunset Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse the growing gallery of sunsets across the U.S. Each one tells a story of place,
              memory, and love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
            {completedStates.map((state) => (
              <Link key={state.code} to={`/state/${state.code}`}>
                <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <PhotoWatermark>
                    <img
                      src={getStateFeaturedImage(state.photos)}
                      alt={`${state.name} sunset`}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </PhotoWatermark>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif font-bold mb-2">{state.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {new Date(state.date!).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-sm line-clamp-2">{state.reflection}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stevie & Jewels Duo Gallery */}
      {duoPosts.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <PawPrint className="w-8 h-8 mx-auto mb-3 text-secondary" />
              <h2 className="text-4xl font-serif font-bold mb-4">Stevie &amp; Jewels, Together</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The sisters, side by side. A rolling gallery of duo moments from the road.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-8">
              {duoPosts.map((post) => (
                <Link key={post.id} to={`/journal/${post.slug}`} className="group">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <PhotoWatermark>
                      <img
                        src={post.photo_url!}
                        alt={`Stevie and Jewels — ${post.title}`}
                        loading="lazy"
                        className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </PhotoWatermark>
                    <CardContent className="p-4">
                      <h3 className="text-base font-serif font-semibold line-clamp-1">{post.title}</h3>
                      {post.location && (
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <MapPin size={12} /> {post.location}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {newestPost && (
              <div className="text-center">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Link to={`/journal/${newestPost.slug}`}>
                    Read the Newest Post <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Journal Preview */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-serif font-bold mb-4">Latest from Stevie &amp; Jewels</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Two Maine Coon sisters, riding shotgun across America. Their dispatches from the road —
              what they sniffed, who they judged, where the sunlight hit just right.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 mb-8">
            {catPosts.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  <PawPrint className="w-8 h-8 mx-auto mb-3 text-secondary" />
                  Stevie & Jewels haven't filed their first dispatch yet. Check back soon.
                </CardContent>
              </Card>
            )}
            {catPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                {post.photo_url && (
                  <PhotoWatermark>
                    <img src={post.photo_url} alt={post.title} className="w-full h-56 object-cover" />
                  </PhotoWatermark>
                )}
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-2xl font-serif font-bold">{post.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.post_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  {post.location && <p className="text-muted-foreground mb-3">{post.location}</p>}
                  <p className="mb-4 line-clamp-2">{post.body_md.replace(/[*_#>]/g, '').slice(0, 200)}…</p>
                  <Button asChild variant="link" className="p-0">
                    <Link to={`/journal/${post.slug}`}>
                      Read more <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/journal">Read the Cats' Journal</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Heart className="w-16 h-16 mx-auto mb-6 text-secondary" fill="currentColor" />
            <h2 className="text-4xl font-serif font-bold mb-6">Support the Journey</h2>
            <p className="text-lg leading-relaxed mb-8">
              This project is my way of honoring my dad through the simple ritual of chasing sunsets.
              If it brings you peace or joy, your support helps me keep driving, photographing, and
              sharing each moment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-3">Buy a Print</h3>
                  <p className="text-sm mb-4">
                    Own a piece of the journey with state-by-state sunset prints.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/support">View Prints</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-3">Sunset Circle</h3>
                  <p className="text-sm mb-4">
                    Join for exclusive updates, wallpapers, and behind-the-scenes stories.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/support">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-3">Leave a Tip</h3>
                  <p className="text-sm mb-4">
                    Every little bit helps with gas, gear, and the next golden hour.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/support">Support Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
              <Link to="/support">Explore All Support Options</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
