import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import SignInModal from './SignInModal';

export default function AuthPrompt({ onContinueAsGuest, onSignIn }) {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignInSuccess = (userData) => {
    setShowSignIn(false);
    onSignIn(userData);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-[#434725] mb-6 text-center">Sign In or Continue as Guest</h2>
          
          <div className="space-y-6">
            <div className="bg-[#FFF8CC] p-6 rounded-xl">
              <h3 className="font-bold text-[#434725] mb-2">Sign In Benefits:</h3>
              <ul className="space-y-2 text-[#434725]/80">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F26722] rounded-full" />
                  Earn 1 point for every $5 spent
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F26722] rounded-full" />
                  Track your order history
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F26722] rounded-full" />
                  Faster checkout experience
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowSignIn(true)}
                className="flex items-center justify-center gap-2 bg-[#F26722] text-[#FFF8CC] px-6 py-3 rounded-xl font-semibold hover:bg-[#FF850A] transition-all duration-300 hover:shadow-lg"
              >
                <UserCircle className="w-5 h-5" />
                Sign In
              </button>
              <button
                onClick={onContinueAsGuest}
                className="px-6 py-3 rounded-xl font-semibold border-2 border-[#434725] text-[#434725] hover:bg-[#434725] hover:text-[#FFF8CC] transition-all duration-300"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSignIn && (
        <SignInModal 
          onClose={() => setShowSignIn(false)}
          onSuccess={handleSignInSuccess}
        />
      )}
    </>
  );
} 