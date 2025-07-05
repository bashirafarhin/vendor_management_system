'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

interface AuthModalContextType {
  isOpen: boolean;
  authType: 'login' | 'register' | null;
  openLogin: () => void;
  openRegister: () => void;
  close: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register' | null>(null);

  const openLogin = useCallback(() => {
    setAuthType('login');
    setIsOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setAuthType('register');
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setAuthType(null);
  }, []);

  const value = useMemo(
    () => ({ isOpen, authType, openLogin, openRegister, close }),
    [isOpen, authType, openLogin, openRegister, close]
  );

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }
  return context;
};
