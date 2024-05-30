import React from "react";

type Date = {
  date: {
    to: string;
    from: string;
  };
  checkIn?: string | undefined;
  checkOut?: string | undefined;
};

type Night = {
  date: {
    // From state
    to: string;
    from: string;
  };
  nightStay: number; // From state
  night: string | null; // From Url
};

export const CheckInDate = ({ date, checkIn }: Date) => {
  return (
    <div>
      <p className="font-medium text-sm text-gray-800">Check in:</p>
      <p className="text-sm text-gray-500">
        {date.from !== undefined && date.from !== ""
          ? new Date(date.from).toDateString()
          : checkIn
          ? new Date(checkIn).toDateString()
          : null}
      </p>
    </div>
  );
};

export const CheckOutDate = ({ date, checkOut }: Date) => {
  return (
    <div>
      <p className="font-medium text-sm text-gray-800">Check out:</p>
      <p className="text-sm text-gray-500">
        {date.to !== undefined && date.to !== ""
          ? new Date(date.to).toDateString()
          : checkOut
          ? new Date(checkOut).toDateString()
          : null}
      </p>
    </div>
  );
};

export const NightStayCount = ({ date, nightStay, night }: Night) => {
  return (
    <div>
      <p className="font-medium text-sm text-gray-800">Length of stay:</p>
      <p className="text-sm text-gray-500">
        {date.from && date.to && nightStay > 1
          ? `${nightStay} nights`
          : nightStay <= 1
          ? `${nightStay} night`
          : Number(night) > 1
          ? `${night} nights`
          : `${night} night`}
      </p>
    </div>
  );
};
