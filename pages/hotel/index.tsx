import React from "react";

import { HotelChoiceForm } from "@/components/form/hotel/HotelChoiceForm";
import FormLayout from "@/components/layout/FormLayout";
import Image from "next/image";

const HotelForm = () => {
  return (
    <FormLayout>
      {/* <Image
        src={"/FormHeader.jpg"}
        alt="Image"
        height={800}
        width={800}
        className="w-full h-[400px]"
      /> */}
      <section className="flex justify-center w-full">
        <HotelChoiceForm />
      </section>
    </FormLayout>
  );
};

export default HotelForm;
