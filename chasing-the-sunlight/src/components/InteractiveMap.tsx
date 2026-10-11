import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { StateData } from '@/data/states';
import { getStateFeaturedImage } from '@/utils/imageMap';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

interface InteractiveMapProps {
  statesData: StateData[];
}

const InteractiveMap = ({ statesData }: InteractiveMapProps) => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShare = async (state: StateData) => {
    const shareData = {
      title: `Sunset in ${state.name}`,
      text: `Check out this beautiful sunset from ${state.location}, ${state.name}! ${state.reflection}`,
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
      // Fallback: Copy to clipboard
      const text = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
      await navigator.clipboard.writeText(text);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleStateClick = (geo: any) => {
    const stateName = geo.properties.name;
    const stateData = statesData.find((state) => state.name === stateName);

    if (stateData) {
      // Navigate to state detail page for completed states
      if (stateData.status === 'completed') {
        navigate(`/state/${stateData.code}`);
      } else {
        // Show modal for pending states
        setSelectedState(stateData);
        setIsModalOpen(true);
      }
    }
  };

  const getStateFill = (geo: any) => {
    const stateName = geo.properties.name;
    const stateData = statesData.find((state) => state.name === stateName);

    if (stateData?.status === 'completed') {
      return 'hsl(var(--secondary))';
    }
    return 'hsl(var(--muted))';
  };

  const getStateStyle = (geo: any) => {
    const stateName = geo.properties.name;
    const stateData = statesData.find((state) => state.name === stateName);

    return {
      default: {
        fill: getStateFill(geo),
        stroke: 'hsl(var(--background))',
        strokeWidth: 0.75,
        outline: 'none',
      },
      hover: {
        fill: stateData?.status === 'completed' ? 'hsl(var(--accent))' : 'hsl(var(--muted-foreground))',
        stroke: 'hsl(var(--background))',
        strokeWidth: 0.75,
        outline: 'none',
        cursor: 'pointer',
      },
      pressed: {
        fill: 'hsl(var(--accent))',
        stroke: 'hsl(var(--background))',
        strokeWidth: 0.75,
        outline: 'none',
      },
    };
  };

  return (
    <>
      <div className="w-full bg-card rounded-lg p-4 shadow-lg">
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{
            scale: 1000,
          }}
          className="w-full h-auto"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleStateClick(geo)}
                  style={getStateStyle(geo)}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* State Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedState && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-serif">
                  {selectedState.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {selectedState.status === 'completed' ? (
                  <>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-secondary">Completed</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare(selectedState)}
                        className="gap-2"
                      >
                        <Share2 size={16} />
                        Share this sunset
                      </Button>
                    </div>

                    {/* Sunset Photo */}
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={getStateFeaturedImage(selectedState.photos)}
                        alt={`Sunset in ${selectedState.name}`}
                        className="w-full h-80 object-cover"
                      />
                    </div>

                    {/* Location & Date */}
                    <div className="flex flex-col gap-3 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin size={20} />
                        <span className="text-lg">{selectedState.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={20} />
                        <span className="text-lg">
                          {selectedState.date &&
                            new Date(selectedState.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                        </span>
                      </div>
                    </div>

                    {/* Reflection */}
                    <div>
                      <h3 className="text-xl font-serif font-bold mb-3">Reflection</h3>
                      <p className="text-lg leading-relaxed">{selectedState.reflection}</p>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center">
                    <Badge variant="outline" className="mb-4">
                      Coming Soon
                    </Badge>
                    <p className="text-muted-foreground text-lg">
                      This state hasn't been visited yet. Stay tuned for the sunset from{' '}
                      {selectedState.name}!
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InteractiveMap;
