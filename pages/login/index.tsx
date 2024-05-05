import React from "react";
import { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";

import Login from "@/components/authentication/Login";

export default function login() {
  return <Login />;
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
