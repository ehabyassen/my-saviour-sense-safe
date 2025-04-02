
import { useState } from 'react';
import { Phone, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import BottomNavigation from '@/components/BottomNavigation';
import EmergencyButton from '@/components/EmergencyButton';
import FakeCallModal from '@/components/FakeCallModal';

const Help = () => {
  const { toast } = useToast();
  const [showFakeCall, setShowFakeCall] = useState(false);
  
  const handleEmergency = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Your emergency contacts have been notified of your situation",
      variant: "destructive",
    });
  };

  const callOptions = [
    { name: "Mom", delay: 0 },
    { name: "Friend", delay: 10 },
    { name: "Colleague", delay: 30 },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-mysaviour-dark to-black pb-20">
      {/* Header */}
      <div className="pt-10 px-6 pb-6">
        <div className="flex items-center">
          <Phone size={24} className="text-mysaviour-primary mr-2" />
          <h1 className="text-2xl font-bold text-white">Emergency Help</h1>
        </div>
        <p className="text-white/70 text-sm mt-1">
          Quick access to emergency support and help features
        </p>
      </div>
      
      {/* Emergency Section */}
      <div className="px-6 mb-8">
        <div className="card-glass p-6 flex flex-col items-center">
          <AlertCircle size={36} className="text-mysaviour-danger mb-2" />
          <h2 className="text-lg font-semibold text-white mb-1">
            In Immediate Danger?
          </h2>
          <p className="text-white/70 text-center text-sm mb-6">
            Hold the SOS button to send your location to emergency contacts and authorities
          </p>
          
          <EmergencyButton onActivate={handleEmergency} />
        </div>
      </div>
      
      {/* Fake Call Section */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-medium text-white mb-3">
          Need an Excuse to Leave?
        </h2>
        <div className="card-glass p-6">
          <p className="text-white/70 text-sm mb-4">
            Receive a simulated call as an excuse to leave an uncomfortable situation
          </p>
          
          <div className="space-y-3">
            {callOptions.map((option, index) => (
              <button 
                key={index}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => {
                  if (option.delay === 0) {
                    setShowFakeCall(true);
                  } else {
                    toast({
                      title: `Call Scheduled`,
                      description: `Incoming call from ${option.name} in ${option.delay} seconds`,
                    });
                    setTimeout(() => setShowFakeCall(true), option.delay * 1000);
                  }
                }}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-mysaviour-primary/20 flex items-center justify-center mr-3">
                    <Phone size={16} className="text-mysaviour-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-left">{option.name}</p>
                    <p className="text-xs text-white/60">
                      {option.delay === 0 ? "Immediate call" : `After ${option.delay} seconds`}
                    </p>
                  </div>
                </div>
                <div className="text-mysaviour-primary">Call</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Safe Zone Information */}
      <div className="px-6">
        <h2 className="text-lg font-medium text-white mb-3">
          Find Safe Zones
        </h2>
        <Button 
          className="w-full bg-gradient-to-r from-mysaviour-primary to-mysaviour-secondary h-12"
        >
          <Shield className="mr-2" size={18} />
          <span>View Nearby Safe Zones</span>
        </Button>
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

export default Help;
