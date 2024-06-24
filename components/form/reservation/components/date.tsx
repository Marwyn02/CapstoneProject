import React from "react";
import { Calendar, MoonStar } from "lucide-react";

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
    <div className="flex items-center">
      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
      <div>
        <p className="font-medium text-xs text-gray-500">Check-in</p>
        <p className="text-sm text-gray-700 font-medium">
          {date.from !== undefined && date.from !== ""
            ? new Date(date.from).toDateString()
            : checkIn
            ? new Date(checkIn).toDateString()
            : null}
        </p>
      </div>
    </div>
  );
};

export const CheckOutDate = ({ date, checkOut }: Date) => {
  return (
    <div className="flex items-center">
      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
      <div>
        <p className="font-medium text-xs text-gray-500">Check-out</p>
        <p className="text-sm text-gray-700 font-medium">
          {date.to !== undefined && date.to !== ""
            ? new Date(date.to).toDateString()
            : checkOut
            ? new Date(checkOut).toDateString()
            : null}
        </p>
      </div>
    </div>
  );
};

export const NightStayCount = ({ date, nightStay, night }: Night) => {
  return (
    <div className="flex items-center">
      <MoonStar className="h-4 w-4 text-gray-500 mr-2" />
      <div>
        <p className="font-medium text-xs text-gray-500">Length of stay</p>
        <p className="text-sm text-gray-700 font-medium">
          {date.from && date.to && nightStay > 1
            ? `${nightStay} nights`
            : nightStay <= 1
            ? `${nightStay} night`
            : Number(night) > 1
            ? `${night} nights`
            : `${night} night`}
        </p>
      </div>
    </div>
  );
};
