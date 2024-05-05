import { useRouter } from "next/router";
import { useState } from "react";

import { createClient } from "@/utils/supabase/component";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FormLayout from "../layout/FormLayout";
import { Button } from "../ui/button";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function logIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
    }
    router.push("/");
  }

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error);
    }
    router.push("/");
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
    }
  }
  return (
    <main>
      <FormLayout>
        <div className="grid grid-cols-3">
          <section className="pt-48 px-10 space-y-6 col-span-1">
            <h1 className="mb-10 text-3xl font-bold">Register</h1>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="youremail@yahoo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input type="name" id="name" placeholder="Your name" />
            </div>

            <Button type="button" onClick={logIn}>
              Log in
            </Button>
            <Button type="button" onClick={signUp}>
              Sign up
            </Button>

            <div>
              <Button type="button" onClick={signInWithGoogle}>
                Log in with Google
              </Button>
            </div>
          </section>
          <section className="w-full h-screen col-span-2 bg-red-300"></section>
        </div>
      </FormLayout>
    </main>
  );
}
