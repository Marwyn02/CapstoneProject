import React from "react";

import { Button } from "@/components/ui/button";
import Side from "../Side";

const Page = ({ user }: { user: any }) => {
  return (
    <section className="grid grid-cols-7 justify-center">
      <Side />
      <div className="pt-48 space-y-10 col-start-3 col-span-3">
        <h1 className="text-start text-3xl font-serif text-gray-600">
          Your Personal Information
        </h1>
        <div>
          <p className="font-semibold mb-1">Your name</p>
          <p className="bg-gray-50 px-4 py-1.5 rounded-md w-full">
            {user.firstname + " " + user.lastname}{" "}
          </p>
        </div>

        <hr className="border-gray-400" />

        <div>
          <p className="font-semibold mb-1">Email Address</p>
          <p className="bg-gray-50 px-4 py-1.5 rounded-md w-full">
            {user.email}
          </p>
        </div>

        <hr className="border-gray-400" />

        <div>
          <p className="text-sm font-medium mb-1">Delete my account</p>
          <Button variant={"destructive"} size={"sm"} className="rounded-md">
            Delete Account
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Page;
