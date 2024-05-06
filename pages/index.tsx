import React from "react";
import type { User } from "@supabase/supabase-js";

import MainLayout from "@/components/layout/MainLayout";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";

export default function Home({ user }: { user: User }) {
  return (
    <main>
      <Head>
        <title>Coastal Charm</title>
      </Head>
      <MainLayout user={user} />
    </main>
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

// bg-[#C9D7DD]
