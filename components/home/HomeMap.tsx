import React, { useEffect, useRef } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import type { User } from "@supabase/supabase-js";

import "mapbox-gl/dist/mapbox-gl.css";

type UserProps = {
  user: User;
};

const HomeMap: React.FC<UserProps> = ({ user }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  const mapStyle = `lg:mx-52 lg:mt-14 pb-14 lg:pb-5 space-y-6 ${
    !user ? "mb-[560px] lg:mb-[580px]" : "mb-[400px] lg:mb-[400px]"
  } `;

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    }
    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [121.00981762138599, 14.30020637359102],
      zoom: 12,
    });

    new mapboxgl.Marker({ color: "black" })
      .setLngLat([121.00981762138599, 14.30020637359102])
      .addTo(mapRef.current);

    return () => mapRef.current!.remove();
  }, []);

  return (
    <div className={mapStyle}>
      <div className="space-y-5 grid place-content-end p-2 px-5">
        <h2 className="font-semibold text-end font-serif text-3xl md:text-3xl mb-4 md:mb-3.5 text-gray-500">
          Discover Your <span className="text-black">Staycation Haven</span>
        </h2>
        <hr className="border[1px] border-zinc-200 w-10 md:w-14 -mr-5 md:-mr-6 my-8 md:my-10 rotate-90 grid place-self-end" />
      </div>
      <div
        id="map"
        ref={mapContainerRef}
        className="w-full h-[250px] lg:h-[500px]"
      ></div>
    </div>
  );
};

export default HomeMap;
