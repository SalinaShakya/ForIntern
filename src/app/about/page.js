
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Mail from "@/components/mail";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="max-w-full mx-auto px-6 py-20 mt-10">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-[#3B6B4A] text-center ">
          About Us
        </h1>

        {/* Banner Image */}
        <div className="mt-10">
          
          <Image
            src="/images/herbaltea.jpg"
            alt="Tea Plantation"
            width={1200}
            height={500}
            className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Intro */}
        <p className="mt-8 text-center text-lg text-[#5C6650] leading-8 max-w-4xl mx-auto">
          At <span className="font-semibold text-[#3B6B4A]">Nepal Tea</span>,
          every cup tells the story of Nepal's rich tea heritage. We carefully
          source premium tea from the Himalayan region, bringing freshness,
          authenticity, and natural goodness to every sip.
        </p>

        {/* Our Story */}
        <section className="grid md:grid-cols-2 gap-12 items-center mt-20">
          <div>
            <Image
              src="/images/organic.jpg"
              alt="Tea Garden"
              width={600}
              height={450}
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-[#3B6B4A] mb-5">
              Our Story
            </h2>

            <p className="text-[#5C6650] text-lg leading-8">
              Nepal Tea began with a passion for sharing the exceptional taste of
              Nepali tea with the world. Working closely with local farmers, we
              carefully select handpicked tea leaves grown in the pristine
              Himalayan foothills. Every blend reflects generations of tea
              craftsmanship and a commitment to quality.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="grid md:grid-cols-2 gap-12 items-center mt-24">
          <div>
            <h2 className="text-4xl font-bold text-[#3B6B4A] mb-5">
              Our Mission
            </h2>

            <p className="text-[#5C6650] text-lg leading-8">
              Our mission is to deliver premium organic tea while supporting
              sustainable farming and empowering local communities. We strive to
              provide tea lovers with products that are natural, healthy, and
              crafted with care, preserving Nepal's tea tradition for future
              generations.
            </p>
          </div>

          <div>
            <Image
              src="/images/teatea.jpg"
              alt="Organic Tea"
              width={600}
              height={450}
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
            />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-24">
          <h2 className="text-4xl font-bold text-[#3B6B4A] text-center mb-10">
            Why Choose Nepal Tea?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FFFFFF] p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-[#3B6B4A]">
                Premium Quality
              </h3>
              <p className="mt-3 text-[#5C6650]">
                Handpicked Himalayan tea with exceptional freshness.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-[#3B6B4A]">
                Organic & Natural
              </h3>
              <p className="mt-3 text-[#5C6650]">
                No artificial flavors or preservatives.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-[#3B6B4A]">
                Sustainable
              </h3>
              <p className="mt-3 text-[#5C6650]">
                Supporting local farmers and eco-friendly farming.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-[#3B6B4A]">
                Wellness
              </h3>
              <p className="mt-3 text-[#5C6650]">
                Rich in antioxidants for a healthier lifestyle.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Mail />

      <Footer />
    </>
  );
}