import React, { useRef } from "react";
import type { User } from "@supabase/supabase-js";
import MainNavBar from "../nav/main/MainNavBar";

import HomeReservation from "@/components/home/HomeReservation";
import HomeLandingPage from "@/components/home/HomeLandingPage";
import HomeMap from "@/components/home/HomeMap";
import HomeIntro from "../home/HomeIntro";
import HomeRooms from "../home/HomeRooms";
import HomeHotelInformation from "../home/HomeHotelInformation";
import HomeHistory from "../home/HomeHistory";
import FooterNav from "@/components/nav/footer/FooterNav";

const MainLayout = ({ user }: { user: User }) => {
  const mainNavBarRef = useRef<{ toggleFromFooter: () => void }>(null);

  const handleFooterToggle = () => {
    if (mainNavBarRef.current) {
      mainNavBarRef.current.toggleFromFooter();
    }
  };
  return (
    <section className="relative bg-white scroll-smooth">
      <MainNavBar user={user} ref={mainNavBarRef} />
      <HomeLandingPage />
      <HomeReservation />
      <HomeIntro />
      <HomeRooms />
      <HomeHotelInformation />
      <HomeHistory />
      <HomeMap user={user} />
      <FooterNav toggleSheet={handleFooterToggle} user={user} />
    </section>
  );
};

export default MainLayout;
