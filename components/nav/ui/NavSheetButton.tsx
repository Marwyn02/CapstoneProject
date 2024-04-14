import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NavSheetButton() {
  const SHEET_SIDES = ["left"] as const;

  type SheetSide = (typeof SHEET_SIDES)[number];
  return (
    <div>
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button className="bg-transparent border-0 hover:bg-transparent hover:opacity-80 hover:border-0">
              <img src="/Menu.svg" alt="menu" />{" "}
              <p className="indent-2 text-[#2A3242] font-light tracking-widest">
                Menu
              </p>
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when youre done.
              </SheetDescription>
            </SheetHeader>
            {/* Body of the sheet  */}
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
