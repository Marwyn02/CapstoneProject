import React, { useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { User } from "@supabase/supabase-js";

import useStore from "@/store/store";
import { Button } from "@/components/ui/button";

type roomInfoProps = {
  title: string;
  price: number;
};

type searchParamsProps = {
  checkIn: string;
  checkOut: string;
  adults: string;
  childrens: string;
  nights: string;
};

const HotelCard = ({
  user,
  info,
  onOpenDetails,
}: {
  user: User;
  info: roomInfoProps;
  openDetails: any;
  onOpenDetails: any;
}) => {
  const { setRoom, setRoomPrice } = useStore();

  function choicedRoom(roomName: string, roomPrice: number) {
    try {
      const { checkIn, checkOut, adults, childrens, nights } =
        Router.query as searchParamsProps;
      setRoom(roomName);
      setRoomPrice(roomPrice);

      Router.push({
        pathname: "/hotel/enhancements",
        query: {
          checkIn,
          checkOut,
          adults,
          childrens,
          nights,
          rm: roomName,
          rmPrice: roomPrice,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    try {
    } catch (error) {}
  }, []);
  return (
    <>
      <section className="flex flex-col col-span-4 md:h-auto px-5 py-4 md:py-2 md:px-0">
        <div className="flex justify-between items-center border-b border-black pb-5">
          <h3 className="text-lg md:text-2xl font-semibold text-gray-700 mb-2 md:mb-0">
            {info.title}
          </h3>

          <p className="text-xl font-semibold md:text-xl md:font-medium text-gray-800">
            PHP {info.price}{" "}
            <span className="text-xs font-thin font-serif text-gray-600 italic">
              / night
            </span>
          </p>
        </div>

        <div className="md:border-0 md:border-gray-400 py-4 mt-2 md:pt-5 md:pb-2 md:mt-0">
          <p className="mb-3 font-bold underline md:font-medium text-xs text-gray-900 uppercase">
            Highlighted Inclusions
          </p>
          <div className="indent-4 text-sm font-light text-gray-600">
            <p>Free Wi-Fi</p>
            <p>Daily Housekeeping</p>
            <p>Access to Pool</p>
            <p>Welcome Drink</p>
          </div>
        </div>

        <div>
          <button
            className="text-xs font-thin underline"
            onClick={onOpenDetails}
          >
            Details and Conditions
          </button>
        </div>

        {user ? (
          <div className="text-sm bg-yellow-50 rounded-md p-4 md:mt-2 md:px-5 md:py-5">
            <p>Membership promo</p>
            <div className="indent-4 text-sm font-light text-gray-600">
              <p>40% Discount on the first day</p>
              <p>Free breakfast for two each day</p>
              <p>Welcome amenities</p>
            </div>
          </div>
        ) : (
          <div className="text-sm bg-gray-200 rounded-md p-4 md:mt-8 md:px-5 md:py-8">
            <p className="text-gray-600 font-light">
              Exclusive benefits —{" "}
              <span className="text-sm font-normal">
                sign in to your account to activate it.
              </span>
            </p>
          </div>
        )}

        {!user && (
          <p className="mt-2 text-xs md:mt-5 md:mb-3 md:text-sm font-light text-gray-600">
            Have an account? <Link href={"/register"}>Sign in</Link> or{" "}
            <Link href={"/register"}>Create your account</Link>
          </p>
        )}

        <div className="grid grid-cols-7 items-end">
          <div className="col-span-2">
            <p
              className="text-center font-semibold md:text-sm h-10 px-4 py-2 md:font-medium      whitespace-nowrap    border border-slate-800 bg-slate-800 text-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50
"
            >
              PHP {info.price}
              <span className="text-xs font-thin font-serif text-gray-400 italic">
                / night
              </span>
            </p>
          </div>
          <Button
            type="button"
            variant={"outline"}
            className="col-span-5 mt-5 border-slate-800"
            onClick={() => choicedRoom(info.title, info.price)}
          >
            Choose
          </Button>
        </div>
      </section>
    </>
  );
};

export default HotelCard;
