import React from "react";
import { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import { User } from "@supabase/supabase-js";

import { UserNavbar } from "@/components/nav/user/UserNavbar";
import Page from "@/components/user/account/Page";

export default function Profile({ user, data }: { user: User; data: any }) {
  return (
    <>
      <UserNavbar user={user} />
      <Page user={data} />
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createClient(context);

  const { data: user } = await supabase.auth.getUser();

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: userData } = await supabase
    .from("guests")
    .select("*")
    .eq("user_id", user?.user?.id)
    .single();

  return {
    props: {
      user: user.user ?? null,
      data: userData,
    },
  };
};
