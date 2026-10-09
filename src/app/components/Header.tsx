import Image from "next/image";
import NavLinks from "./NavLinks";


const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full", })
    return (
        <div className="bg-base-200 py-3">
            <div className="shadow shadow-gray-200 pb-3">
                <div className=" flex justify-between container mx-auto ">
                    <div className="flex gap-2">
                        <div className="bg-green-700 p-3 rounded-2xl">
                            <Image src="/logo-icon.png" alt="" width={20} height={10} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">বাজার দর</h2>
                            <p className="text-xs text-gray-600">{date}</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="font-bold text-sm">সাইন ইন</button>
                        <button className="font-bold text-sm bg-green-700 rounded-xl text-white px-2 py-1 shadow shadow-green-500">সাইন আউট</button>
                    </div>
                </div>
            </div>
            <NavLinks />
        </div>

    );
};

export default Header;