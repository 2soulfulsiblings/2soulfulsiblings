import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Heart, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { journalPosts } from '@/data/journal';

const DadsStory = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/about"><ArrowLeft size={18} className="mr-2" /> Back to About</Link>
          </Button>

          <div className="text-center mb-12 animate-fade-in">
            <Heart className="w-12 h-12 mx-auto mb-4 text-secondary" fill="currentColor" />
            <h1 className="text-5xl font-serif font-bold mb-3">Dad's Story</h1>
            <p className="text-lg text-muted-foreground font-serif italic">
              In Memory of our Father Steven Reed · 9.19.66 – 5.15.25
            </p>
            <p className="mt-6 max-w-2xl mx-auto leading-relaxed">
              These are the first dispatches from the road — written before Stevie Bridget and
              Jewels took over the journal. They're the heart of why this trip exists, and why
              we never forget to look up.
            </p>
          </div>

          <div className="space-y-8">
            {journalPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-serif font-bold mb-2">{post.title}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><MapPin size={16} />{post.location}</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long', day: 'numeric', year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  {post.content.split('\n\n').map((p, i) => (
                    <p key={i} className="mb-4 leading-relaxed">{p}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-muted-foreground italic mt-12">
            "Never forget to look up." — Dad
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DadsStory;
