'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { useAuthModal } from '@/context/AuthModalContext';

const Register = () => {
  const { openLogin } = useAuthModal();

  const handleGoogleRegister = () => {
    console.log('Registering with Google...');
  };

  return (
    <div className="flex flex-col items-center gap-4 text-white p-6 rounded-lg shadow-lg w-[300px] text-center border-2 border-blue-600 bg-black">
      <h2 className="text-2xl font-semibold">Create an Account</h2>
      <div onClick={handleGoogleRegister}>
        <Button className="bg-green-600 hover:bg-green-700 text-white">Register with Google</Button>
      </div>
      <p className="text-sm text-gray-400">
        Already have an account?{' '}
        <span
          onClick={openLogin}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;