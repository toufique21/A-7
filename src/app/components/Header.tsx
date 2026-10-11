import Image from "next/image";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { Suspense } from "react";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full bg-base-200">

      <div className="border-b border-gray-200 shadow-sm">
        <div className="container mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">

          <Link
            href="/"
            className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-700 p-2 sm:h-12 sm:w-12">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={28}
                height={28}
                className="h-auto w-full object-contain"
                priority
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-bold leading-tight sm:text-2xl">
                বাজার দর
              </h1>

              <p className="mt-1 text-[10px] leading-relaxed text-gray-600 sm:text-xs">
                {date}
              </p>
            </div>
          </Link>


          <div className="shrink-0">
            <UserInfo />
          </div>
        </div>
      </div>


      <Suspense
        fallback={
          <div className="px-4 py-3 text-center text-sm text-gray-500">
            Loading navigation...
          </div>
        }
      >
        <NavLinks />
      </Suspense>
    </header>
  );
};

export default Header;