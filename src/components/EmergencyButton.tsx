
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface EmergencyButtonProps {
  onActivate: () => void;
}

const EmergencyButton = ({ onActivate }: EmergencyButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [holdTimer, setHoldTimer] = useState<number | null>(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const { toast } = useToast();
  
  const handlePressStart = () => {
    setIsPressed(true);
    const startTime = Date.now();
    
    // Update progress every 30ms
    const timerId = window.setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min((elapsedTime / 2000) * 100, 100); // 2 seconds to fill
      setHoldProgress(progress);
      
      if (progress >= 100) {
        handleEmergency();
        window.clearInterval(timerId);
      }
    }, 30);
    
    setHoldTimer(timerId);
  };
  
  const handlePressEnd = () => {
    if (holdTimer !== null) {
      window.clearInterval(holdTimer);
      setHoldTimer(null);
    }
    setIsPressed(false);
    setHoldProgress(0);
  };
  
  const handleEmergency = () => {
    toast({
      title: "Emergency Activated",
      description: "Your emergency contacts are being notified",
      variant: "destructive"
    });
    onActivate();
    handlePressEnd();
  };
  
  return (
    <div className="relative flex flex-col items-center">
      <div className="text-xs text-white/80 mb-1">
        Hold for 2 seconds to activate
      </div>
      
      {/* Progress ring */}
      <div className="absolute w-20 h-20 rounded-full">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="5"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#EF4444"
            strokeWidth="5"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - holdProgress / 100)}`}
            transform="rotate(-90 50 50)"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      <button
        className={`w-16 h-16 rounded-full ${
          isPressed ? "bg-mysaviour-danger scale-95" : "bg-mysaviour-danger"
        } text-white text-xl font-bold emergency-button transition-transform flex items-center justify-center z-10`}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        SOS
      </button>
      
      <div className="text-xs text-white/80 mt-2">
        Emergency Help
      </div>
    </div>
  );
};

export default EmergencyButton;
