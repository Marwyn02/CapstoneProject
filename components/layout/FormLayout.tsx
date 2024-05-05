import React from "react";
import FormNavBar from "../nav/main/FormNavBar";

const FormLayout = ({ children }: any) => {
  return (
    <section>
      <FormNavBar />
      {children}
    </section>
  );
};

export default FormLayout;
