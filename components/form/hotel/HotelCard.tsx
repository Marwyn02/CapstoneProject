import React from "react";
import Link from "next/link";
import Router from "next/router";
import { User } from "@supabase/supabase-js";

import useStore from "@/store/store";
import { Button } from "@/components/ui/button";

type roomInfoProps = {
  title: string;
  price: number;
};

const HotelCard = ({ user, info }: { user: User; info: roomInfoProps }) => {
  const { setRoom, setRoomPrice } = useStore();

  function choicedRoom(roomName: string, roomPrice: number) {
    try {
      setRoom(roomName);
      setRoomPrice(roomPrice);

      Router.push("/hotel/reservation");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <section className="flex flex-col col-span-2 border md:h-auto px-5 py-4 md:p-10">
        <h3 className="text-lg md:text-2xl font-semibold text-gray-700 mb-2 md:mb-5">
          {info.title}
        </h3>

        <div>
          {/* <p className="text-xs font-thin font-serif text-gray-600 italic">
            Total for a night
          </p> */}
          <p className="text-xl font-semibold md:text-3xl md:font-medium text-gray-800">
            PHP {info.price}{" "}
            <span className="text-xs font-thin font-serif text-gray-600 italic">
              / night
            </span>
          </p>
        </div>

        <div className="md:border-y md:border-gray-400 py-4 mt-2 md:py-8 md:mt-8">
          <p className="mb-4 font-bold underline md:font-medium text-xs text-gray-900 uppercase">
            Included in this rate
          </p>
          <p className="indent-4 text-sm font-light text-gray-600">
            Breakfast for two each day
          </p>
        </div>

        {user ? (
          <div className="text-sm bg-gray-200 rounded-md p-4 md:mt-8 md:px-5 md:py-8">
            <p>Free yogurt hehe</p>
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

        <p className="mt-2 text-xs md:mt-5 md:mb-3 md:text-sm font-light text-gray-600">
          Have an account? <Link href={"/register"}>Sign in</Link> or{" "}
          <Link href={"/register"}>Create your account</Link>
        </p>

        <Button
          type="button"
          variant={"outline"}
          className="mt-5"
          onClick={() => choicedRoom(info.title, info.price)}
        >
          Choose
        </Button>
      </section>
    </>
  );
};

export default HotelCard;
