import HeroPage from "./components/Hero";
import AllProductsPage from "./AllProducts";
import Card from "./components/Card";
import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";
import { Suspense } from "react";
import ProductContant from "./components/ProductContant";


interface Daata {
  id: number,
  slug: string
  nameBn: string
  category: string
  categoryNameBn: string
  categoryIcon: string,
  unit: string
  image: string
  today: number,
  yesterday: number,
  lastWeek: number,
  lastMonth: number,
  change: {
    dir: string,
    pct: number,
  }
}

export default function Home() {

  return (
    <div>
      <HeroPage />

      <Suspense fallback={<p>পণ্যের তথ্য লোড হচ্ছে...</p>}>
        <ProductContant />
      </Suspense>


    </div>
  );
}
