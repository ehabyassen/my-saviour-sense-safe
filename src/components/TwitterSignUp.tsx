import React, { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Twitter } from 'lucide-react';

interface TwitterUser {
  id: string;
  name: string;
  email: string;
  profile_image_url: string;
}

export const TwitterSignUp: React.FC = () => {
  const [user, setUser] = useState<TwitterUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTwitterLogin = async () => {
    try {
      setIsLoading(true);
      
      // Twitter OAuth 2.0 configuration
      const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
      const redirectUri = import.meta.env.VITE_TWITTER_REDIRECT_URI || window.location.origin + '/twitter-callback';
      const scope = 'tweet.read users.read offline.access';
      
      // Generate random state for security
      const state = Math.random().toString(36).substring(7);
      localStorage.setItem('twitter_oauth_state', state);
      
      // Construct the authorization URL
      const authUrl = new URL('https://twitter.com/i/oauth2/authorize');
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('client_id', clientId);
      authUrl.searchParams.append('redirect_uri', redirectUri);
      authUrl.searchParams.append('scope', scope);
      authUrl.searchParams.append('state', state);
      authUrl.searchParams.append('code_challenge_method', 'plain');
      authUrl.searchParams.append('code_challenge', state);
      
      // Redirect to Twitter authorization page
      window.location.href = authUrl.toString();
      
    } catch (error) {
      console.error('Twitter login error:', error);
      toast({
        title: "Error",
        description: "Failed to initialize Twitter login. Please try again.",
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
          onClick={handleTwitterLogin}
          disabled={isLoading}
          variant="outline"
          className="w-full border-[#1DA1F2] text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center gap-2 h-10"
        >
          <Twitter className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Connecting...' : 'Continue with Twitter'}</span>
        </Button>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Welcome, {user.name}!</h2>
          <img 
            src={user.profile_image_url} 
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