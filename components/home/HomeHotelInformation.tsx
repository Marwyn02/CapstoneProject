import React from "react";

const data = [
  {
    id: 1,
    title: "Address",
    address: "Just a random address in the Philippines.",
  },
  {
    id: 2,
    title: "Check-in / Check-out",
    description: "2 pm",
    subDescription: "11 am",
  },
  {
    id: 3,
    title: "Rooms",
    description: "Just a random room number in the Philippines.",
  },
  {
    id: 4,
    title: "Available services",
    services: [
      {
        id: 1,
        service: "Laundry service",
      },
    ],
  },
  {
    id: 5,
    title: "Internet",
    description: "Free",
  },
  {
    id: 6,
    title: "Transportation",
    description: "Subject to supplement",
  },
  {
    id: 8,
    title: "Smoking policy",
    description: "No smoking",
  },
  {
    id: 9,
    title: "Children policy",
    description: "Children are welcome",
  },
  {
    id: 10,
    title: "Pets",
    description: "Pets are allowed",
  },
];

const HomeHotelInformation = () => {
  return (
    <div className="h-full flex-nowrap md:px-64">
      <section className="flex flex-col">
        <div className="px-5 md:px-10 py-20 space-y-5 md:space-y-10 grid">
          <h3 className="text-3xl font-serif font-thin text-gray-800">
            Hotel Information
          </h3>

          <div className="grid md:grid-cols-3 md:gap-y-4 md:gap-x-10">
            {data.map((d) => (
              <div key={d.id}>
                <div className="py-3.5 md:py-8 md:border-b space-y-0.5 md:space-y-1">
                  <p className="text-xl md:text-lg font-serif font-thin text-gray-600">
                    {d.title}
                  </p>
                  {d.subDescription ? (
                    <div className="text-sm text-gray-800 space-y-1">
                      <p className="font-medium">
                        Check in:
                        <span className="ml-1 font-thin">{d.description}</span>
                      </p>
                      <p className="font-medium">
                        Check out:
                        <span className="ml-1 font-thin">
                          {d.subDescription}
                        </span>
                      </p>
                    </div>
                  ) : d.address ? (
                    <p className="text-sm text-gray-800 font-thin underline">
                      {d.address}
                    </p>
                  ) : d.services ? (
                    d.services.map((s) => (
                      <p className="text-sm text-gray-800 font-thin" key={s.id}>
                        {s.service}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-800 font-thin">
                      {d.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeHotelInformation;
