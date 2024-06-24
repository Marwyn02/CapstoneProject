/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/component";
import { Button } from "./button";

type Rooms = {
  id: string;
  image: string;
  name: string;
  no_available: number;
  no_guest: number;
  price: number;
  created_at: string;
  amenities: {
    amenities: string[];
  };
};

export const AmenitiesModal = ({ info }: { info: Rooms }) => {
  return (
    <Dialog>
      <DialogTrigger className="text-start text-xs font-thin underline">
        Full Details and Conditions
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Details and Conditions</DialogTitle>
          <DialogDescription>
            {info.amenities && (
              <div>
                <p className="border-b pb-2 text-sm font-extralight">
                  Included Amenities
                </p>

                <div className="text-sm font-extralight indent-2 space-y-1 my-4">
                  {info.amenities.amenities.map((a: any, index: any) => (
                    <p key={index}>{a}</p>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="border-b pb-2 text-sm font-extralight">
                Room Features
              </p>

              <div className="text-sm font-extralight indent-2 space-y-1 my-4">
                <p>Stunning ocean view</p>
                <p>Private balcony with seating</p>
                <p>Daily housekeeping, 24-hour room service</p>
                <p>
                  55" Flat-screen TV with cable channels, Mini-bar,
                  Complimentary toiletries, In-room safe
                </p>
              </div>
            </div>

            <div>
              <p className="border-b pb-2 text-sm font-extralight">
                Rate Conditions
              </p>

              <div className="text-sm font-extralight indent-2 space-y-1 my-4">
                <p>Free cancellation up to 48 hours before check-in</p>
                <p>Full payment required at the time of booking.</p>
                <p>No reservation fee</p>
                <p>
                  If the guest does not arrive for a last-minute booking, a
                  no-show fee equivalent to one night's stay will be charged.
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteConfirmationModal = ({
  rowId,
  id,
  title,
}: {
  rowId: number;
  id: string;
  title: string;
}) => {
  const supabase = createClient();
  const [open, setOpen] = useState(false);

  // async function onDelete(value: string) {
  //     try {
  //         if (value) {
  //            await supabase.from('guests').delete().eq('id', value)
  //        }
  //     } catch (error) {
  //          console.error(error)
  //     }
  // }

  function onDelete(value: string) {
    console.log("Delete me senpai", value);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-start text-xs text-red-300 hover:text-red-500 duration-300">
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this {title.toLowerCase()}?
          </DialogTitle>
          <DialogDescription>
            <div className="space-y-8">
              <p className="text-sm mt-3">
                This is action is permanent and cannot be undone. <br />
                {title} ID:
                <span className="font-medium text-gray-800">{rowId + 1}</span>
              </p>
              <div className="flex">
                <Button
                  variant={"destructive"}
                  className="w-full"
                  onClick={() => onDelete(id)}
                >
                  Delete
                </Button>
                <Button
                  variant={"outline"}
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
