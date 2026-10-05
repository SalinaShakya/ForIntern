import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#F5EEE3] shadow-md border-t border-[#D4C9B5]">
            <div className="max-w-7xl mx-auto px-8 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-32">
                    {/* Logo / Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#3B6B4A]">Nepal Tea</h2>
                        <div className="flex flex-col space-y-1">

                            <p className="mt-3 text-[#5C6650]">
                                Premium tea from the Himalayas.
                            </p>
                        </div>
                    </div>
                    {/* Home */}
                    <div>
                        <h3 className="text-[#2C3A1E] font-semibold mb-4">Home</h3>
                        <div className="flex flex-col space-y-1">
                            <Link
                                href="/"
                                className="text-[#5C6650] hover:text-[#3B6B4A] transition"
                            >
                                Home
                            </Link>
                            <Link
                                href="/products"
                                className="text-gray-700 hover:text-green-700 transition"
                            >
                                Products
                            </Link>
                            <Link
                                href="/news"
                                className="text-gray-700 hover:text-green-700 transition"
                            >
                                News
                            </Link>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-[#2C3A1E] font-semibold mb-4">Company</h3>
                        <div className="flex flex-col space-y-1">
                            <Link
                                href="/about"
                                className="text-gray-700 hover:text-green-700 transition"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-700 hover:text-green-700 transition"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className="text-[#2C3A1E] font-semibold mb-4">Follow Us</h3>
                        <div className="flex flex-col space-y-1">
                            <a
                                href="#"
                                className="text-gray-700 hover:text-green-700 transition"
                            >
                                Instagram
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-green-700 transition"
                            >
                                Facebook
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-green-700 transition"
                            >
                                X
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t mt-10 pt-6 text-center text-[#5C6650] text-sm">
                    © 2026 Nepal Tea. All rights reserved.
                </div>
            </div>
        </footer>
    );
}