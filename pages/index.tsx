import React from "react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

import { createClient } from "@/utils/supabase/server-props";
import type { User } from "@supabase/supabase-js";

import MainLayout from "@/components/layout/MainLayout";

export default function Home({ user }: { user: User }) {
  return (
    <>
      <Head>
        <title>Coastal Charm</title>
      </Head>
      <MainLayout user={user} />
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createClient(context);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    props: {
      user: user,
    },
  };
};
