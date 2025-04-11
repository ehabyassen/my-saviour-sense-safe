import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Facebook } from 'lucide-react';

interface FacebookUser {
  id: string;
  name: string;
  email: string;
  picture: {
    data: {
      url: string;
    };
  };
}

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export const FacebookSignUp: React.FC = () => {
  const [user, setUser] = useState<FacebookUser | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      // Remove any existing SDK
      const existingScript = document.getElementById('facebook-jssdk');
      if (existingScript) {
        existingScript.remove();
      }

      window.fbAsyncInit = function() {
        window.FB.init({
          appId: '648777021382144',
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
      };

      // Load the SDK
      const js = document.createElement('script');
      js.id = 'facebook-jssdk';
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      js.async = true;
      js.defer = true;
      document.head.appendChild(js);
    };

    loadFacebookSDK();
  }, []);

  const handleFacebookResponse = (response: any) => {
    console.log('Facebook response:', response);
    if (response.status === 'connected') {
      // Get user data
      window.FB.api('/me', { fields: 'id,name,email,picture' }, (userData: any) => {
        console.log('User data:', userData);
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          picture: userData.picture
        });
        toast({
          title: "Successfully logged in",
          description: `Welcome, ${userData.name}!`,
        });
      });
    } else {
      toast({
        title: "Login cancelled",
        description: "You cancelled the Facebook login.",
        variant: "destructive",
      });
    }
  };

  const handleFacebookLogin = () => {
    if (window.FB) {
      window.FB.login(handleFacebookResponse, {
        scope: 'public_profile,email',
        return_scopes: true,
        enable_profile_selector: true
      });
    } else {
      toast({
        title: "Facebook SDK not loaded",
        description: "Please wait a moment and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {!user ? (
        <Button
          onClick={handleFacebookLogin}
          className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white flex items-center justify-center gap-2 h-10"
        >
          <Facebook className="h-5 w-5" />
          <span>Continue with Facebook</span>
        </Button>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Welcome, {user.name}!</h2>
          {user.picture && (
            <img 
              src={user.picture.data.url} 
              alt={user.name} 
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
          )}
          <p className="mb-2">Email: {user.email}</p>
          <Button 
            onClick={() => setUser(null)}
            variant="outline"
          >
            Logout
          </Button>
        </div>
      )}
    </>
  );
}; 