import React, { useState } from "react";
import Router from "next/router";

import { createClient } from "@/utils/supabase/component";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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

const signUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Your password must be at least 8 characters." }),
  firstname: z.string(),
  lastname: z.string(),
});

const AuthSignUp = ({ toggleSheet }: { toggleSheet: () => void }) => {
  const supabase = createClient();
  const { register } = useForm();

  // Utility states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function signUp(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) {
    setIsLoading(true);
    setError(false);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { firstname, lastname } },
    });
    if (error) {
      console.error(error);
      setError(true);
      setErrorMessage("Invalid or incomplete credentials.");
    } else {
      toggleSheet();
      Router.push("/");
    }
    setIsLoading(false);
  }

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
  });

  async function onSubmit({
    email,
    password,
    firstname,
    lastname,
  }: z.infer<typeof signUpSchema>) {
    if (email && password && firstname && lastname) {
      await signUp(email, password, firstname, lastname);
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

        {/* Personal information input field */}
        <section className="grid grid-cols-2 gap-x-2">
          {/* First name input field */}
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="First name"
                    disabled={isLoading}
                    {...register("firstname", { required: true })}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last name input field */}
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Last name"
                    disabled={isLoading}
                    {...register("lastname", { required: true })}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

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

        {/* Terms and condition field */}
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" disabled={isLoading} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>

        {/* Email and Password login */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          Register
        </Button>
      </form>
    </Form>
  );
};

export default AuthSignUp;
