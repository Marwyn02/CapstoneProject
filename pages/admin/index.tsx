import AdminPage from "@/components/admin/AdminPage";
import { createClient } from "@/utils/supabase/server-props";
import type { User } from "@supabase/supabase-js";
import { GetServerSidePropsContext } from "next";
import React from "react";

const Admin = ({ guests, reservation, user }: any) => {
  return <AdminPage guests={guests} reservations={reservation} admin={user} />;
};

export default Admin;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createClient(context);
  const { data: user } = await supabase.auth.getUser();

  if (user.user?.app_metadata.role !== "super-admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: guests, error } = await supabase.from("guests").select("*");
  const { data: reservation } = await supabase.from("reservation").select("*");

  return {
    props: {
      guests,
      reservation,
      user,
    },
  };
};
