import React from "react";
import { CalendarFold, Calendar, MoonStar, DoorOpen } from "lucide-react";

type Date = {
  date: {
    to: string;
    from: string;
  };
};

type Night = {
  date: {
    // From state
    to: string;
    from: string;
  };
  nightStay: number; // From state
};

export const CheckInDate = ({ date }: Date) => {
  return (
    <div className="flex items-center">
      <CalendarFold className="h-4 w-4 text-gray-500 mr-2" />
      <div>
        <p className="font-medium text-xs text-gray-500">Check-in</p>
        <p className="text-sm text-gray-700 font-medium">
          {date.from !== undefined && date.from !== ""
            ? new Date(date.from).toDateString()
            : null}
        </p>
      </div>
    </div>
  );
};

export const CheckOutDate = ({ date }: Date) => {
  return (
    <div className="flex items-center">
      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
      <div>
        <p className="font-medium text-xs text-gray-500">Check-out</p>
        <p className="text-sm text-gray-700 font-medium">
          {date.to !== undefined && date.to !== ""
            ? new Date(date.to).toDateString()
            : null}
        </p>
      </div>
    </div>
  );
};

export const NightStayCount = ({ date, nightStay }: Night) => {
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
            : null}
        </p>
      </div>
    </div>
  );
};

export const RoomCount = ({ room }: { room: number }) => {
  return (
    <div className="flex items-center">
      <DoorOpen className="h-4 w-4 text-gray-500 mr-2" />
      <div>
        <p className="font-medium text-xs text-gray-500">
          {room && room > 1 ? `Rooms` : room <= 1 ? `Room` : null}
        </p>
        <p className="text-sm text-gray-700 font-medium">{room}</p>
      </div>
    </div>
  );
};
