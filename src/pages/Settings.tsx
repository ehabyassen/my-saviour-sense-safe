
import { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, ChevronRight, Phone } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import BottomNavigation from '@/components/BottomNavigation';

const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);
  const [autoAlert, setAutoAlert] = useState(false);
  
  const handleToggle = (setting: string, value: boolean) => {
    toast({
      title: `${setting} ${value ? 'Enabled' : 'Disabled'}`,
      description: `You've ${value ? 'enabled' : 'disabled'} ${setting.toLowerCase()}.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-mysaviour-dark to-black pb-20">
      {/* Header */}
      <div className="pt-10 px-6 pb-6">
        <div className="flex items-center">
          <SettingsIcon size={24} className="text-mysaviour-primary mr-2" />
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>
        <p className="text-white/70 text-sm mt-1">
          Configure your preferences and safety settings
        </p>
      </div>
      
      {/* Profile Section */}
      <div className="px-6 mb-6">
        <div className="card-glass p-4 flex items-center">
          <div className="w-12 h-12 bg-mysaviour-primary/20 rounded-full flex items-center justify-center mr-4">
            <User size={24} className="text-mysaviour-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium">User Profile</h3>
            <p className="text-white/70 text-sm">Edit your personal information</p>
          </div>
          <ChevronRight size={20} className="text-white/50" />
        </div>
      </div>
      
      {/* Safety Settings */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-medium text-white mb-3">
          Safety Settings
        </h2>
        
        <div className="card-glass divide-y divide-white/10">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Bell size={20} className="text-mysaviour-primary mr-3" />
              <span className="text-white">Notifications</span>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={(checked) => {
                setNotifications(checked);
                handleToggle('Notifications', checked);
              }} 
            />
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <MapPin size={20} className="text-mysaviour-primary mr-3" />
              <span className="text-white">Location Tracking</span>
            </div>
            <Switch 
              checked={locationTracking} 
              onCheckedChange={(checked) => {
                setLocationTracking(checked);
                handleToggle('Location Tracking', checked);
              }} 
            />
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Shield size={20} className="text-mysaviour-primary mr-3" />
              <span className="text-white">Auto-Alert on Distress</span>
            </div>
            <Switch 
              checked={autoAlert} 
              onCheckedChange={(checked) => {
                setAutoAlert(checked);
                handleToggle('Auto-Alert', checked);
              }} 
            />
          </div>
        </div>
      </div>
      
      {/* Emergency Contacts */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-medium text-white mb-3">
          Emergency Contacts
        </h2>
        
        <div className="card-glass p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-mysaviour-primary/20 rounded-full flex items-center justify-center mr-3">
                <Phone size={16} className="text-mysaviour-primary" />
              </div>
              <div>
                <p className="text-white text-sm">Mom</p>
                <p className="text-white/60 text-xs">+1 555-123-4567</p>
              </div>
            </div>
            <button className="text-mysaviour-primary text-sm">Edit</button>
          </div>
          
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-mysaviour-primary/20 rounded-full flex items-center justify-center mr-3">
                <Phone size={16} className="text-mysaviour-primary" />
              </div>
              <div>
                <p className="text-white text-sm">Friend</p>
                <p className="text-white/60 text-xs">+1 555-987-6543</p>
              </div>
            </div>
            <button className="text-mysaviour-primary text-sm">Edit</button>
          </div>
          
          <button className="w-full py-2 text-center text-mysaviour-primary text-sm mt-2 border border-mysaviour-primary/30 rounded-lg">
            Add Emergency Contact
          </button>
        </div>
      </div>
      
      {/* App Info */}
      <div className="px-6">
        <div className="text-center">
          <h3 className="text-mysaviour-primary text-sm font-medium">
            MySaviour v1.0.0
          </h3>
          <p className="text-white/50 text-xs mt-1">
            Women's Safety Application
          </p>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Settings;
