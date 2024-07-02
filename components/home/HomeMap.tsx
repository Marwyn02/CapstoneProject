// import React, { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// import Image from "next/image";
// import { User } from "@supabase/supabase-js";

// if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
//   mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
// }

// const HomeMap = ({ user }: { user: User }) => {
//   const mapContainerRef = useRef<HTMLDivElement | null>(null);
//   const mapRef = useRef()
//   const [lng] = useState<number>(121.01);
//   const [lat] = useState<number>(14.3028);
//   const [zoom] = useState<number>(12.5);

//   const mapStyle = `grid grid-cols-1 place-items-center mt-14 md:mt-16 px-8 md:px-10 pb-5 space-y-6 ${
//     !user ? "mb-[560px] lg:mb-[580px]" : "mb-[400px] lg:mb-[400px]"
//   } `;

//   useEffect(() => {
//     if (mapContainerRef.current) {
//       new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: "mapbox://styles/mapbox/outdoors-v12",
//         center: [lng, lat],
//         zoom: zoom,
//       });

//       new mapboxgl.Marker()
//       .setLngLat([12.554729, 55.70651])
//       .addTo(mapRef.current);
//     }
//   }, [lat, lng, zoom]);

//   return (
//     <div className={mapStyle}>
//       <h2 className="font-thin font-serif text-3xl md:text-3xl mb-4 md:mb-3.5 border-b pb-5">
//         Where can we found?
//       </h2>
//       <div ref={mapContainerRef} className="w-[1000px] h-[500px]" />
//     </div>
//     // <div className={mapStyle}>
//     //   <h2 className="font-thin font-serif text-3xl md:text-3xl mb-4 md:mb-3.5 border-b pb-5">
//     //     Where can we found?
//     //   </h2>
//     //   <Image src={"/Test-Map.png"} alt="Map" height={1000} width={1000} />
//     // </div>
//   );
// };

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

  const mapStyle = `mx-52 mt-14 md:mt-16 pb-5 space-y-6 ${
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
      <div className="space-y-5 grid place-content-end p-2">
        <h2 className="font-thin text-end font-serif text-3xl md:text-3xl mb-4 md:mb-3.5 text-gray-500">
          Discover Your <span className="text-black">Staycation Haven</span>
        </h2>
        <hr className="border[1px] border-zinc-200 w-10 md:w-14 md:-mr-6 my-8 md:my-10 rotate-90 grid place-self-end" />
      </div>
      <div id="map" ref={mapContainerRef} className="w-full h-[500px]"></div>
    </div>
  );
};

export default HomeMap;
