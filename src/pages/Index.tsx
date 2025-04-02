
import { useState } from 'react';
import { Shield, UserCheck, Phone, MapPin, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BottomNavigation from '@/components/BottomNavigation';
import EmergencyButton from '@/components/EmergencyButton';
import SafetyCard from '@/components/SafetyCard';
import FakeCallModal from '@/components/FakeCallModal';

const Index = () => {
  const { toast } = useToast();
  const [showFakeCall, setShowFakeCall] = useState(false);
  
  const handleEmergency = () => {
    // In a real app, this would send alerts to emergency contacts
    console.log('Emergency activated');
  };

  const handleSafetyCheck = () => {
    toast({
      title: "Safety Check Started",
      description: "We'll check in on you every 30 minutes",
    });
  };

  const handleFakeCall = () => {
    setShowFakeCall(true);
  };

  const handleLocationShare = () => {
    toast({
      title: "Location Shared",
      description: "Your location has been shared with your emergency contacts",
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-mysaviour-dark to-black pb-20">
      {/* Hero section with logo */}
      <div className="pt-10 pb-6 px-6">
        <div className="flex justify-center">
          <img 
            src="/app-logo.png" 
            alt="MySaviour Logo" 
            className="w-32 h-32"
          />
        </div>
        <h1 className="text-2xl font-bold text-center text-white mt-4">
          MySaviour
        </h1>
        <p className="text-white/70 text-center text-sm">
          Your personal safety companion
        </p>
      </div>
      
      {/* Emergency button */}
      <div className="flex justify-center my-8">
        <EmergencyButton onActivate={handleEmergency} />
      </div>
      
      {/* Safety features */}
      <div className="px-6 space-y-4">
        <h2 className="text-lg font-medium text-white mb-3">Quick Actions</h2>
        
        <SafetyCard
          icon={<Bell size={24} />}
          title="Safety Check-In"
          description="Set timed check-ins for your activities"
          onClick={handleSafetyCheck}
        />
        
        <SafetyCard
          icon={<Phone size={24} />}
          title="Fake Incoming Call"
          description="Receive a simulated call as an excuse to leave"
          onClick={handleFakeCall}
        />
        
        <SafetyCard
          icon={<MapPin size={24} />}
          title="Share Location"
          description="Share your real-time location with trusted contacts"
          onClick={handleLocationShare}
        />
        
        <SafetyCard
          icon={<UserCheck size={24} />}
          title="Safety Resources"
          description="Access safety tips and local help resources"
          onClick={() => window.location.href = '/safety'}
        />
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
      
      {/* Fake call modal */}
      <FakeCallModal 
        isOpen={showFakeCall}
        onClose={() => setShowFakeCall(false)}
      />
    </div>
  );
};

export default Index;
