import { Button } from "./ui/button";
import { Facebook, Twitter, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SocialLoginButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 w-full">
      <Button
        onClick={() => navigate('/signup')}
        className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
      >
        <Facebook className="mr-2 h-4 w-4" />
        Continue with Facebook
      </Button>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={() => navigate('/signup')}
      >
        <Twitter className="mr-2 h-4 w-4 text-[#1DA1F2]" />
        Continue with Twitter
      </Button>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={() => navigate('/signup')}
      >
        <Mail className="mr-2 h-4 w-4 text-[#DB4437]" />
        Continue with Google
      </Button>
    </div>
  );
}; 