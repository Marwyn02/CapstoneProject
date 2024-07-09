import React from "react";
import Image from "next/image";

type selectionProps = {
  onSelect: (choices: string) => void;
};

const SelectionCard = ({ data, onSelect }: any) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 px-5 lg:px-20 text-center gap-3 lg:gap-6">
      {data.map((d: any, i: number) => (
        <button
          key={i}
          className="h-[200px] w-full rounded-lg bg-gray-50 p-8 flex flex-col space-y-7 items-start cursor-pointer border border-transparent hover:border-black duration-300"
          onClick={() => onSelect(String(d.id))}
        >
          {d.icon && (
            <div className="">
              <Image src={d.icon} alt={d.title} height={30} width={30} />
            </div>
          )}

          <div className="text-start space-y-1">
            <p className="text-base text-zinc-600 font-serif">{d.title}</p>
            {d.description && (
              <p className="text-xs text-zinc-700 font-thin">{d.description}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default SelectionCard;
