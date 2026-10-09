
interface Daata {
    id: string,
    nameBn: string,
    icon: string
}

const NavLinks = async() => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
    const datas: Daata[] = await res.json();
    

    return (
        <div className='flex justify-center gap-7 text-xs font-semibold py-2 shadow shadow-gray-300'>
            {datas.map((data) => (
                 <div key={data.id} className='flex gap-1'>
                    <div>{data.icon}</div>
                    <div>{data.nameBn}</div>
                 </div>
                 ))}
        </div>
    );
};

export default NavLinks;