import Image from "next/image";
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
import { createClient } from "@/utils/supabase/component";
import Router from "next/router";
import { User } from "@supabase/supabase-js";

const navigations = [
  {
    id: 1,
    title: "Home",
  },
  {
    id: 2,
    title: "The Rooms",
  },
  {
    id: 3,
    title: "The Hotel",
  },
];

export function NavSheetButton({ user }: { user: User }) {
  const supabase = createClient();

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      Router.push("/");
    } catch (error) {
      console.error("ERROR! ", error);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* {children} */}
        <button
          type="button"
          className="flex items-center bg-transparent border-0 hover:bg-transparent hover:opacity-60 hover:border-0 duration-300 focus:outline-none"
        >
          <Image src="/Menu.svg" alt="menu" height={25} width={25} />
          <p className="hidden md:block indent-2 text-[#2A3242] text-sm font-light tracking-widest duration-300">
            MENU
          </p>
        </button>
      </SheetTrigger>
      <SheetContent side={"left"} className="px-0">
        <SheetHeader>
          <SheetTitle className="flex items-center text-[#2A3242] tracking-wider font-extralight border-b px-5">
            <Image
              src="/MainLogo-removed.png"
              alt="Logo"
              height={1000}
              width={1000}
              className="h-20 w-20"
            />
            <p className="font-serif font-thin text-2xl">Coastal Charm</p>
          </SheetTitle>
          <section className="grid grid-row space-y-4 text-lg text-start px-10 text-slate-500 dark:text-slate-400">
            {navigations.map((n, index) => (
              <p key={n.id} className="hover:underline">
                {n.title}
              </p>
            ))}
          </section>
        </SheetHeader>

        <SheetFooter>
          {user && (
            <Button type="button" onClick={signOut}>
              Sign out
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
