import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Images } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PhotoWatermark from '@/components/PhotoWatermark';
import { statesData } from '@/data/states';
import { getStateFeaturedImage } from '@/utils/imageMap';

const Gallery = () => {
  const completedStates = statesData.filter((state) => state.status === 'completed');

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-serif font-bold mb-4">Sunset Collection</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {completedStates.length} sunsets captured across America. Each photograph tells a story
              of remembrance, beauty, and the journey ahead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {completedStates.map((state) => {
              const photoCount = state.photos ? 1 + state.photos.additional.length : 1;
              const hasMultiplePhotos = photoCount > 1;

              return (
                <Link key={state.code} to={`/state/${state.code}`}>
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <PhotoWatermark className="relative overflow-hidden">
                      <img
                        src={getStateFeaturedImage(state.photos)}
                        alt={`Sunset in ${state.name}`}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                        <span className="text-primary-foreground font-semibold text-lg">View Details →</span>
                      </div>
                      {hasMultiplePhotos && (
                        <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                          <Images size={14} className="mr-1" />
                          {photoCount} Photos
                        </Badge>
                      )}
                    </PhotoWatermark>

                    <CardContent className="p-6">
                      <h2 className="text-2xl font-serif font-bold mb-3">{state.name}</h2>

                      <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{state.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>
                            {new Date(state.date!).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed line-clamp-3">{state.reflection}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {completedStates.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                The journey is just beginning. Check back soon for the first sunset.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
