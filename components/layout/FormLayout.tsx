import React, { ReactNode } from "react";

import MainNavBar from "../nav/main/MainNavBar";
import { User } from "@supabase/supabase-js";

const FormLayout = ({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) => {
  return (
    <>
      <MainNavBar user={user} />
      {children}
    </>
  );
};

export default FormLayout;
