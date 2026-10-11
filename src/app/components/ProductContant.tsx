import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";
import Card from "./Card";
import AllProductsPage from "../AllProducts";

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

const ProductContant = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  const datas: Daata[] = await res.json();

  const increasedProducts = datas
    .filter((data) => data.change.dir === "up")
    .slice(0, 6);

  const decreasedProducts = datas
    .filter((data) => data.change.dir === "down")
    .slice(0, 6);

  return (
    <main className="w-full min-w-0">

      <section className="mx-auto my-6 w-full max-w-7xl px-4 sm:my-8 sm:px-6 lg:my-10 lg:px-8">
        <div className="mb-4 flex items-center gap-2 sm:mb-5">
          <IoCaretUpSharp className="shrink-0 text-xl text-red-700 sm:text-2xl" />

          <h2 className="text-lg font-bold sm:text-xl lg:text-2xl">
            আজকে দাম বেড়েছে
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {increasedProducts.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
      </section>


      <section className="mx-auto my-6 w-full max-w-7xl px-4 sm:my-8 sm:px-6 lg:my-10 lg:px-8">
        <div className="mb-4 flex items-center gap-2 sm:mb-5">
          <IoCaretDownSharp className="shrink-0 text-xl text-green-700 sm:text-2xl" />

          <h2 className="text-lg font-bold sm:text-xl lg:text-2xl">
            আজকে দাম কমেছে
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {decreasedProducts.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
      </section>


      <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <AllProductsPage datas={datas} />
      </section>
    </main>
  );
};

export default ProductContant;