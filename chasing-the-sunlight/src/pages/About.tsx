import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Map as MapIcon, Camera } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import dadSunset1 from '@/assets/dad-sunset-1.jpg';
import dadSunset2 from '@/assets/dad-sunset-2.jpg';
const About = () => {
  return <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 text-secondary" fill="currentColor" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">About This Journey</h1>
            <p className="text-base sm:text-lg text-muted-foreground font-serif italic mb-2">In Memory of our Father Steven Reed · 9.19.66 – 5.15.25</p>
            <p className="text-lg sm:text-xl text-muted-foreground">A daughter's tribute to her father, told through fifty sunsets across America.</p>
          </div>


          <div className="prose prose-lg max-w-none space-y-8 animate-fade-in-delay">
            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">The Story</h2>
              <p className="leading-relaxed">
                My dad always said, "Never forget to look up." It inspired me, him, and our
                whole family to always watch the sunsets. We took long road
                trips together our whole life, and no matter where we were or how late we were
                running, we'd always pull over when the sky started to glow. Sometimes we'd
                forget to put on the music—we would talk so much.
              </p>
              <p className="leading-relaxed">When I lost him in May 2025, the world felt impossibly heavy. I didn't know how to process the grief or honor the man who taught me so much about living fully. Then one evening, watching the sun dip below the horizon, I remembered his words. In that moment, I knew what I needed to do.</p>
              <p className="leading-relaxed">This journey is my way of carrying him with me; one state at a time, one sunset at a time. It's about healing through travel, finding beauty in endings, and keeping his memory alive through the simple act of looking up at the sky and feeling grateful.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Who Was My Dad?</h2>
              <p className="leading-relaxed">He was a teacher, a storyteller, a lover of the open road. He drove an old Cadillac that he refused to replace, played classic rock too loud, and had an uncanny ability to find the best diners in any town. He taught me how to read maps, how to change a tire, and most importantly, how to find joy in the journey itself—not just the destination.</p>
              <p className="leading-relaxed">
                He believed that sunsets were nature's way of reminding us that every day deserves a
                proper goodbye. That even in endings, there's beauty. That we should never be too
                busy to stop and watch the sky catch fire.
              </p>
            </section>

            <section className="not-prose my-12">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-center">Remembering Dad</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                  <img src={dadSunset1} alt="Dad standing on a rocky shoreline beneath a pink ocean sunset" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                  <img src={dadSunset2} alt="Dad outdoors beneath a pastel sunset with mountains behind him" loading="lazy" className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-center text-muted-foreground mt-6 italic">
                "Never forget to look up" — Dad's words that inspired this journey
              </p>
            </section>


            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">The Mission</h2>
              <div className="grid md:grid-cols-3 gap-6 not-prose">
                <div className="bg-muted p-6 rounded-lg">
                  <MapIcon className="w-10 h-10 mb-3 text-secondary" />
                  <h3 className="font-serif font-bold text-xl mb-2">50 States</h3>
                  <p className="text-sm">
                    Visit every state in America, from coast to coast, honoring Dad's love of
                    exploration.
                  </p>
                </div>
                <div className="bg-muted p-6 rounded-lg">
                  <Camera className="w-10 h-10 mb-3 text-secondary" />
                  <h3 className="font-serif font-bold text-xl mb-2">50 Sunsets</h3>
                  <p className="text-sm">
                    Capture one sunset in each state, creating a gallery of memories and light.
                  </p>
                </div>
                <div className="bg-muted p-6 rounded-lg">
                  <Heart className="w-10 h-10 mb-3 text-secondary" fill="currentColor" />
                  <h3 className="font-serif font-bold text-xl mb-2">Healing</h3>
                  <p className="text-sm">
                    Transform grief into gratitude through travel, photography, and remembrance.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Two Sisters Riding Shotgun</h2>
              <p className="leading-relaxed">
                I don't chase these sunsets alone. Stevie Bridget and Jewels, my two Maine Coon
                sisters, come along for the miles. Stevie is named after my dad — bold, curious, and
                always finding trouble — while Jewels is the sassy, watchful one who supervises every
                stop. They tell their own side of the trip in their journal.
              </p>
              <div className="not-prose mt-6">
                <Button asChild variant="outline">
                  <Link to="/journal">Read Stevie Bridget &amp; Jewels' Journal</Link>
                </Button>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">For Anyone Who's Grieving</h2>
              <p className="leading-relaxed">If you've lost someone you love, you know that grief isn't linear. Some days are easier than others. Some sunsets bring tears, others bring smiles. This project is for anyone who's searching for a way to carry their person with them — to turn loss into something beautiful, something lasting.</p>
              <p className="leading-relaxed">I hope these sunsets bring you comfort. I hope they remind you that your love for your person doesn't end; it just changes form, like light changing the sky.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">How You Can Follow Along</h2>
              <p className="leading-relaxed">
                This journey is meant to be shared. You can follow my progress on the interactive
                map, read stories from the road in the journal, and see every sunset in the gallery.
                If this project resonates with you, consider supporting it through prints,
                membership, or simply sharing it with someone who needs a reminder that endings can
                be beautiful.
              </p>
            </section>

          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/map">Follow the Journey</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/dads-story">Read Dad's Story</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/support">Support This Project</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default About;