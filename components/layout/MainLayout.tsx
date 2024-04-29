import React from "react";
import MainNavBar from "../nav/MainNavBar";

import HomeReserveAvailabilityForm from "@/components/home/HomeReserveAvailabilityForm";
import HomeLandingPage from "@/components/home/HomeLandingPage";
import HomeMap from "@/components/home/HomeMap";
import FooterNav from "@/components/nav/footer/FooterNav";
import HomePromotion from "@/components/home/HomePromotion";
import HomeIntro from "../home/HomeIntro";
import HomeRooms from "../home/HomeRooms";

const MainLayout = () => {
  return (
    <section className="relative bg-white scroll-smooth">
      <MainNavBar className="fixed z-10 text-[#9da6b7]" />
      <HomeLandingPage />

      <div className="h-auto w-full relative">
        <HomeReserveAvailabilityForm />
      </div>

      <HomeIntro />
      <HomeRooms />
      <HomeMap />
      <HomePromotion />
      <FooterNav />
    </section>
  );
};

export default MainLayout;
