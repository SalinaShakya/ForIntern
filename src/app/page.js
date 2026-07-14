import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

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

          <div className="max-w-2xl w-full px-10">
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
        <div className="highlights">
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
        <div className="grid grid-cols-5 gap-5 mt-9 max-w-6xl mx-auto px-6">

          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md h-55">
            <img src="/images/teablack.jpg" alt="Black Tea" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-2 text-center">
              <p className="text-white font-semibold text-sm">Black Tea</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md h-55">
            <img src="/images/teagreen.jpg" alt="Green Tea" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-2 text-center">
              <p className="text-white font-semibold text-sm">Green Tea</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md h-55">
            <img src="/images/herbaltea.jpg" alt="Herbal Tea" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-2 text-center">
              <p className="text-white font-semibold text-sm">Herbal Tea</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md h-55">
            <img src="/images/oolongtea.jpg" alt="Oolong Tea" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-2 text-center">
              <p className="text-white font-semibold text-sm">Oolong Tea</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md h-55">
            <img src="/images/whitetea.jpg" alt="White Tea" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-2 text-center">
              <p className="text-white font-semibold text-sm">White Tea</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md h-55">
            <img src="/images/bluetea.jpg" alt="Himalayan Blend" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-2 text-center">
              <p className="text-white font-semibold text-sm">Blue Tea</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md h-55">
            <img src="/images/masalatea.jpg" alt="Masala Chai" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-2 text-center">
              <p className="text-white font-semibold text-sm">Masala Chiya</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md h-55">
            <img src="/images/lemontea.jpg" alt="Lemongrass Tea" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-2 text-center">
              <p className="text-white font-semibold text-sm">Lemongrass Tea</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md h-55">
            <img src="/images/tulsitea.jpg" alt="Tulsi Tea" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-2 text-center">
              <p className="text-white font-semibold text-sm">Tulsi Tea</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md h-55">
            <img src="/images/gingertea.jpg" alt="Ginger Tea" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-2 text-center">
              <p className="text-white font-semibold text-sm">Ginger Tea</p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}