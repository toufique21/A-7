"use client";

import Image from "next/image";
import Link from "next/link";

const HeroPage = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="container mx-auto my-4 w-full max-w-7xl px-4 sm:my-6 sm:px-6 lg:my-8 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-7 lg:px-10 lg:py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-8">

          <div className="w-full min-w-0 flex-1 text-center md:text-left">
            <p className="mx-auto mb-3 w-fit rounded-full bg-green-100 px-3 py-2 text-xs font-bold text-green-800 md:mx-0">
              {date}
            </p>

            <h2 className="py-2 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl lg:text-4xl">আজকের বাজারের দাম এক নজরে</h2>

            <p className="mx-auto max-w-2xl py-3 text-sm leading-7 text-gray-500 sm:text-base md:mx-0 lg:py-4">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম। বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক
              জায়গায়।
            </p>

            <div className="pt-3 sm:pt-4">
              <a href="#library"
                className="inline-flex items-center justify-center rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">সব পণ্য দেখুন
              </a>
            </div>
          </div>

  
          <div className="w-full max-w-[240px] shrink-0 sm:max-w-[300px] md:w-[40%] lg:max-w-[350px]">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের বিভিন্ন পণ্য"
              width={350}
              height={350}
              priority
              sizes="(max-width: 639px) 240px, (max-width: 767px) 300px, (max-width: 1023px) 40vw, 350px"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;