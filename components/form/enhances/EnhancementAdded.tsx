import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type searchParamProps = {
  laundryChoice: string;
  laundryPrice: string;
  transportChoice: string;
  transportation: string;
  transportService: string;
  transportPrice: string;
};

const EnhancementAdded = () => {
  const router = useRouter();
  const [selectedAddsOns, setSelectedAddsOn] = useState<any>([]);

  const onSubmit = () => {
    router.push({
      pathname: "/hotel/enhancements/reservation",
      query: {
        ...router.query,
      },
    });
  };

  useEffect(() => {
    const {
      laundryChoice,
      laundryPrice,
      transportChoice,
      transportation,
      transportService,
      transportPrice,
    } = router.query as searchParamProps;
    const newAddsOn = [];

    if (laundryChoice && laundryPrice) {
      newAddsOn.push({
        type: "Laundry and Dry Cleaning",
        title: laundryChoice,
        price: laundryPrice,
      });
    }

    if (
      transportChoice &&
      transportation &&
      transportService &&
      transportPrice
    ) {
      newAddsOn.push({
        type: "Airport and Local Transportation",
        title: transportChoice,
        price: transportPrice,
      });
    }

    setSelectedAddsOn(newAddsOn);
  }, [router.query]);
  return (
    <div className="px-20 mb-3">
      <div className="grid grid-cols-4 gap-x-2 mb-5">
        {selectedAddsOns.map((adds: any) => (
          <div
            key={adds.type}
            className="text-xs border border-black rounded-md px-4 py-2 text-gray-500 cursor-pointer hover:bg-gray-100 hover:border-transparent duration-300"
          >
            <p className="text-sm mb-2 font-serif">{adds.type}</p>
            <p>{adds.title}</p>
            <p className="text-gray-800 font-semibold">Total: ₱{adds.price}</p>
          </div>
        ))}
      </div>
      <div>
        {selectedAddsOns.length >= 1 && (
          <Button variant={"outline"} onClick={onSubmit}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default EnhancementAdded;
