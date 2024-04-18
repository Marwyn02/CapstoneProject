import React from "react";

import HomeReserveAvailabilityForm from "@/components/home/HomeReserveAvailabilityForm";
import HomeLandingPage from "@/components/home/HomeLandingPage";
import HomeMap from "@/components/home/HomeMap";
import FooterNav from "@/components/nav/footer/FooterNav";

export default function Home() {
  return (
    <main className="relative bg-white">
      <HomeLandingPage />
      <div className="h-auto w-full relative">
        <HomeReserveAvailabilityForm />
        <HomeMap />
      </div>
      <FooterNav />
    </main>
  );
}

// bg-[#C9D7DD]
