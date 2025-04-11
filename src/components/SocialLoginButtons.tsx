import { FacebookSignUp } from './FacebookSignUp';
import { TwitterSignUp } from './TwitterSignUp';
import { GoogleSignUp } from './GoogleSignUp';
import { Button } from './ui/button';

export const SocialLoginButtons = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full">
        <FacebookSignUp />
      </div>
      
      <div className="w-full">
        <TwitterSignUp />
      </div>
      
      <div className="w-full">
        <GoogleSignUp />
      </div>
    </div>
  );
}; 