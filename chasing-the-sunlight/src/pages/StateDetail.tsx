import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { statesData } from '@/data/states';
import { getStateImages, getStateFeaturedImage } from '@/utils/imageMap';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PhotoWatermark from '@/components/PhotoWatermark';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, Calendar, Share2, ArrowLeft, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { toast } from 'sonner';

const StateDetail = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const state = statesData.find((s) => s.code === code?.toUpperCase());
  const imageRef = useRef<HTMLDivElement>(null);
  const [fullscreenImage, setFullscreenImage] = useState<number | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [code]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreenImage === null) return;

      if (e.key === 'Escape') {
        setFullscreenImage(null);
      } else if (e.key === 'ArrowLeft') {
        navigateFullscreenImage(-1);
      } else if (e.key === 'ArrowRight') {
        navigateFullscreenImage(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImage]);

  const navigateFullscreenImage = (direction: number) => {
    if (fullscreenImage === null) return;
    const images = getStateImages(state?.photos);
    const newIndex = fullscreenImage + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      setFullscreenImage(newIndex);
    }
  };

  if (!state) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">State Not Found</h1>
            <p className="text-muted-foreground mb-8">The state you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/map">Back to Map</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (state.status === 'pending') {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">{state.name}</h1>
            <p className="text-xl text-muted-foreground mb-8">Coming Soon</p>
            <p className="text-muted-foreground mb-8">This sunset hasn't been captured yet. Stay tuned for updates!</p>
            <Button asChild>
              <Link to="/map">Back to Map</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = getStateImages(state.photos);
  const hasMultiplePhotos = images.length > 1;
  const completedStates = statesData.filter((s) => s.status === 'completed');
  const currentIndex = completedStates.findIndex((s) => s.code === state.code);
  const prevState = currentIndex > 0 ? completedStates[currentIndex - 1] : null;
  const nextState = currentIndex < completedStates.length - 1 ? completedStates[currentIndex + 1] : null;

  const handleShare = async () => {
    const shareData = {
      title: `Sunset in ${state.name}`,
      text: `Check out this beautiful sunset from ${state.location}! ${state.reflection}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate('/map')}
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Map
          </Button>

          {/* Featured Image */}
          <PhotoWatermark>
            <div ref={imageRef} className="relative w-full h-[60vh] min-h-[400px] rounded-lg overflow-hidden mb-8 animate-fade-in group cursor-pointer" onClick={() => setFullscreenImage(0)}>
              <img
                src={getStateFeaturedImage(state.photos)}
                alt={`Sunset in ${state.name}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-5 h-5" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/95 via-background/60 to-transparent">
                <h1 className="text-5xl font-serif font-bold text-primary-foreground mb-2">
                  {state.name}
                </h1>
                <div className="flex items-center gap-4 text-primary-foreground/90">
                  <div className="flex items-center gap-2">
                    <MapPin size={20} />
                    <span className="text-lg">{state.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={20} />
                    <span className="text-lg">
                      {new Date(state.date!).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </PhotoWatermark>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Photo Carousel (if multiple photos) */}
            {hasMultiplePhotos && (
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif font-bold mb-4">Photo Gallery</h2>
                    <Carousel className="w-full">
                      <CarouselContent>
                        {images.map((image, index) => (
                          <CarouselItem key={index}>
                            <PhotoWatermark className="relative w-full h-[400px] rounded-lg overflow-hidden group cursor-pointer" onClick={() => setFullscreenImage(index)}>
                              <img
                                src={image}
                                alt={`${state.name} sunset ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ZoomIn className="w-5 h-5" />
                              </div>
                              {state.photos?.captions?.[index] && (
                                <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-4">
                                  <p className="text-sm">{state.photos.captions[index]}</p>
                                </div>
                              )}
                            </PhotoWatermark>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      {images.length} photos
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* State Information */}
            <div className={hasMultiplePhotos ? 'lg:col-span-1' : 'lg:col-span-3'}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif font-bold mb-4">Reflection</h2>
                  <p className="text-lg leading-relaxed mb-6">{state.reflection}</p>

                  <Button onClick={handleShare} className="w-full" variant="outline">
                    <Share2 className="mr-2" size={20} />
                    Share This Sunset
                  </Button>
                </CardContent>
              </Card>

              {/* Navigation to Other States */}
              <div className="mt-6 space-y-4">
                {prevState && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate(`/state/${prevState.code}`)}
                  >
                    <ChevronLeft className="mr-2" size={20} />
                    Previous: {prevState.name}
                  </Button>
                )}
                {nextState && (
                  <Button
                    variant="outline"
                    className="w-full justify-end"
                    onClick={() => navigate(`/state/${nextState.code}`)}
                  >
                    Next: {nextState.name}
                    <ChevronRight className="ml-2" size={20} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Fullscreen Image Viewer */}
      {fullscreenImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={() => setFullscreenImage(null)}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
            onClick={() => setFullscreenImage(null)}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-30 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateFullscreenImage(-1);
                }}
                disabled={fullscreenImage === 0}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-30 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateFullscreenImage(1);
                }}
                disabled={fullscreenImage === images.length - 1}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white z-10">
              {fullscreenImage + 1} / {images.length}
            </div>
          )}

          {/* Fullscreen Image */}
          <img
            src={images[fullscreenImage]}
            alt={`${state.name} sunset ${fullscreenImage + 1}`}
            className="max-w-full max-h-full object-contain p-4"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Image Caption */}
          {state.photos?.captions?.[fullscreenImage] && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 max-w-2xl bg-black/60 backdrop-blur-sm px-6 py-3 rounded-lg text-white text-center z-10">
              {state.photos.captions[fullscreenImage]}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StateDetail;
