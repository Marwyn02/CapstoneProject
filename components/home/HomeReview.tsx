/* eslint-disable react/no-unescaped-entities */
import React from "react";

const HomeReview = () => {
  return (
    <div className="mx-52 my-32 space-y-10">
      <div className="space-y-1">
        <h2 className="text-3xl font-semibold font-serif text-gray-500">
          Loved by <span className="text-black">Guests</span>
        </h2>
        <p className="text-gray-500 font-serif">
          Dive into our guests' stories and experiences.
        </p>
      </div>
      <hr className="border[1px] border-zinc-200 w-10 md:w-16 md:-ml-3 my-8 md:my-2 rotate-90" />

      <section className="grid grid-cols-2 grid-rows-2 space-x-2">
        <div className="space-y-3 border border-transparent rounded-md p-4 hover:border-gray-200 duration-300">
          <p className="font-serif uppercase text-sm text-gray-600 font-semibold">
            Mr. Marwyn S.
          </p>
          <p className="text-base text-black font-extralight">
            I spent a few nights at this hotel and was thoroughly impressed by
            the level of service and quality. From the moment I arrived, the
            staff made me feel right at home, attending to my every need with a
            smile. The room was spacious, impeccably clean, and beautifully
            decorated, providing a cozy and luxurious environment. The hotel's
            central location made it easy to explore the city's main attractions
            and dine at nearby restaurants. I loved the hotel's spa and wellness
            center, which offered a variety of treatments that left me feeling
            relaxed and rejuvenated. The breakfast spread was excellent, with
            plenty of healthy and indulgent choices. Overall, it was an
            outstanding stay, and I look forward to returning in the future.
          </p>
        </div>
        <div className="space-y-3 border border-transparent rounded-md p-4 hover:border-gray-200 duration-300">
          <p className="font-serif uppercase text-sm text-gray-600 font-semibold">
            Mr. Finnigan M.
          </p>
          <p className="text-base text-black font-extralight">
            My experience at this hotel was fantastic from start to finish. The
            reception staff were welcoming and efficient, making the check-in
            process quick and easy. The room was modern and well-appointed, with
            comfortable beds and a stunning view of the city skyline. The
            hotel's location was ideal, providing easy access to public
            transportation and nearby attractions. I particularly enjoyed the
            rooftop bar, which offered a great atmosphere and delicious
            cocktails. The daily breakfast buffet had a wide selection of fresh
            and tasty options, ensuring a great start to each day. I highly
            recommend this hotel to anyone visiting the area and will definitely
            stay here again on my next trip.
          </p>
        </div>

        <div className="space-y-3 border border-transparent rounded-md p-4 hover:border-gray-200 duration-300">
          <p className="font-serif uppercase text-sm text-gray-600 font-semibold">
            Ms. Gwen C.
          </p>
          <p className="text-base text-black font-extralight">
            I recently stayed at this hotel and found the experience to be truly
            exceptional. The staff were incredibly helpful and friendly, always
            going out of their way to ensure my stay was comfortable. The room
            was immaculately clean and spacious, offering a relaxing retreat
            after a long day of sightseeing. The location was perfect, situated
            close to major attractions yet nestled in a quiet area. The
            amenities, including the fitness center and pool, were top-notch and
            added great value to my stay. The breakfast was delicious with a
            wide variety of options to choose from each morning. Overall, I had
            a very pleasant stay and would definitely recommend this hotel to
            anyone looking for a great value and a welcoming atmosphere.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomeReview;
