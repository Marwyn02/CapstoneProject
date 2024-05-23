import EnhancementPage from "@/components/form/enhances/EnhancementPage";
import FormLayout from "@/components/layout/FormLayout";
import { createClient } from "@/utils/supabase/server-props";
import type { User } from "@supabase/supabase-js";
import { GetServerSidePropsContext } from "next";
import React from "react";

const index = ({ user }: { user: User }) => {
  return (
    <FormLayout user={user}>
      <EnhancementPage />
    </FormLayout>
  );
};

export default index;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createClient(context);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    props: {
      user,
    },
  };
};
