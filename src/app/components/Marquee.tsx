import { DiVim } from "react-icons/di";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";
import MarqueeText from "react-marquee-text";

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


const Marquee = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const datas: Daata[] = await res.json();

    return (
        <div>
            <MarqueeText className="bg-base-200"
                direction="right" duration={10}>
                {

                    datas.map((data, idx) => (
                        <div key={data.id} className="flex text-sm gap-2 px-5 py-1 shadow-xs">
                            <div className="flex gap-1"><span>{data.categoryIcon}</span><span>{data.nameBn}</span></div>
                            <span>{new Intl.NumberFormat("bn-BD").format(data.today)} টাকা/কেজি</span>
                            {data.change.dir === "up" ? (<div className="flex items-center gap-1 text-red-700"><IoCaretUpSharp />{data.change.pct}%</div>) :
                                data.change.dir === "down" ? (<div className="flex items-center gap-1 text-green-700"><IoCaretDownSharp />{data.change.pct}%</div>) :
                                   <div>~</div> }
                            
                        </div>
                    ))
                }
            </MarqueeText>
        </div>
    );
};

export default Marquee;