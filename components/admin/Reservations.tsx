import React from "react";
import type { Reservation } from "@/types/types";

import { DeleteConfirmationModal } from "../ui/modal";

const Reservations = ({ reservations }: { reservations: Reservation }) => {
  return (
    <section className="relative overflow-x-auto col-start-2 col-span-full space-y-4">
      <h2 className="uppercase font-semibold text-xs mt-5 mb-2">
        Reservations
      </h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Guest Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Check in
            </th>
            <th scope="col" className="px-6 py-3">
              Check out
            </th>
            <th scope="col" className="px-6 py-3">
              Room type
            </th>
            <th scope="col" className="px-6 py-3">
              Payment
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {reservations.length >= 1 ? (
            reservations.map((reservation: Reservation, i: number) => (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {/* {guest.firstname + " " + guest.lastname} */}
                  Marwyn Sumargo
                </td>
                <td className="px-6 py-4">jhunmarwynsumargo@yahoo.com</td>
                <td className="px-6 py-4 text-[#808080]">
                  {new Date(reservation.check_in).toDateString()}
                </td>
                <td className="px-6 py-4 text-[#808080]">
                  {new Date(reservation.check_out).toDateString()}
                </td>

                <td className="px-6 py-4 text-[#808080]">
                  {" "}
                  {new Date(reservation.created_at).toDateString()}
                  {" | "}
                  {new Date(reservation.created_at).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    }
                  )}
                </td>
                <td className="px-6 py-4">
                  <DeleteConfirmationModal
                    rowId={i}
                    id={reservation.id}
                    title="Reservation"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="py-5">No reservations</th>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Reservations;
