"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { signIn, useSession } from "next-auth/react";
import Logo from "./Logo";

const Login = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center gap-4 p-10 rounded-lg shadow-lg text-center bg-white">
      <Logo />
      {session ? (
        <p>Welcome, {session.user?.name}</p>
      ) : (
        <>
          <p>Login with Google</p>
          <div onClick={() => signIn("google")}>
            <Button>Sign in with Google</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
