"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "../Logo";
import Button from "../ui/Button";
import Modal from "@/components/ui/Modal";
import Login from "@/components/Login";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <header className="w-full shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />

          <nav className="flex gap-6 text-gray-700 text-sm font-medium">
            <Link href="/products" className="hover:text-blue-600">
              Products
            </Link>
            <Link href="/services" className="hover:text-blue-600">
              Services
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
            <Link href="/apply" className="hover:text-blue-600">
              Apply
            </Link>
          </nav>

          {status === "loading" ? null : session ? (
            <div onClick={handleSignOut}>
              <Button>Logout</Button>
            </div>
          ) : (
            <div onClick={() => setOpen(true)}>
              <Button>Sign In</Button>
            </div>
          )}
        </div>
      </header>

      {open && (
        <Modal>
          <Login />
        </Modal>
      )}
    </>
  );
};

export default Header;
