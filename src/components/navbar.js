import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    // <nav className="bg-white shadow-md">
    <nav className="absolute top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center relative">
        {/* Navigation Links */}
        <div className="flex gap-8 text-lg font-medium flex-1">
          <Link href="/" className="text-[#2C3A1E] hover:text-[#3B6B4A] transition">
            Home
          </Link>

          <Link href="/news" className="text-[#2C3A1E] hover:text-[#3B6B4A] transition">
            News
          </Link>

          <Link href="/products" className="text-[#2C3A1E] hover:text-[#3B6B4A] transition">
            Products
          </Link>

          <Link href="/contact" className="text-[#2C3A1E] hover:text-[#3B6B4A] transition">
            Contact
          </Link>
        </div>

        {/* Centered Image Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
            <Image
              src="/images/logo1.jpg"
              alt="Herbal Tea"
              width={600}
              height={450}
              className="h-16 w-auto object-contain hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* Right Logo Text */}
        <div className="flex flex-1 justify-end">
          <Link
            href="/"
            className="text-3xl font-bold text-[#3B6B4A] tracking-wide"
          >
            Nepal Tea
          </Link>
        </div>
      </div>
    </nav>
  );
}