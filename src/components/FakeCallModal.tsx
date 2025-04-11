import { useState, useEffect, useRef } from 'react';
import { User, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface FakeCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FakeCallModal = ({ isOpen, onClose }: FakeCallModalProps) => {
  const [callStatus, setCallStatus] = useState<'ringing' | 'active' | 'ended'>('ringing');
  const [callDuration, setCallDuration] = useState(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);
  const ringtoneRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Initialize audio element
    if (!ringtoneRef.current) {
      ringtoneRef.current = new Audio('/audio/ringtone.mp3');
      ringtoneRef.current.loop = true;
      // Preload the audio
      ringtoneRef.current.load();
    }

    if (isOpen) {
      // Start ringing
      if (ringtoneRef.current) {
        // Try to play the audio
        const playPromise = ringtoneRef.current.play();
        
        // Handle autoplay restrictions
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Error playing ringtone:', error);
            // If autoplay is blocked, show a message to the user
            alert('Please interact with the page to allow audio playback');
          });
        }
      }

      // Auto-accept call after 3 seconds
      const acceptTimeout = setTimeout(() => {
        setCallStatus('active');
        
        // Stop ringing
        if (ringtoneRef.current) {
          ringtoneRef.current.pause();
          ringtoneRef.current.currentTime = 0;
        }
        
        // Start the call timer
        const interval = window.setInterval(() => {
          setCallDuration(prev => prev + 1);
        }, 1000);
        
        setTimerInterval(interval);
      }, 3000);
      
      return () => {
        clearTimeout(acceptTimeout);
        if (timerInterval !== null) {
          clearInterval(timerInterval);
        }
        // Stop ringing when component unmounts
        if (ringtoneRef.current) {
          ringtoneRef.current.pause();
          ringtoneRef.current.currentTime = 0;
        }
      };
    }
  }, [isOpen]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleEndCall = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    // Stop ringing
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
    setCallStatus('ended');
    setTimeout(() => {
      setCallDuration(0);
      onClose();
    }, 500);
  };
  
  const getStatusText = () => {
    switch (callStatus) {
      case 'ringing': return 'Incoming call...';
      case 'active': return formatTime(callDuration);
      case 'ended': return 'Call ended';
      default: return '';
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => {
      if (callStatus !== 'active') {
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-md p-0 bg-mysaviour-dark overflow-hidden">
        <div className="flex flex-col h-[500px]">
          {/* Caller info */}
          <div className="p-6 pt-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <User size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-medium text-white">Mom</h3>
            <p className="text-white/70 text-sm mt-1">{getStatusText()}</p>
          </div>
          
          {/* Spacer */}
          <div className="flex-1"></div>
          
          {/* Call controls */}
          <div className="p-6 flex justify-center space-x-6">
            {callStatus === 'ringing' ? (
              <>
                <Button 
                  size="lg" 
                  className="h-16 w-16 rounded-full bg-mysaviour-danger hover:bg-mysaviour-danger/90"
                  onClick={onClose}
                >
                  <X size={24} />
                </Button>
                <Button 
                  size="lg" 
                  className="h-16 w-16 rounded-full bg-mysaviour-success hover:bg-mysaviour-success/90"
                  onClick={() => {
                    setCallStatus('active');
                    if (ringtoneRef.current) {
                      ringtoneRef.current.pause();
                      ringtoneRef.current.currentTime = 0;
                    }
                  }}
                >
                  <Phone size={24} />
                </Button>
              </>
            ) : (
              <Button 
                size="lg" 
                className="h-16 w-16 rounded-full bg-mysaviour-danger hover:bg-mysaviour-danger/90"
                onClick={handleEndCall}
              >
                <X size={24} />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FakeCallModal;
