/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";

import { createClient } from "@/utils/supabase/component";
import type { User } from "@supabase/supabase-js";

import { FaGoogle } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
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
import { openSideAuth } from "@/store/store";

export const AuthNavBar = ({ user }: { user: User }) => {
  const supabase = createClient();
  const setToggleAction = openSideAuth((state) => state.setToggleAction);

  useEffect(() => {
    setToggleAction(toggleAction);
  }, [setToggleAction]);

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
            <div>
              <p className="font-medium font-serif text-start text-[#2A3242] duration-300">
                {user?.user_metadata?.firstname +
                  " " +
                  user?.user_metadata?.lastname}
              </p>
              <p className="text-xs text-gray-700 font-serif text-start">
                Status: Classic
              </p>
            </div>
          ) : (
            <div className="md:grid md:grid-cols-1 text-start hidden text-[#2A3242] text-sm duration-300">
              <p className="font-serif">Sign In</p>
              <p className="text-xs font-serif">Create Account</p>
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="flex flex-col justify-between space-y-10 px-0"
      >
        <SheetHeader>
          <SheetTitle className="text-[#2A3242] tracking-wider font-extralight border-b border-gray-300 px-5 pt-10 pb-8 text-4xl font-serif space-y-8">
            <h1>Your Account</h1>
            {user && (
              <div>
                <p className="text-[#2A3242] tracking-widest font-light uppercase text-lg">
                  Mr.
                  {user?.user_metadata?.firstname +
                    " " +
                    user?.user_metadata?.lastname}
                </p>
                <p className="text-[10px] font-sans font-normal tracking-wider uppercase -mt-3 text-gray-600">
                  Your membership status: Classic
                </p>
              </div>
            )}
          </SheetTitle>
          {user ? (
            <section className="grid grid-cols-1 space-y-12 px-8">
              <div className="grid space-y-10">
                <h2 className="font-medium text-sm text-black uppercase tracking-widest">
                  Your Account
                </h2>
                <ThemedLink src="/user/profile" title="Profile" />
              </div>
              <div className="grid space-y-8 border-t-[1px] border-gray-300 pt-12">
                <ThemedLink src="/user/booking" title="Bookings" />
                <ThemedLink src="/club" title="Coastal Charm Club" />
              </div>
            </section>
          ) : (
            <>
              {/* Auth selection */}
              <section className="grid grid-cols-2 px-8">
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

        <SheetFooter className="px-8">
          {user && (
            <Button
              type="button"
              className="w-full uppercase tracking-widest text-xs"
              onClick={signOut}
            >
              Sign out
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export const ThemedLink = ({ src, title }: { src: string; title: string }) => {
  return (
    <Link
      href={src}
      className="flex justify-between items-center tracking-widest text-xs text-gray-600 uppercase hover:text-black hover:underline underline-offset-2 duration-300"
    >
      <p>{title}</p>
      <ChevronRight size={20} />
    </Link>
  );
};
