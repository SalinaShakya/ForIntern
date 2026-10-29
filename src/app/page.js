import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import CollectionCarousel from "@/components/CollectionCarousel";
import Mail from "@/components/mail";
import FAQ from "@/components/FAQ";
import { createClient } from "@/lib/supabase/server";
import ReviewsSection from "@/components/ReviewsSection";

export default async function Home() {
  const supabase = await createClient();
  let reviews = [];

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      reviews = data;
    }
  } catch (err) {
    console.error("Failed to load reviews from Supabase:", err);
  }

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

      <div className="text-black py-20 bg-[#FBF5EF] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-start">
            <Image
              src="/images/hero.jpg"
              alt="Hero"
              width={250}
              height={250}
              quality={100}
              className="rounded-full object-cover"
              unoptimized={true}
            />
          </div>

          <div className="max-w-2xl w-full">
            <div className="text-[#5C6650] text-center md:text-left">
              <h1 className="text-[#3B6B4A] font-bold text-2xl pb-2">Specialty Teas Crafted with Care</h1>
              <p>Nepal Tea specializes in Signature Himalayan Blends, featuring seasonal herbal infusions rooted in Nepali traditions.
                We also offer Rare & Exotic Teas, including single-origin Nepali orthodox teas, premium Darjeeling, and Assam.
                For wellness, we feature Herbal & Medicinal Teas like tulsi, ginger, and lemongrass blends—nature’s healing goodness in every cup.
              </p>
            </div>
          </div>
        </div>
        <div className="highlights mt-20">
          <h1 className="text-black text-2xl font-bold text-center mb-8">Our Highlights</h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 mt-5">

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



      <div className="text-black py-16 bg-[#FBF5EF] bg-cover bg-center bg-no-repeat">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-[#3B6B4A] text-3xl font-bold text-center">Our Collection</h1>
          <p className="mt-2 text-[#5C6650] text-sm md:text-base max-w-xl mx-auto">
            Discover our hand-picked specialty teas crafted from organic Himalayan harvests.
          </p>
        </div>
        <CollectionCarousel />
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B6B4A] hover:text-[#2C3A1E] transition-colors"
          >
            Explore all teas in our catalog
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Review Section */}
      <ReviewsSection initialReviews={reviews} />

      <FAQ />

      <Mail />

      <Footer />
    </>
  );
}