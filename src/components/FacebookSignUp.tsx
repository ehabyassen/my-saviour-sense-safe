import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

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
      if (document.getElementById('facebook-jssdk')) return;
      
      const fjs = document.getElementsByTagName('script')[0];
      const js = document.createElement('script');
      js.id = 'facebook-jssdk';
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);

      // Initialize FB SDK after loading
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: '648777021382144',
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
      };
    };

    loadFacebookSDK();
  }, []);

  const responseFacebook = (response: any) => {
    console.log('Facebook response:', response);
    if (response.authResponse) {
      window.FB.api('/me', { fields: 'name,email,picture' }, (response: any) => {
        setUser({
          id: response.id,
          name: response.name,
          email: response.email,
          picture: response.picture
        });
        toast({
          title: "Successfully logged in with Facebook",
          description: `Welcome, ${response.name}!`,
        });
      });
    } else {
      toast({
        title: "Facebook login failed",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      });
    }
  };

  const handleFacebookLogin = () => {
    if (window.FB) {
      window.FB.login(responseFacebook, { 
        scope: 'email,public_profile',
        return_scopes: true
      });
    } else {
      toast({
        title: "Facebook SDK not loaded",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {!user ? (
        <div className="w-full">
          <Button
            onClick={handleFacebookLogin}
            className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white flex items-center justify-center gap-2"
          >
            <span>Continue with Facebook</span>
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Welcome, {user.name}!</h2>
          <img 
            src={user.picture.data.url} 
            alt={user.name} 
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <p className="mb-2">Email: {user.email}</p>
          <Button 
            onClick={() => setUser(null)}
            variant="outline"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}; 