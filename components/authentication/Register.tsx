import React from "react";
import Link from "next/link";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import FormLayout from "../layout/FormLayout";

const Register = () => {
  return (
    <FormLayout>
      <div className="grid grid-cols-3">
        <section className="w-full h-screen col-span-2 bg-red-300"></section>
        <section className="pt-48 px-10 space-y-6 col-span-1">
          <h1 className="mb-10 text-3xl font-bold">Register</h1>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email address" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>

          <div className="grid grid-cols-2 w-full max-w-sm items-center gap-1.5">
            <Input type="name" id="name" placeholder="First name" />

            <Input type="name" id="name" placeholder="Last name" />

            <Input type="name" id="name" placeholder="Email address" />

            <Input type="name" id="name" placeholder="Phone number" />
          </div>

          <Button type="button">Register</Button>

          <div>
            <Link href={"/login"} className={"text-sm font-light"}>
              or Login to your account
            </Link>
          </div>
        </section>
      </div>
    </FormLayout>
  );
};

export default Register;
