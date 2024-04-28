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
    <main className="relative bg-white scroll-smooth">
      <HomeLandingPage />
      <div className="h-auto w-full relative">
        <HomeReserveAvailabilityForm />
      </div>
      <HomeIntro />

      <HomeRooms />

      <HomeMap />

      <HomePromotion />

      <FooterNav />
    </main>
  );
};

export default MainLayout;
