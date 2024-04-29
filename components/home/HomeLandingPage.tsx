import React from "react";

const HomeLandingPage = () => {
  return (
    <>
      <div className="bg-[url('/Main-Image.jpg')] relative mx-auto h-screen w-full overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg">
        <div className="absolute px-8 md:px-10 inset-0 flex items-center justify-center">
          <h1 className="text-slate-100 text-center text-5xl md:text-5xl font-bold">
            Creating Memories, One Stay at a Time.
          </h1>
        </div>
      </div>
    </>
  );
};

export default HomeLandingPage;
