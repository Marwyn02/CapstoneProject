import React from "react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server-props";

import FormLayout from "@/components/layout/FormLayout";
import EnhancementPage from "@/components/form/enhances/EnhancementPage";

const index = ({ user }: { user: User }) => {
  return (
    <>
      <Head>
        <title>Coastal Charm - Enhancements</title>
      </Head>
      <FormLayout user={user}>
        <EnhancementPage />
      </FormLayout>
    </>
  );
};

export default index;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const supabase = createClient(context);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.error("Error in Enhancement Index: ", error);
  }
};
