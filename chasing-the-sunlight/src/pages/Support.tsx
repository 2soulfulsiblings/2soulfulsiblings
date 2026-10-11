import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Image, Users, Coffee, Share2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Support = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in max-w-3xl mx-auto">
            <Heart className="w-16 h-16 mx-auto mb-6 text-secondary" fill="currentColor" />
            <h1 className="text-5xl font-serif font-bold mb-6">Support the Journey</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              This project is my way of honoring my dad through the simple ritual of chasing
              sunsets. If it brings you peace or joy, your support helps me keep driving,
              photographing, and sharing each moment.
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Buy a Print */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted">
                <div className="flex items-center gap-3">
                  <Image className="w-8 h-8 text-secondary" />
                  <CardTitle className="text-3xl font-serif">Buy a Print</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-lg mb-6 leading-relaxed">
                  Own a piece of the journey. Choose from state-by-state sunset prints or the "50
                  States Collection." Each print includes the location and date, a small dedication,
                  and a note about what that evening meant to me.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-semibold mb-1">Individual Prints</p>
                    <p className="text-sm text-muted-foreground">
                      Choose your favorite state sunset
                    </p>
                    <p className="text-2xl font-bold text-secondary mt-2">Coming Soon</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-semibold mb-1">State Collections</p>
                    <p className="text-sm text-muted-foreground">Regional sunset collections</p>
                    <p className="text-2xl font-bold text-secondary mt-2">Coming Soon</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-semibold mb-1">50 States Set</p>
                    <p className="text-sm text-muted-foreground">Complete collection</p>
                    <p className="text-2xl font-bold text-secondary mt-2">Coming Soon</p>
                  </div>
                </div>
                <Button size="lg" disabled>
                  Print Shop Coming Soon
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  Placeholder for future print-on-demand integration
                </p>
              </CardContent>
            </Card>

            {/* Sunset Circle */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-secondary" />
                  <CardTitle className="text-3xl font-serif">Join the Sunset Circle</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-lg mb-6 leading-relaxed">Become a member for exclusive updates with monthly high-resolution wallpapers, behind-the-scenes notes from the road
     early access to new galleries.

                </p>
                <div className="bg-muted p-6 rounded-lg mb-6">
                  <h3 className="font-serif font-bold text-xl mb-4">Member Benefits:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      <span>Monthly high-res sunset wallpapers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      <span>Behind-the-scenes travel stories</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      <span>Early access to new galleries and journal posts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      <span>Exclusive member-only updates and reflections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      <span>15% discount on all prints</span>
                    </li>
                  </ul>
                </div>
                <Button size="lg" disabled>
                  Membership Coming Soon
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  Placeholder for future membership platform integration
                </p>
              </CardContent>
            </Card>

            {/* Tip Jar */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted">
                <div className="flex items-center gap-3">
                  <Coffee className="w-8 h-8 text-secondary" />
                  <CardTitle className="text-3xl font-serif">Leave a Tip</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-lg mb-6 leading-relaxed">
                  If you simply want to say "keep going," you can leave a one-time tip. Every little
                  bit helps with gas, gear, and the next golden hour.
                </p>
                <div className="bg-muted p-6 rounded-lg mb-6">
                  <p className="font-semibold mb-2">Your support helps with:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Gas and vehicle maintenance</li>
                    <li>• Camera equipment and photography gear</li>
                    <li>• Accommodation and food on the road</li>
                    <li>• Website hosting and maintenance</li>
                  </ul>
                </div>
                <Button size="lg" disabled>
                  Tip Jar Coming Soon
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  Placeholder for future donation platform integration
                </p>
              </CardContent>
            </Card>

            {/* Share the Journey */}
            <Card className="overflow-hidden border-secondary/50">
              <CardHeader className="bg-secondary/10">
                <div className="flex items-center gap-3">
                  <Share2 className="w-8 h-8 text-secondary" />
                  <CardTitle className="text-3xl font-serif">Share the Journey</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-lg mb-6 leading-relaxed">
                  The most meaningful support is sharing the story. If someone you love also misses
                  their person, pass along a sunset. Let them know that grief can be transformed
                  into something beautiful.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" size="lg">
                    Share on Twitter
                  </Button>
                  <Button variant="outline" size="lg">
                    Share on Facebook
                  </Button>
                  <Button variant="outline" size="lg">
                    Copy Link
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Sharing this project helps it reach people who might need it most
                </p>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-serif">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      When will prints be available?
                    </h3>
                    <p className="text-muted-foreground">
                      I'm currently setting up the print shop and will announce availability once I
                      have enough sunsets captured and quality prints ready to ship.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">What sizes will prints come in?</h3>
                    <p className="text-muted-foreground">
                      Prints will be available in standard sizes: 8x10", 11x14", 16x20", and 24x36".
                      All prints will be museum-quality on premium paper.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      How will the funds be used?
                    </h3>
                    <p className="text-muted-foreground">
                      All funds go directly toward supporting this journey—vehicle expenses,
                      photography equipment, accommodation, and website maintenance. Any surplus will
                      be donated to grief support organizations.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Can I request a specific state?
                    </h3>
                    <p className="text-muted-foreground">
                      While I can't guarantee specific timing, feel free to reach out via the
                      contact form with your request. I'd love to know which states mean the most to
                      you and why.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>);

};

export default Support;