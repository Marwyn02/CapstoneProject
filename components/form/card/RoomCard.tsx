import React from "react";
import Image from "next/image";

const RoomCard = () => {
  return (
    <section>
      <div className="p-2">
        <Image src="/RoomImage.webp" height={750} width={750} alt="Image" />
        <div className="my-4">
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consectetur maxime libero accusamus, totam error similique, sapiente
            laudantium exercitationem quos atque non molestias dolores nemo,
            tempore expedita illum assumenda numquam alias.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoomCard;
