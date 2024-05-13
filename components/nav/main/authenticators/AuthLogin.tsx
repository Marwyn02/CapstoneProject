import React, { useState } from "react";
import Router from "next/router";
import Link from "next/link";

import { createClient } from "@/utils/supabase/component";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ErrorMessage from "@/components/ui/error";

const logInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Your password must be at least 8 characters." }),
});

const AuthLogin = ({ toggleSheet }: { toggleSheet: () => void }) => {
  const supabase = createClient();
  const { register } = useForm();

  // Utility states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function logIn(email: string, password: string) {
    setIsLoading(true);
    setError(false);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error.message);
      setError(true);
      setErrorMessage(
        "Invalid login credentials. Either your email or password is incorrect."
      );
    } else {
      toggleSheet();
      Router.push("/");
    }
    setIsLoading(false);
  }

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }: z.infer<typeof logInSchema>) {
    if (email && password) {
      await logIn(email, password);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-row space-y-6 text-lg text-start px-5 text-slate-500 dark:text-slate-400"
      >
        <ErrorMessage
          className="text-xs text-black font-semibold border border-black px-4 py-2.5"
          trigger={error}
          message={errorMessage}
        />

        {/* Login email input field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email address"
                  disabled={isLoading}
                  {...register("email", { required: true })}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Login password input field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  disabled={isLoading}
                  {...register("password", { required: true })}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forget your password, but this thing is not working! */}
        <Link
          href={"/"}
          className={"text-xs font-light text-gray-500 italic hover:underline"}
          aria-disabled={isLoading}
        >
          Forgot your password
        </Link>
        {/* Email and Password login */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          Log in
        </Button>
      </form>
    </Form>
  );
};

export default AuthLogin;
