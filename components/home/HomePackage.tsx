/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Check, Crown } from "lucide-react";
import { Button } from "../ui/button";

const HomePackage = () => {
  return (
    <div className="lg:mx-52 px-5 md:px-0 my-16 lg:my-32 space-y-10">
      <div className="space-y-1">
        <h2 className="text-3xl font-semibold font-serif text-gray-500">
          Staycation <span className="text-black">Specials</span>
        </h2>
        <p className="text-gray-500 font-serif">
          Embrace the Coastal Charm with Our Exclusive Packages.
        </p>
      </div>
      <section className="grid grid-cols-2 gap-x-4">
        {data.map((d, index) => (
          <div key={index} className="border rounded-lg p-5">
            {index === 0 ? (
              <div className="flex space-x-2">
                <Crown className="w-4 text-yellow-500" />
                <h2 className="text-lg font-bold font-serif">{d.title}</h2>
              </div>
            ) : (
              <h2 className="text-lg font-bold font-serif">{d.title}</h2>
            )}
            <p className="text-gray-500 font-serif">{d.subtitle}</p>
            <div className="my-2.5 indent-4">
              {d.includes.map((i, index) => (
                <div key={index} className="flex">
                  <Check className="w-4" />
                  <p className="font-extralight">{i}</p>
                </div>
              ))}
            </div>
            <Button type="button" className="mt-2 text-xs">
              I want this!
            </Button>
          </div>
        ))}
      </section>
      <div className="flex justify-center">
        <Button variant={"link"}>See more</Button>
      </div>
    </div>
  );
};

export default HomePackage;

const data = [
  {
    id: 1,
    title: "Beachside Bliss Retreat",
    subtitle: "Rejuvenate with the calming sounds of the waves",
    includes: [
      "Two-night stay in an ocean-view room",
      "Daily beachside breakfast",
      "60-minute beach massage",
      "Access to beachfront yoga sessions",
      "Sunset cocktail hour",
    ],
  },
  {
    id: 2,
    title: "Family Coastal Adventure",
    subtitle: "Create unforgettable memories with the whole family",
    includes: [
      "Accommodation in a family suite",
      "Daily breakfast for the family",
      "Tickets to a nearby marine park",
      "Kids' beach activities (sandcastle building, treasure hunt)",
      "Complimentary dinner for children",
    ],
  },
];
