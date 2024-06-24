import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { User } from "@supabase/supabase-js";

type userType = {
  user: User;
};

const UserDetails = ({ user }: userType) => {
  const { register, setValue, getValues } = useFormContext();

  return (
    <section className="pb-5 border-b">
      <h2 className="font-thin text-2xl font-serif mb-2">Guest Information</h2>

      {!user ? (
        <div className="grid grid-cols-1 space-y-4 border-b border-gray-600 pt-2 pb-8">
          <h4 className="font-thin text-sm font-serif underline">
            Contact Info
          </h4>
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              type="text"
              placeholder="First name"
              className="border border-gray-200 rounded-md px-3 py-2.5 placeholder:text-sm text-sm"
              {...register("firstname", { required: true })}
            />{" "}
            <Input
              type="text"
              placeholder="Last name"
              className="border border-gray-200 rounded-md px-3 py-2.5 placeholder:text-sm text-sm"
              {...register("lastname")}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              type="text"
              placeholder="Email address"
              className="border border-gray-200 rounded-md px-3 py-2.5 placeholder:text-sm text-sm"
              {...register("email")}
            />
            <Input
              type="text"
              placeholder="Phone number"
              className="border border-gray-200 rounded-md px-3 py-2.5 placeholder:text-sm text-sm"
              {...register("phoneNumber")}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <input
              type="hidden"
              {...register("honorifics")}
              value={getValues("honorifics")}
            />
            <Select
              onValueChange={(value) => {
                setValue("honorifics", value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Honorifics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mr">Mr</SelectItem>
                <SelectItem value="Ms">Ms</SelectItem>
                <SelectItem value="Mrs">Mrs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : (
        <>
          <p className="text-[#2A3242] tracking-widest font-light uppercase text-lg font-serif">
            Mr.
            {user?.user_metadata?.firstname +
              " " +
              user?.user_metadata?.lastname}
          </p>
        </>
      )}
    </section>
  );
};

export default UserDetails;
