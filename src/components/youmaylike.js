import Link from "next/link";
import Image from "next/image";

export default function YouMayLike() {
    return (
        <div className="mt-20 border-t border-gray-300 pt-12">
            <h3 className="text-3xl font-bold text-[#3B6B4A] text-center mb-10">
                You May Also Like
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Product 1 */}
                <Link href="/inside/forgreentea" className="group block">
                    <div className="overflow-hidden h-70 shadow-sm group-hover:shadow-md transition-shadow duration-300 ">
                        <img
                            src="/images/gingertea.jpg"
                            alt="Green Tea"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <h4 className="font-bold text-[#2C3A1E] text-base group-hover:text-[#3B6B4A] transition-colors">
                            Green Tea
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">Premium Himalayan Blend</p>
                        <span className="text-[#3B6B4A]">Rs. 370</span>

                    </div>
                </Link>

                {/* Product 2 */}
                <Link href="/inside/forherbaltea" className="group block">
                    <div className="overflow-hidden h-70 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                        <img
                            src="/images/teablack.jpg"
                            alt="Herbal Tea"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <h4 className="font-bold text-[#2C3A1E] text-base group-hover:text-[#3B6B4A] transition-colors">
                            Herbal Tea
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">Natural Wellness Infusion</p>
                        <span className="text-[#3B6B4A]">Rs. 370</span>
                    </div>
                </Link>

                {/* Product 3 */}
                {/* Fixed link to point to foroolongtea instead of lemontea */}
                <Link href="/inside/foroolongtea" className="group block">
                    <div className="overflow-hidden h-70 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                        <img
                            src="/images/lemontea.jpg"
                            alt="Oolong Tea"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <h4 className="font-bold text-[#2C3A1E] text-base group-hover:text-[#3B6B4A] transition-colors">
                            Oolong Tea
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">Rare Single-Origin Orthodox</p>
                        <span className="text-[#3B6B4A]">Rs. 370</span>

                    </div>
                </Link>
            </div>
        </div>
    );
}
