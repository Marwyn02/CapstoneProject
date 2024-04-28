import React from "react";
import { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormLayout from "@/components/layout/FormLayout";

export default function RegisterPage() {
  return (
    <main>
      <FormLayout>
        <div className="grid grid-cols-3">
          <section className="pt-48 px-10 space-y-6 col-span-1">
            <h1 className="mb-10 text-3xl font-bold">Register</h1>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email address" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input type="name" id="name" placeholder="Your name" />
            </div>

            <Button type="button">Register</Button>
          </section>
          <section className="w-full h-screen col-span-2 bg-red-300"></section>
        </div>
      </FormLayout>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const { data } = await supabase.auth.getUser();

  // if user IS authenticated
  if (data.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // if NOT then proceed to login page
  return {
    props: {
      data: null,
    },
  };
}
