'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { useAuthModal } from '@/context/AuthModalContext';

const Login = () => {
  const { openRegister } = useAuthModal();

  const handleGoogleLogin = () => {
    console.log('Logging in with Google...');
  };

  return (
    <div className="flex flex-col items-center gap-4 text-white p-6 rounded-lg shadow-lg w-[300px] text-center border-2 border-blue-600 bg-black">
      <h2 className="text-2xl font-semibold">Welcome Back</h2>
      <div onClick={handleGoogleLogin}>
        <Button>Login with Google</Button>
      </div>
      <p className="text-sm text-gray-400">
        Don&apos;t have an account?{' '}
        <span
          onClick={openRegister}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;