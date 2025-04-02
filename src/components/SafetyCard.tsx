
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SafetyCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
}

const SafetyCard = ({ 
  title, 
  description, 
  icon, 
  className,
  onClick 
}: SafetyCardProps) => {
  return (
    <div 
      className={cn(
        "card-glass p-4 flex items-center space-x-4 hover:bg-card/40 transition-colors cursor-pointer", 
        className
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-mysaviour-primary/20 flex items-center justify-center text-mysaviour-primary">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-white">{title}</h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>
    </div>
  );
};

export default SafetyCard;
