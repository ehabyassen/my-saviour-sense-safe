
import { useState, useEffect } from 'react';
import { MapPin, Shield, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BottomNavigation from '@/components/BottomNavigation';

const Map = () => {
  const { toast } = useToast();
  const [hasLocation, setHasLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading the map
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasLocation(true);
      
      toast({
        title: "Location Found",
        description: "Your current location has been determined",
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const safeLocations = [
    { name: "Police Station", distance: "0.5 miles", type: "police" },
    { name: "Community Center", distance: "0.8 miles", type: "community" },
    { name: "Women's Shelter", distance: "1.2 miles", type: "shelter" },
    { name: "Hospital", distance: "1.5 miles", type: "medical" }
  ];
  
  const getIconForType = (type: string) => {
    switch(type) {
      case 'police':
        return <Shield size={18} className="text-blue-400" />;
      case 'shelter':
        return <Shield size={18} className="text-purple-400" />;
      case 'medical':
        return <AlertCircle size={18} className="text-red-400" />;
      default:
        return <Shield size={18} className="text-green-400" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-mysaviour-dark to-black pb-20">
      {/* Header */}
      <div className="pt-10 px-6 pb-4">
        <div className="flex items-center">
          <MapPin size={24} className="text-mysaviour-primary mr-2" />
          <h1 className="text-2xl font-bold text-white">Safety Map</h1>
        </div>
        <p className="text-white/70 text-sm mt-1">
          Find safe locations and track your journey
        </p>
      </div>
      
      {/* Map placeholder */}
      <div className="px-6 mb-6">
        <div className="bg-mysaviour-dark/30 border border-white/10 rounded-xl overflow-hidden h-64 flex items-center justify-center">
          {isLoading ? (
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-t-mysaviour-primary border-white/20 rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-white/70 text-sm">Loading map...</p>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mysaviour-dark/90"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm">
                  <span className="flex items-center">
                    <MapPin size={16} className="text-mysaviour-primary mr-1" />
                    Your location is being tracked
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Safe locations */}
      <div className="px-6">
        <h2 className="text-lg font-medium text-white mb-3">
          Nearby Safe Locations
        </h2>
        
        <div className="space-y-2">
          {safeLocations.map((location, index) => (
            <div 
              key={index} 
              className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-mysaviour-primary/20 flex items-center justify-center mr-3">
                {getIconForType(location.type)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{location.name}</p>
                <p className="text-xs text-white/60">{location.distance}</p>
              </div>
              <button className="text-mysaviour-primary text-sm">
                Directions
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Map;
