import Image from "next/image";
import React from "react";
import SelectionCard from "./SelectionCard";

type selectionProps = {
  onSelect: (choices: string) => void;
};

const Selection = ({ onSelect }: selectionProps) => {
  const services = data.filter((d) => d.category === "service");
  const activities = data.filter((d) => d.category === "activity");
  const relaxation = data.filter((d) => d.category === "relaxation");

  return (
    <>
      <SelectionCard data={services} onSelect={onSelect} />
      <section className="my-5">
        <h2 className="mx-20 py-2 border-b text-base uppercase font-extralight font-serif text-gray-500 tracking-widest">
          Leisure Activities
        </h2>

        <div className="my-5">
          <h2 className="mx-20 py-2 text-base uppercase font-extralight font-serif text-gray-500 tracking-widest">
            Water-Based Activities
          </h2>
          <SelectionCard data={activities} onSelect={onSelect} />
        </div>

        <div className="my-5">
          <h2 className="mx-20 py-2 text-base uppercase font-extralight font-serif text-gray-500 tracking-widest">
            Relaxation and Wellness{" "}
          </h2>
          <SelectionCard data={relaxation} onSelect={onSelect} />
        </div>
      </section>
    </>
  );
};

export default Selection;

const data = [
  {
    id: 0,
    icon: "/icon/utensils.svg",
    title: "Whole Day Meal Package",
    category: "service",
    description:
      "Savor a wide variety of delicious meals delivered directly to your room, and indulge in exclusive dining experiences, such as romantic dinners and celebratory meals tailored to your occasion.",
  },
  {
    id: 1,
    icon: "/icon/shirt.svg",
    title: "Laundry and Dry Cleaning Services",
    category: "service",

    description:
      "Enjoy the convenience of same-day laundry and expert dry cleaning services to keep your clothes fresh and clean.",
  },
  {
    id: 2,
    icon: "/icon/plane.svg",
    title: "Airport and Local Transportation",
    category: "service",

    description:
      "Experience seamless travel with our reliable airport pick-up/drop-off service, local shuttle options, and convenient car rentals for exploring the area.",
  },
  {
    id: 3,
    icon: "/icon/baby.svg",
    title: "Family and Child Services",
    category: "service",

    description:
      "Enjoy some adult time while our professional babysitters care for your children. We also provide family-friendly amenities such as cribs, high chairs, and kids’ menus to ensure a comfortable stay for your family.",
  },
  {
    id: 4,
    icon: "/icon/cake.svg",
    title: "Special Occasion Package",
    category: "service",

    description:
      "Make your special moments unforgettable with tailored celebration packages that include decorations, champagne, and personalized gifts, along with custom room decorations for birthdays, anniversaries, and more.",
  },
  {
    id: 5,
    icon: "/icon/bike.svg",
    title: "Fitness and Recreation",
    category: "service",

    description:
      "Maintain your fitness routine with complimentary access to our state-of-the-art fitness center, and book sessions with certified personal trainers to tailor your workouts during your stay.",
  },
  {
    id: 6,
    icon: "/icon/paw-print.svg",
    title: "Pet Service",
    category: "service",

    description:
      "Bring your furry friends along and enjoy our pet-friendly accommodations and amenities, including pet sitting and walking services to keep your pets happy and cared for.",
  },
  {
    id: 7,
    icon: "",
    title: "Surfing",
    category: "activity",
    description: "Ride the waves; a popular activity in many coastal regions.",
  },
  {
    id: 8,
    icon: "",
    title: "Snorkeling and Scuba Diving",
    category: "activity",
    description:
      "Explore underwater life, coral reefs, and marine biodiversity.",
  },
  {
    id: 9,
    icon: "",
    title: "Kayaking and Canoeing",
    category: "activity",
    description:
      "Paddle through calm waters, exploring the coastline and nearby inlets.",
  },
  {
    id: 10,
    icon: "",
    title: "Jet Skiing",
    category: "activity",
    description: "Experience the thrill of speeding across the water.",
  },
  {
    id: 11,
    icon: "",
    title: "Parasailing",
    category: "activity",
    description:
      "Get an aerial view of the coastline while being towed behind a boat.",
  },
  {
    id: 12,
    icon: "",
    title: "Yoga and Meditation",
    category: "relaxation",
    description: "Practice mindfulness and relaxation by the sea.",
  },
  {
    id: 13,
    icon: "",
    title: "Spa Treatments",
    category: "relaxation",
    description:
      "Enjoy a massage or other wellness treatments at a coastal resort or spa.",
  },
];
