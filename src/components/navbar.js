import Link from "next/link";

export default function Navbar() {
  return (
    // <nav className="bg-white shadow-md">
    <nav className="absolute top-0 left-0 w-full z-50 bg-black/1 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold text-[#3B6B4A] tracking-wide"
        >
          Nepal Tea
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-8 text-lg font-medium">
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
      </div>
    </nav>
  );
}