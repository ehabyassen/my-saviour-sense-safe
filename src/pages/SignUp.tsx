import { FacebookSignUp } from "@/components/FacebookSignUp";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up with Facebook
          </h2>
        </div>
        <FacebookSignUp />
      </div>
    </div>
  );
};

export default SignUp; 