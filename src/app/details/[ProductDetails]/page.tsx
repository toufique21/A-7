import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

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
  markets: Market[];
}

interface ProductDetailsProps {
  ProductDetails: string;
}

const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD").format(value);

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<ProductDetailsProps>;
}) => {
  const { ProductDetails } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${ProductDetails}`
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const data: Daata = await res.json();
  const markets = data.markets ?? [];

  const lowest =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : 0;

  const highest =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : 0;

  const average =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : 0;

  const priceDifference = Math.abs(data.today - data.yesterday);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">

      <section className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-base-100 p-4 shadow-sm sm:gap-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">

        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center self-start rounded-2xl bg-base-200 text-4xl sm:h-28 sm:w-28 sm:self-auto sm:text-5xl">
            {data.image || data.categoryIcon || "🛒"}
          </div>

          <div className="min-w-0">
            <h1 className="break-words text-2xl font-bold leading-snug sm:text-3xl lg:text-4xl">
              {data.nameBn}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              প্রতি {data.unit || "কেজি"} · {data.categoryNameBn}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-sm text-gray-600">
              <span>গতকালের তুলনায় আজ দাম</span>

              {data.change.dir === "up" ? (
                <span className="inline-flex items-center gap-1 font-semibold text-red-700">
                  <IoCaretUpSharp />
                  বেড়েছে {formatNumber(priceDifference)} টাকা
                </span>
              ) : data.change.dir === "down" ? (
                <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                  <IoCaretDownSharp />
                  কমেছে {formatNumber(priceDifference)} টাকা
                </span>
              ) : (
                <span className="font-semibold text-gray-700">একই আছে</span>
              )}
            </div>
          </div>
        </div>


        <div className="rounded-2xl bg-base-200 p-5 sm:p-6 lg:min-w-52 lg:text-center">
          <p className="text-sm text-gray-500">আজকের দাম</p>

          <p className="mt-1 text-3xl font-bold sm:text-4xl">
            {formatNumber(data.today)}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            টাকা / {data.unit || "কেজি"}
          </p>

          <div className="mt-3">
            {data.change.dir === "up" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                <IoCaretUpSharp />
                {formatNumber(data.change.pct)}%
              </span>
            ) : data.change.dir === "down" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                <IoCaretDownSharp />
                {formatNumber(data.change.pct)}%
              </span>
            ) : (
              <span className="text-sm font-medium text-gray-500">
                কোনো পরিবর্তন নেই
              </span>
            )}
          </div>
        </div>
      </section>


      <section className="mb-8 rounded-2xl border border-gray-200 bg-base-100 p-4 sm:p-6 lg:p-8">
        <h2 className="mb-5 text-xl font-bold sm:text-2xl">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">

          <div className="rounded-2xl border border-gray-200 p-4 sm:p-5">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

            <p className="mt-2 text-2xl font-bold text-green-700 sm:text-3xl">
              {markets.length > 0 ? formatNumber(lowest) : "—"}
              {markets.length > 0 && (
                <span className="ml-1 text-sm font-normal">টাকা</span>
              )}
            </p>

            <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
              সব বাজারের মধ্যে সবচেয়ে কম দাম
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4 sm:p-5">
            <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>

            <p className="mt-2 text-2xl font-bold text-red-700 sm:text-3xl">
              {markets.length > 0 ? formatNumber(highest) : "—"}
              {markets.length > 0 && (
                <span className="ml-1 text-sm font-normal">টাকা</span>
              )}
            </p>

            <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
              সব বাজারের মধ্যে সবচেয়ে বেশি দাম
            </p>
          </div>

  
          <div className="rounded-2xl border border-gray-200 p-4 sm:col-span-2 sm:p-5 lg:col-span-1">
            <p className="text-sm text-gray-500">গড় দাম</p>

            <p className="mt-2 text-2xl font-bold text-green-700 sm:text-3xl">
              {markets.length > 0 ? formatNumber(Math.ceil(average)) : "—"}
              {markets.length > 0 && (
                <span className="ml-1 text-sm font-normal">টাকা</span>
              )}
            </p>

            <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
              সব বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের গড়
            </p>
          </div>
        </div>
      </section>

      {/* Market-wise Prices */}
      <section className="mb-8 rounded-2xl border border-gray-200 bg-base-100 p-4 sm:p-6 lg:p-8">
        <div className="mb-5">
          <h2 className="text-xl font-bold sm:text-2xl">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {formatNumber(markets.length)} টি বাজারের মূল্যতথ্য
          </p>
        </div>

        {markets.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] border-collapse text-left text-sm">
                <thead className="bg-base-200">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-4 font-semibold">
                      বাজার
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 font-semibold">
                      বিভাগ
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 font-semibold">
                      সর্বনিম্ন দাম
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 font-semibold">
                      সর্বোচ্চ দাম
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 font-semibold">
                      গড় দাম
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, idx) => {
                    const marketAverage = Math.ceil(
                      (market.min + market.max) / 2
                    );

                    return (
                      <tr
                        key={`${market.market}-${market.division}-${idx}`}
                        className="border-t border-gray-200 transition-colors hover:bg-base-200"
                      >
                        <td className="whitespace-nowrap px-4 py-4 font-medium">
                          {market.market}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                          {market.division}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 font-medium text-green-700">
                          {formatNumber(market.min)} টাকা
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 font-medium text-red-700">
                          {formatNumber(market.max)} টাকা
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 font-semibold">
                          {formatNumber(marketAverage)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 px-4 py-10 text-center">
            <p className="text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য এখনো পাওয়া যায়নি।
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default ProductDetailsPage;