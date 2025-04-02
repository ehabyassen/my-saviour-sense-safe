
import { useState } from 'react';
import { Shield, BookOpen, Phone, AlertTriangle, ChevronRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import BottomNavigation from '@/components/BottomNavigation';

interface ResourceItem {
  title: string;
  content: string;
}

const safetyTips: ResourceItem[] = [
  {
    title: "Trust Your Instincts",
    content: "Your gut feelings are there for a reason. If something feels off about a situation or person, don't ignore it. It's better to appear rude than to stay in a potentially dangerous situation."
  },
  {
    title: "Stay Connected",
    content: "Let people know your plans, including where you're going and when you expect to return. Check in regularly with friends or family, especially when meeting new people."
  },
  {
    title: "Be Aware of Your Surroundings",
    content: "Stay alert and focused, especially in unfamiliar places. Avoid wearing headphones or being absorbed in your phone when walking alone. Scan your environment regularly."
  },
  {
    title: "Create Boundaries",
    content: "You have the right to set boundaries. Practice assertive communication and don't be afraid to say 'no' firmly. Your safety and comfort are more important than being polite."
  },
  {
    title: "Have an Exit Strategy",
    content: "Always know how to leave a situation quickly. Identify exits when entering new places and have a plan for how you would escape if needed."
  }
];

const emergencyContacts: ResourceItem[] = [
  {
    title: "Emergency Services",
    content: "Dial 911 (US) or your local emergency number for immediate police, medical, or fire assistance."
  },
  {
    title: "National Domestic Violence Hotline",
    content: "1-800-799-SAFE (7233) - Available 24/7 for crisis intervention, safety planning, and referrals."
  },
  {
    title: "RAINN (Rape, Abuse & Incest National Network)",
    content: "1-800-656-HOPE (4673) - Connects callers to local sexual assault service providers and offers confidential support."
  },
  {
    title: "Crisis Text Line",
    content: "Text HOME to 741741 - Free, 24/7 support for those in crisis, connecting people with trained crisis counselors."
  }
];

const Safety = () => {
  const [activeCategory, setActiveCategory] = useState<'tips' | 'contacts' | 'plans'>('tips');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-mysaviour-dark to-black pb-20">
      {/* Header */}
      <div className="pt-10 px-6 pb-4">
        <div className="flex items-center">
          <Shield size={24} className="text-mysaviour-primary mr-2" />
          <h1 className="text-2xl font-bold text-white">Safety Resources</h1>
        </div>
        <p className="text-white/70 text-sm mt-1">
          Tips, contacts and safety plans to help you stay protected
        </p>
      </div>
      
      {/* Category tabs */}
      <div className="flex border-b border-white/10 px-4 mb-4">
        <button 
          className={`py-3 px-4 text-sm font-medium relative ${
            activeCategory === 'tips' 
              ? 'text-mysaviour-primary' 
              : 'text-white/60'
          }`}
          onClick={() => setActiveCategory('tips')}
        >
          <span className="flex items-center">
            <BookOpen size={16} className="mr-1" />
            Safety Tips
          </span>
          {activeCategory === 'tips' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-mysaviour-primary"></span>
          )}
        </button>
        
        <button 
          className={`py-3 px-4 text-sm font-medium relative ${
            activeCategory === 'contacts' 
              ? 'text-mysaviour-primary' 
              : 'text-white/60'
          }`}
          onClick={() => setActiveCategory('contacts')}
        >
          <span className="flex items-center">
            <Phone size={16} className="mr-1" />
            Helplines
          </span>
          {activeCategory === 'contacts' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-mysaviour-primary"></span>
          )}
        </button>
        
        <button 
          className={`py-3 px-4 text-sm font-medium relative ${
            activeCategory === 'plans' 
              ? 'text-mysaviour-primary' 
              : 'text-white/60'
          }`}
          onClick={() => setActiveCategory('plans')}
        >
          <span className="flex items-center">
            <AlertTriangle size={16} className="mr-1" />
            Safety Plans
          </span>
          {activeCategory === 'plans' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-mysaviour-primary"></span>
          )}
        </button>
      </div>
      
      {/* Content area */}
      <div className="px-6">
        {activeCategory === 'tips' && (
          <Accordion type="single" collapsible className="w-full">
            {safetyTips.map((tip, index) => (
              <AccordionItem key={index} value={`tip-${index}`} className="border-white/10">
                <AccordionTrigger className="text-white hover:text-mysaviour-accent">
                  {tip.title}
                </AccordionTrigger>
                <AccordionContent className="text-white/70">
                  {tip.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        
        {activeCategory === 'contacts' && (
          <Accordion type="single" collapsible className="w-full">
            {emergencyContacts.map((contact, index) => (
              <AccordionItem key={index} value={`contact-${index}`} className="border-white/10">
                <AccordionTrigger className="text-white hover:text-mysaviour-accent">
                  {contact.title}
                </AccordionTrigger>
                <AccordionContent className="text-white/70">
                  {contact.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        
        {activeCategory === 'plans' && (
          <div className="text-center py-10">
            <h3 className="text-white font-medium mb-2">Create Your Safety Plan</h3>
            <p className="text-white/70 mb-6">
              A personalized safety plan helps you prepare for and respond to unsafe situations.
            </p>
            <button className="btn-primary flex items-center mx-auto">
              <span>Create Safety Plan</span>
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Safety;
