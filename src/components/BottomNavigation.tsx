
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ShieldCheck, Settings, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const BottomNavigation = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('/');

  const navItems: NavItem[] = [
    {
      icon: <Home size={22} />,
      label: 'Home',
      path: '/'
    },
    {
      icon: <ShieldCheck size={22} />,
      label: 'Safety',
      path: '/safety'
    },
    {
      icon: <Phone size={22} />,
      label: 'Help',
      path: '/help'
    },
    {
      icon: <MapPin size={22} />,
      label: 'Map',
      path: '/map'
    },
    {
      icon: <Settings size={22} />,
      label: 'Settings',
      path: '/settings'
    }
  ];

  const handleNavigation = (path: string) => {
    setActive(path);
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-card/70 backdrop-blur-lg border-t border-white/10 flex justify-around items-center px-2 z-50">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => handleNavigation(item.path)}
          className={cn(
            "nav-item",
            active === item.path ? "nav-item-active" : "text-gray-400"
          )}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
