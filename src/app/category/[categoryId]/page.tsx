"use client";

import Card from "@/app/components/Card";
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";

interface Daata {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
}

const CategoryIdPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const [datas, setDatas] = useState<Daata[]>([]);

  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high">("default");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`);

        const data: Daata[] = await res.json();
        setDatas(data);
      } catch {

      } finally {

      }
    };

    if (categoryId) {
      fetchProducts();
    }
    if(!categoryId){
        notFound()
    }
  }, [categoryId]);

  const sortedDatas = [...datas].sort((a, b) => {
    if (sortBy === "price-low") return a.today - b.today;
    if (sortBy === "price-high") return b.today - a.today;
    return 0;
  });

  const sortOptions = [
    { value: "default", label: "ডিফল্ট" },
    { value: "price-low", label: "দাম: কম থেকে বেশি" },
    { value: "price-high", label: "দাম: বেশি থেকে কম" },
  ] as const;

  const selectedLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ??
    "ডিফল্ট";

  const formatNumber = (value: number) =>new Intl.NumberFormat("bn-BD").format(value);


  return (
    <main className="container mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <section className="mb-6 flex items-center gap-3 rounded-2xl border border-gray-200 bg-base-100 p-4 shadow-sm sm:mb-8 sm:gap-4 sm:p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl sm:h-16 sm:w-16 sm:text-4xl">
          {datas[0]?.image || datas[0]?.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0">
          <h1 className="text-xl font-bold leading-snug sm:text-2xl lg:text-3xl">
            {datas[0]?.categoryNameBn}
          </h1>

          <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
            {formatNumber(datas.length)} টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>


      <section className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          মোট{" "}
          <span className="font-semibold text-gray-800">{formatNumber(sortedDatas.length)}</span>{" "}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="relative w-full sm:w-auto">
          <button onClick={() => setIsOpen((prev) => !prev)}
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            className="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:bg-gray-50 sm:w-auto sm:min-w-56"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="text-lg" aria-hidden="true">
                ⇅
              </span>
              <span className="truncate text-sm font-medium text-gray-700">
                সাজান: {selectedLabel}
              </span>
            </span>

            <span className="text-xs text-gray-500">
              {isOpen ? "▲" : "▼"}
            </span>
          </button>

          {isOpen && (
            <>
              <button
                type="button"
                aria-label="Close sorting menu"
                className="fixed inset-0 z-10 cursor-default"
                onClick={() => setIsOpen(false)}
              />

              <div className="absolute right-0 top-full z-20 mt-2 w-full min-w-56 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-xl sm:w-64">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSortBy(option.value);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition ${
                      sortBy === option.value
                        ? "bg-green-50 font-semibold text-green-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{option.label}</span>
                    {sortBy === option.value && (
                      <span aria-hidden="true">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>


      {sortedDatas.length > 0 ? (
        <section className="mb-8 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {sortedDatas.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </section>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 px-4 py-12 text-center sm:py-16">
          <p className="text-3xl">🛒</p>
          <p className="mt-3 font-semibold text-gray-700">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
          <p className="mt-1 text-sm text-gray-500">
            অন্য ক্যাটাগরি থেকে পণ্য দেখুন।
          </p>
        </div>
      )}
    </main>
  );
};

export default CategoryIdPage;