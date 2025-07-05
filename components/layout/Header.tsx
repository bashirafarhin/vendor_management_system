'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '../Logo';
import Button from '../ui/Button';
import { useAuthModal } from '@/context/AuthModalContext';
import Modal from '@/components/ui/Modal';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';

const Header = () => {
   const { openLogin } = useAuthModal();
   const { isOpen, authType, close } = useAuthModal();

  return (
    <>
      <header className="w-full shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />

          <nav className="flex gap-6 text-gray-700 text-sm font-medium">
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <Link href="/services" className="hover:text-blue-600">Services</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            <Link href="/apply" className="hover:text-blue-600">Apply</Link>
          </nav>

          <div onClick={openLogin}>
            <Button>Sign In</Button>
          </div>
        </div>
      </header>
      
      <Modal isOpen={isOpen} onClose={close}>
      {authType === 'login' ? (
        <Login />
      ) : (
        <Register />
      )}
    </Modal>
    </>
  );
};

export default Header;
