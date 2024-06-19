import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";

const BillingInfo = () => {
  const { register } = useFormContext();
  return (
    <section>
      <h2 className="text-xl font-thin font-serif my-2">
        Finalise your booking with
      </h2>
      <div className="grid grid-cols-1 space-y-4 border p-4 rounded-lg">
        <div className="flex justify-between items-center font-bold">
          <p>Credit / Debit Card</p>
          <Image
            src={"/icon/mastercard.svg"}
            alt="Image"
            height={100}
            width={100}
            className="h-6 w-6"
          />
        </div>

        <FormInput
          label="Cardholder Name"
          type="text"
          placeholder="Enter cardholder full name"
          registerName="cardHolderName"
        />

        <FormInput
          label="Credit card number"
          type="text"
          placeholder="e.g. 4444 2222 4444 2222"
          registerName="cardNumber"
        />

        <div className="grid grid-cols-2 gap-x-2">
          <FormInput
            label="Expiration date"
            type="text"
            placeholder="e.g. 12/22"
            registerName="expirationDate"
          />
          <FormInput
            label="Security code"
            type="type"
            placeholder="e.g. 678"
            registerName="cardSecurityCode"
          />
        </div>
      </div>
    </section>
  );
};

export default BillingInfo;

export const FormInput = ({ label, type, placeholder, registerName }: any) => {
  const { register } = useFormContext();
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        className="border border-gray-200 rounded-md px-3 py-2.5 placeholder:text-sm text-sm"
        {...register(registerName)}
      />
    </div>
  );
};
