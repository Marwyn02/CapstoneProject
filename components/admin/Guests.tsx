import React from "react";

const Guests = ({ guests }: any) => {
  return (
    <section className="relative overflow-x-auto">
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
              Level
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest: any, i: number) => (
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
                {guest.firstname + " " + guest.lastname}
              </td>
              <td className="px-6 py-4">{guest.email}</td>
              <td className="px-6 py-4 text-[#808080]">Classic</td>
              <td className="px-6 py-4">
                {new Date(guest.created_at).toLocaleDateString()}
              </td>
              {/* <td className="px-6 py-4">Edit</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Guests;

// Classic
// Prestige
// Premier
// Royal
// Imperial
