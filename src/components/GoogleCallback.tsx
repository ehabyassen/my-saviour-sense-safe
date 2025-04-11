import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the authorization code and state from URL parameters
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');
        const savedState = localStorage.getItem('google_oauth_state');

        // Verify state to prevent CSRF attacks
        if (!state || state !== savedState) {
          throw new Error('Invalid state parameter');
        }

        // Clear the saved state
        localStorage.removeItem('google_oauth_state');

        if (!code) {
          throw new Error('No authorization code received');
        }

        // Exchange the code for an access token
        const tokenResponse = await fetch('/api/google/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!tokenResponse.ok) {
          throw new Error('Failed to exchange code for token');
        }

        const tokenData = await tokenResponse.json();

        // Get user info using the access token
        const userResponse = await fetch('/api/google/user', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to get user info');
        }

        const userData = await userResponse.json();

        // Store user data in localStorage or your preferred state management solution
        localStorage.setItem('google_user', JSON.stringify(userData));

        toast({
          title: "Success",
          description: "Successfully logged in with Google!",
        });

        // Redirect back to the main page
        navigate('/');

      } catch (error) {
        console.error('Google callback error:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        toast({
          title: "Error",
          description: "Failed to complete Google login. Please try again.",
          variant: "destructive",
        });
      }
    };

    handleCallback();
  }, [navigate, toast]);

  if (error) {
    return (
      <div className="text-center p-4">
        <h1 className="text-xl font-bold text-red-500 mb-4">Authentication Error</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="text-center p-4">
      <h1 className="text-xl font-bold mb-4">Completing Google Login</h1>
      <p className="text-gray-600">Please wait while we complete your login...</p>
    </div>
  );
}; 