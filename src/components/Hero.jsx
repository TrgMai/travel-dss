import React from "react";

export default function Hero() {
  return (
    <section className="relative h-[400px] bg-cover bg-center" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')"
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Search Your Destination
        </h1>
      </div>
    </section>
  );
}
