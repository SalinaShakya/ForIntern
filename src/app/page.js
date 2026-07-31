import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import CollectionCarousel from "@/components/CollectionCarousel";
import Mail from "@/components/mail";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* <main className="h-screen bg-[url('/images/back.jpg')] bg-contain bg-center bg-no-repeat"> */}
      <main className="relative h-screen">
        <Image
          src="/images/back.jpg"
          alt="Background"
          fill
          className="object-cover -z-10"
          priority
          unoptimized={true}
        />
        <div className="flex h-full items-center">

          <div className="max-w-7xl w-full mx-auto px-1">
            <div className="text-left text-black max-w-xl">
              {/*color no change*/}

              <h1 className="text-[#2C3A1E] text-4xl  font-bold">
                Where Comfort Meets Flavor.
              </h1>
              <p className="text-[#5C6650] font-medium pt-5">
                Founded with a passion for sustainability and quality, we source our teas ethically, ensuring every leaf tells a story of craftsmanship and care.
                From bold black teas to delicate herbal infusions, our collection is crafted to inspire and uplift.

              </p>
              <p className="pt-2 mt-4 text-xl text-[#3B6B4A] font-semibold">
                Brew a better world. One cup at a time.
              </p>
              <Link href="/products" className="inline-block mt-6 bg-[#3B6B4A] text-white px-8 py-3 rounded-md hover:bg-[#2C3A1E] transition-colors">
                Explore our teas
              </Link>

            </div>
          </div>
        </div>

      </main>

      <div className="text-black h-screen bg-[#FBF5EF] bg-cover bg-center bg-no-repeat">
        <div className="flex justify-start pt-20 pl-70">
          <div className="flex h-full pt-5 items-start">
            <Image
              src="/images/hero.jpg"
              alt="Hero"
              width={250}
              height={250}
              quality={100}
              className="rounded-full object-cover "

              unoptimized={true}
            />
          </div>

          <div className="max-w-2xl w-full px-10 ">
            <div className=" text-[#5C6650] max-w-xxl">

              <h1 className="text-[#3B6B4A] font-bold text-2xl pb-2">Specialty Teas Crafted with Care
              </h1>
              <p>Nepal Tea specializes in Signature Himalayan Blends, featuring seasonal herbal infusions rooted in Nepali traditions.
                We also offer Rare & Exotic Teas, including single-origin Nepali orthodox teas, premium Darjeeling, and Assam.
                For wellness, we feature Herbal & Medicinal Teas like tulsi, ginger, and lemongrass blends—nature’s healing goodness in every cup.
              </p>
            </div>
          </div>
        </div>
        <div className="highlights  ">
          <h1 className="pt-15 text-black text-2xl font-bold text-center mb-8">Our Highlights</h1>
          <div className="flex flex-row justify-center items-center gap-50 mt-5">

            <div className="flex flex-col items-center">
              <Image
                src="/images/teatea.jpg"
                alt="Organic tea"
                width={130}
                height={130}
                className="rounded-full object-cover w-[130px] h-[130px]"
                priority
                unoptimized={true}
              />
              <p className="text-black pt-3 text-center font-medium mt-5 ">Premium Quality</p>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="/images/packaging.jpg"
                alt="Organic tea"
                width={130}
                height={130}
                className="rounded-full object-cover w-[130px] h-[130px]"
                priority
                unoptimized={true}
              />
              <p className="text-black pt-3 text-center font-medium mt-5 ">Eco-Friendly Packaging</p>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="/images/premium.jpg"
                alt="Organic tea"
                width={130}
                height={130}
                className="rounded-full object-cover w-[130px] h-[130px]"
                priority
                unoptimized={true}
              />
              <p className="text-black pt-7 text-center font-medium">Organic & Natural </p>
            </div>

          </div>
        </div>
      </div>



      <div className="text-black py-12 bg-[#FBF5EF] bg-cover bg-center bg-no-repeat ">
        <h1 className="text-[#3B6B4A] text-2xl font-bold mt-16 text-center">Our Collection</h1>
        <CollectionCarousel />
      </div>

      {/* Review Section */}
      <section className="text-black py-16 bg-[#FBF5EF] border-t border-[#FBF5EF]/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[#3B6B4A] text-3xl font-bold text-center mb-2">
            What Our Tea Lovers Say
          </h2>
          <div className="w-16 h-1 bg-[#3B6B4A] mx-auto mb-12 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white p-8 rounded-2xl border border-[#E8DFCF]/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Stars */}
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Content */}
                <p className="text-[#5C6650] italic leading-relaxed text-base mb-6">
                  "The White Tea from Nepal Tea is hands-down the best I have ever tasted. It has a delicate, floral flavor that is incredibly soothing. The quality is unmatched!"
                </p>
              </div>
              {/* User info */}
              <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                <div className="w-12 h-12 rounded-full bg-[#EAF0EB] text-[#3B6B4A] flex items-center justify-center font-bold text-lg shadow-inner group-hover:bg-[#3B6B4A] group-hover:text-white transition-colors duration-300">
                  AS
                </div>
                <div>
                  <h4 className="text-[#2C3A1E] font-bold text-sm">Aarav Sharma</h4>
                  <span className="text-xs text-[#5C6650] font-medium bg-[#EAF0EB]/60 px-2 py-0.5 rounded">Verified Buyer</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-8 rounded-2xl border border-[#E8DFCF]/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Stars */}
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Content */}
                <p className="text-[#5C6650] italic leading-relaxed text-base mb-6">
                  "I'm in love with the Lemongrass Tea. It is so fresh and aromatic, perfect for my morning routine. The eco-friendly packaging is a wonderful bonus!"
                </p>
              </div>
              {/* User info */}
              <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                <div className="w-12 h-12 rounded-full bg-[#EAF0EB] text-[#3B6B4A] flex items-center justify-center font-bold text-lg shadow-inner group-hover:bg-[#3B6B4A] group-hover:text-white transition-colors duration-300">
                  EW
                </div>
                <div>
                  <h4 className="text-[#2C3A1E] font-bold text-sm">Emily Watson</h4>
                  <span className="text-xs text-[#5C6650] font-medium bg-[#EAF0EB]/60 px-2 py-0.5 rounded">Verified Buyer</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-8 rounded-2xl border border-[#E8DFCF]/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Stars */}
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Content */}
                <p className="text-[#5C6650] italic leading-relaxed text-base mb-6">
                  "The Masala Chiya is exceptionally authentic. It brings back memories of tea stalls in Kathmandu. Perfectly spiced and very rich in flavor. Highly recommend!"
                </p>
              </div>
              {/* User info */}
              <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                <div className="w-12 h-12 rounded-full bg-[#EAF0EB] text-[#3B6B4A] flex items-center justify-center font-bold text-lg shadow-inner group-hover:bg-[#3B6B4A] group-hover:text-white transition-colors duration-300">
                  TN
                </div>
                <div>
                  <h4 className="text-[#2C3A1E] font-bold text-sm">Tenzing Norgay</h4>
                  <span className="text-xs text-[#5C6650] font-medium bg-[#EAF0EB]/60 px-2 py-0.5 rounded">Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <Mail />

      <Footer />
    </>
  );
}