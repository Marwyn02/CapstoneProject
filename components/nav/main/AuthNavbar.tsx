/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Router from "next/router";
import Link from "next/link";

import { createClient } from "@/utils/supabase/component";
import type { User } from "@supabase/supabase-js";

import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import AuthLogin from "./authenticators/AuthLogin";
import AuthSignUp from "./authenticators/AuthSignUp";

type AuthNavBarProps = {
  user: User;
};

export const AuthNavBar = forwardRef<
  { toggleAction: () => void },
  AuthNavBarProps
>(({ user }, ref) => {
  const supabase = createClient();
  useImperativeHandle(ref, () => ({
    toggleAction,
  }));
  const [signIn, setSignIn] = useState<boolean>(true);

  // Nav Sheet State
  const [open, setOpen] = useState(false);

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      } else {
        toggleSheet();
      }

      Router.push("/");
    } catch (error) {
      console.error("ERROR! ", error);
    }
  }

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error(error);
    } else {
      toggleSheet();
    }

    Router.push("/");
  }

  const toggleAction = () => {
    setOpen(true);
  };
  const toggleSheet = () => {
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          // type="button"
          className="flex justify-end items-center bg-transparent border-0 hover:bg-transparent hover:opacity-60 hover:border-0 duration-300 focus:outline-none"
        >
          {user ? (
            <p className="font-medium text-start text-[#2A3242] text-sm duration-300">
              {user.user_metadata.firstname + " " + user.user_metadata.lastname}
            </p>
          ) : (
            <div className="md:grid md:grid-cols-1 text-start hidden text-[#2A3242] text-sm duration-300">
              <p>Sign In</p>
              <p>Create Account</p>
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"} className="px-2">
        <SheetHeader>
          <SheetTitle className="flex items-center text-[#2A3242] tracking-wider font-extralight border-b px-5 pt-10 pb-14 text-4xl font-serif">
            Your Account
          </SheetTitle>
          {user ? (
            <section className="grid grid-cols-1 space-y-6 px-5">
              <Link href={"/"}>Your bookings</Link>
              <Link href={"/"}>Your Account</Link>
            </section>
          ) : (
            <>
              {/* Auth selection */}
              <section className="grid grid-cols-2 px-5">
                <Button
                  type="button"
                  onClick={() => setSignIn(true)}
                  className={`${
                    signIn
                      ? "bg-transparent border-t-none border-x-none border-b-2 border-black text-gray-800 hover:bg-gray-50"
                      : "bg-slate-900 text-slate-50"
                  }  text-sm duration-300`}
                >
                  Sign in
                </Button>
                <Button
                  type="button"
                  onClick={() => setSignIn(false)}
                  className={`${
                    !signIn
                      ? "bg-transparent border-t-none border-x-none border-b-2 border-black text-gray-800 hover:bg-gray-50"
                      : "bg-slate-900 text-slate-50"
                  }  text-sm duration-300`}
                >
                  Create an account
                </Button>
              </section>

              {signIn ? (
                // Login auth
                <AuthLogin toggleSheet={toggleSheet} />
              ) : (
                // Register auth
                <AuthSignUp toggleSheet={toggleSheet} />
              )}

              {/* Signin with 0auth */}
              <div className="px-5">
                <p className="text-xs italic mb-4">or continue with:</p>

                {/* Goggle 0Auth Login  */}
                <Button
                  type="button"
                  onClick={signInWithGoogle}
                  className="flex items-center gap-x-2 border rounded-sm bg-red-400 text-xs h-10 py-2.5 text-white w-full mb-5 hover:bg-gray-100 hover:text-red-700 hover:rounded-sm"
                  // disabled={isLoading}
                >
                  <FaGoogle className="h-3 w-3" />
                  Sign in with Google
                </Button>
              </div>
            </>
          )}
        </SheetHeader>

        <SheetFooter>
          {user && (
            <Button type="button" onClick={signOut}>
              Sign out
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
});
