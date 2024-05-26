import Image from "next/image";
import React from "react";

type selectionProps = {
  onSelect: (choices: string) => void;
};

const Selection = ({ onSelect }: selectionProps) => {
  return (
    <>
      <div className="grid grid-cols-3 px-20 text-center gap-6">
        {data.map((d, i) => (
          <button
            key={i}
            className="h-[200px] w-full rounded-lg bg-gray-50 p-8 flex flex-col space-y-7 items-start cursor-pointer border border-transparent hover:border-black duration-300"
            onClick={() => onSelect(String(d.id))}
          >
            {d.icon && (
              <div className="">
                <Image src={d.icon} alt={d.title} height={30} width={30} />
              </div>
            )}

            <div className="text-start space-y-1">
              <p className="text-base text-zinc-600 font-serif">{d.title}</p>
              {d.description && (
                <p className="text-xs text-zinc-700 font-thin">
                  {d.description}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default Selection;

const data = [
  {
    id: 0,
    icon: "/icon/utensils.svg",
    title: "Whole Day Meal Package",
    description:
      "Savor a wide variety of delicious meals delivered directly to your room, and indulge in exclusive dining experiences, such as romantic dinners and celebratory meals tailored to your occasion.",
  },
  {
    id: 1,
    icon: "/icon/shirt.svg",
    title: "Laundry and Dry Cleaning Services",
    description:
      "Enjoy the convenience of same-day laundry and expert dry cleaning services to keep your clothes fresh and clean.",
  },
  {
    id: 2,
    icon: "/icon/plane.svg",
    title: "Airport and Local Transportation",
    description:
      "Experience seamless travel with our reliable airport pick-up/drop-off service, local shuttle options, and convenient car rentals for exploring the area.",
  },
  {
    id: 3,
    icon: "/icon/baby.svg",
    title: "Family and Child Services",
    description:
      "Enjoy some adult time while our professional babysitters care for your children. We also provide family-friendly amenities such as cribs, high chairs, and kids’ menus to ensure a comfortable stay for your family.",
  },
  {
    id: 4,
    icon: "/icon/cake.svg",
    title: "Special Occasion Package",
    description:
      "Make your special moments unforgettable with tailored celebration packages that include decorations, champagne, and personalized gifts, along with custom room decorations for birthdays, anniversaries, and more.",
  },
  {
    id: 5,
    icon: "/icon/bike.svg",
    title: "Fitness and Recreation",
    description:
      "Maintain your fitness routine with complimentary access to our state-of-the-art fitness center, and book sessions with certified personal trainers to tailor your workouts during your stay.",
  },
  {
    id: 6,
    icon: "/icon/paw-print.svg",
    title: "Pet Service",
    description:
      "Bring your furry friends along and enjoy our pet-friendly accommodations and amenities, including pet sitting and walking services to keep your pets happy and cared for.",
  },
];
