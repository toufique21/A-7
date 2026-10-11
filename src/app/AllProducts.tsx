import Card from './components/Card';


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

interface AllProductsProps {
    datas: Daata[];
}

const AllProductsPage = ({ datas }: AllProductsProps) => {
    return (
        <div className="container mx-auto my-10">
            <section id='library'>
                <div className='my-10'>
                    <h2 className="text-2xl font-bold">সব পণ্য</h2>
                    <p>মোট {new Intl.NumberFormat("bn-BD").format(datas.length)}টি পণ্য দেখানো হচ্ছে</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 p-2 lg:grid-cols-3 gap-5">
                    {
                        datas.map((data, idx) => (
                            <Card key={data.id} data={data} />
                        ))
                    }
                </div>
            </section>
        </div>
    );
};

export default AllProductsPage;