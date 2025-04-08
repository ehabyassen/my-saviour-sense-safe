import { useState } from 'react';
import { Shield, UserCheck, Phone, MapPin, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BottomNavigation from '@/components/BottomNavigation';
import EmergencyButton from '@/components/EmergencyButton';
import SafetyCard from '@/components/SafetyCard';
import FakeCallModal from '@/components/FakeCallModal';
import { SocialLoginButtons } from '@/components/SocialLoginButtons';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-gradient-to-b from-mysaviour-dark to-black flex flex-col">
      {/* Hero section with logo and motto */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-32 h-32 rounded-full bg-mysaviour-primary/20 flex items-center justify-center mb-6">
          <Shield size={64} className="text-mysaviour-primary" />
        </div>
        
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          MySaviour
        </h1>
        
        <p className="text-white/70 text-center text-lg mb-8 max-w-md">
          Your personal safety companion. Stay safe, stay connected.
        </p>
        
        <div className="w-full max-w-sm">
          <SocialLoginButtons />
        </div>
      </div>
      
      {/* Footer text */}
      <div className="p-6 text-center">
        <p className="text-white/50 text-sm">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="text-white/70 hover:text-white underline">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-white/70 hover:text-white underline">
            Privacy Policy
          </Link>
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
