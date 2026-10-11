import Link from 'next/link';
import { IoCaretDownSharp, IoCaretUpSharp } from 'react-icons/io5';

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

interface CardProps {
    data: Daata;
}

const Card = ({ data }: CardProps) => {

    return (
        <div>
            <Link href={`/details/${data.id}`}>
                <div className='bg-base-100 rounded-2xl px-4 py-4 gap-2'>
                    <div className='flex gap-2'>
                        <h2 className='text-2xl bg-base-200 flex justify-center items-center px-3 py-2 rounded-2xl'>{data.image}</h2>
                        <div>
                            <h2 className=' font-semibold'>{data.nameBn}</h2>
                            <p className='text-xs'>প্রতি কেজি</p>
                        </div>
                    </div>
                    <p className='mt-3 text-xs'>আজকের দাম</p>
                    <div className='flex justify-between'>
                        <div>
                            <div className='flex gap-2'>
                                <h2 className='text-2xl font-semibold'>{new Intl.NumberFormat("bn-BD").format(data.today)}</h2>
                                <p className='flex items-end'>টাকা</p>
                            </div>
                        </div>
                        <div className='bg-base-200 flex justify-center items-center rounded-2xl px-2 text-xs'>
                            {data.change.dir === "up" ? (<div className="flex items-center gap-1 text-red-700"><IoCaretUpSharp />{new Intl.NumberFormat("bn-BD").format(data.change.pct)}%</div>) :
                                data.change.dir === "down" ? (<div className="flex items-center gap-1 text-green-700"><IoCaretDownSharp />{new Intl.NumberFormat("bn-BD").format(data.change.pct)}%</div>) :
                                    <div>--{new Intl.NumberFormat("bn-BD").format(data.change.pct)}%</div>}
                        </div>
                    </div>

                </div>
            </Link>
        </div>
    );
};

export default Card;