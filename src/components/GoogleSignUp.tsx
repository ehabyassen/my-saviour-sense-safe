import React, { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Chrome } from 'lucide-react';

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export const GoogleSignUp: React.FC = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      
      // Google OAuth 2.0 configuration
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI || window.location.origin + '/google-callback';
      const scope = 'email profile';
      
      // Generate random state for security
      const state = Math.random().toString(36).substring(7);
      localStorage.setItem('google_oauth_state', state);
      
      // Construct the authorization URL
      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('client_id', clientId);
      authUrl.searchParams.append('redirect_uri', redirectUri);
      authUrl.searchParams.append('scope', scope);
      authUrl.searchParams.append('state', state);
      authUrl.searchParams.append('access_type', 'offline');
      authUrl.searchParams.append('prompt', 'consent');
      
      // Redirect to Google authorization page
      window.location.href = authUrl.toString();
      
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        title: "Error",
        description: "Failed to initialize Google login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!user ? (
        <Button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full bg-white hover:bg-gray-50 text-black border border-gray-300 flex items-center justify-center gap-2 h-10"
        >
          <Chrome className={`h-5 w-5 text-[#DB4437] ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Connecting...' : 'Continue with Google'}</span>
        </Button>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Welcome, {user.name}!</h2>
          <img 
            src={user.picture} 
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
    </>
  );
}; 