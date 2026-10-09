import Image from 'next/image';
import React from 'react';

const HeroPage = () => {
    const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full", })
    return (
        <div className='container mx-auto  bg-white my-5 border border-gray-200 rounded-2xl px-5 py-3'>
            <div className='flex justify-between'>
                <div>
                    <p className="w-fit h-fit text-xs text-green-800 bg-green-100 px-3 py-2 rounded-2xl font-bold">{date}</p>
                    <h2 className='text-4xl font-bold py-2'>আজকের বাজারের দাম এক নজরে</h2>
                    <p className=' text-gray-500 py-5'>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন - <br />
                        সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                    <div className='py-5'>
                        <button className='font-bold text-sm w-fit bg-green-700 rounded-xl text-white px-5 py-3 shadow shadow-green-500"'>সব পণ্য দেখুন</button>
                    </div>
                </div>
                <div>
                    <Image src="/bazar-hero.png" alt='' width={350} height={350} />
                </div>
            </div>
        </div>
    );
};

export default HeroPage;