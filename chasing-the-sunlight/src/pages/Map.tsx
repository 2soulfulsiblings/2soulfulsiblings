import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { statesData } from '@/data/states';
import { MapPin, Calendar, Check, Clock, ArrowRight } from 'lucide-react';
import InteractiveMap from '@/components/InteractiveMap';

const Map = () => {
  const completedStates = statesData.filter((state) => state.status === 'completed');
  const pendingStates = statesData.filter((state) => state.status === 'pending');

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-serif font-bold mb-4 text-gradient-sunset">Journey Map</h1>
            <p className="text-xl text-foreground max-w-2xl mx-auto mb-8">
              Track the progress of my 50-state journey. Click on any state to see its sunset.
            </p>

            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-secondary" />
                <span className="text-sm font-medium">Completed ({completedStates.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-muted" />
                <span className="text-sm font-medium">Pending ({pendingStates.length})</span>
              </div>
            </div>

            <Card className="max-w-2xl mx-auto mb-12">
              <CardContent className="p-8">
                <p className="text-4xl font-serif font-bold mb-4">
                  {completedStates.length} / 50 States
                </p>
                <div className="w-full bg-muted rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-secondary to-accent h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(completedStates.length / 50) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive US Map */}
          <div className="mb-16">
            <InteractiveMap statesData={statesData} />
          </div>

          {/* Completed States */}
          {completedStates.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-2 text-foreground">
                <Check className="text-secondary" size={32} />
                Completed States
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedStates.map((state) => (
                  <Link key={state.code} to={`/state/${state.code}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-secondary transition-colors">{state.name}</h3>
                            <Badge className="mt-2 bg-secondary text-secondary-foreground">Completed</Badge>
                          </div>
                          <ArrowRight className="text-muted-foreground group-hover:text-secondary transition-colors" size={20} />
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
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

                        <p className="text-sm leading-relaxed line-clamp-2">{state.reflection}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Pending States */}
          <div>
            <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-2 text-foreground">
              <Clock className="text-accent" size={32} />
              Pending States
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {pendingStates.map((state) => (
                <Card key={state.code} className="text-center">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium">{state.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{state.code}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Map;
