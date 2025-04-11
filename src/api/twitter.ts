const TWITTER_API_URL = 'https://api.twitter.com/2';

export const exchangeCodeForToken = async (code: string) => {
  const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_TWITTER_CLIENT_SECRET;
  const redirectUri = import.meta.env.VITE_TWITTER_REDIRECT_URI || window.location.origin + '/twitter-callback';

  const params = new URLSearchParams();
  params.append('code', code);
  params.append('grant_type', 'authorization_code');
  params.append('client_id', clientId);
  params.append('redirect_uri', redirectUri);
  params.append('code_verifier', localStorage.getItem('twitter_oauth_state') || '');

  try {
    const response = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    return await response.json();
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    throw error;
  }
};

export const getUserInfo = async (accessToken: string) => {
  try {
    const response = await fetch(`${TWITTER_API_URL}/users/me?user.fields=profile_image_url,email`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    const data = await response.json();
    return {
      id: data.data.id,
      name: data.data.name,
      email: data.data.email,
      profile_image_url: data.data.profile_image_url,
    };
  } catch (error) {
    console.error('Error getting user info:', error);
    throw error;
  }
}; 