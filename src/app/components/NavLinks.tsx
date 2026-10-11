"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Daata {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = () => {
  const pathname = usePathname();
  const [datas, setDatas] = useState<Daata[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");

        const result = await res.json();

        setDatas(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div
        className="
          mx-auto flex w-full max-w-7xl
          items-center gap-3 overflow-x-auto
          px-4 py-3
          sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-3 sm:px-6
          lg:gap-x-8 lg:px-8
        "
      >
        {datas.map((data) => {
          const isActive = pathname === `/category/${data.slug}`;

          return (
            <Link
              href={`/category/${data.slug}`}
              key={data.id}
              aria-current={isActive ? "page" : undefined}
              className={`
                flex shrink-0 items-center gap-1.5
                whitespace-nowrap rounded-lg px-3 py-2
                text-xs font-semibold
                transition-colors duration-200 sm:text-sm
                ${
                  isActive
                    ? "bg-green-600 text-white shadow-sm"
                    : " text-gray-700 hover:bg-green-50 hover:text-green-700"
                }
              `}
            >
              <span>{data.icon}</span>
              <span>{data.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavLinks;