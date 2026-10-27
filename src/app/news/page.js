import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Mail from "@/components/mail";

export default function News() {
    const news = [
        {
            title: "The Growing Demand for Organic Tea",
            image: "/images/newz.jpg",
            date: "July 10, 2026",
            description:
                "Consumers worldwide are choosing organic and natural beverages. Nepal's mountain-grown tea continues to gain recognition for its exceptional quality and authentic flavor.",
        },
        {
            title: "Herbal Tea: A Wellness Trend",
            image: "/images/blacktea.jpg",
            date: "July 6, 2026",
            description:
                "Herbal teas infused with ginger, mint, lemongrass, and tulsi are becoming increasingly popular for their refreshing taste and natural wellness benefits.",
        },
        {
            title: "Herbal Tea: A Wellness Trend",
            image: "/images/newz.jpg",
            date: "July 6, 2026",
            description:
                "Herbal teas infused with ginger, mint, lemongrass, and tulsi are becoming increasingly popular for their refreshing taste and natural wellness benefits.",
        }
        // {
        //     title: "From the Hills to Your Cup",
        //     image: "/images/tulsitea.jpg",
        //     date: "June 28, 2026",
        //     description:
        //         "Every cup of Nepal tea begins with carefully hand-picked leaves from the Himalayan hills, preserving freshness and delivering a rich, delicate aroma.",
        // },
    ];

    return (
        <>
            <Navbar />

            <main className="bg-[#FBF5EF] min-h-screen">

                {/* Hero */}
                <section className="relative h-[420px]">
                    <Image
                        src="/images/bright.jpg"
                        alt="Tea News"
                        fill
                        className="object-cover"
                    />

                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <div className="text-center text-[#7D806A] px-6">
                            <h1 className="text-5xl font-bold mb-4 ">
                                News & Updates
                            </h1>

                            <p className="max-w-2xl mx-auto text-lg ">
                                Stay updated with the latest tea trends, wellness insights,
                                sustainable farming.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Featured News */}
                <section className="max-w-7xl mx-auto px-6 py-16">

                    <h2 className="text-4xl font-bold text-[#3B6B4A] mb-5 text-center">
                        Featured Story
                    </h2>

                    <div className="grid md:grid-cols-2 gap-10 items-center">

                        <Image
                            src="/images/herbaltea.jpg"
                            alt="Featured Tea"
                            width={700}
                            height={500}
                            className="rounded-2xl shadow-lg object-cover"
                        />

                        <div>
                            <p className="text-[#7D806A] font-semibold mb-3">
                                July 12, 2026
                            </p>

                            <h3 className="text-3xl font-bold mb-5">
                                Nepal Tea Continues to Win Global Recognition
                            </h3>

                            <p className="text-[#7D806A] leading-8">
                                Nepal's premium orthodox tea is earning international
                                recognition for its delicate aroma, rich flavor, and sustainable
                                cultivation. Grown in the pristine Himalayan hills, Nepal tea
                                offers a unique experience appreciated by tea lovers around the
                                world.
                            </p>

                            {/* <button className="mt-8 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full transition">
                                Read More
                            </button> */}
                        </div>

                    </div>
                </section>

                {/* Latest News */}
                <section className="bg-[#FBF5EF] py-16">

                    <div className="max-w-7xl mx-auto px-6">

                        <h2 className="text-4xl font-bold text-center text-green-800 mb-5">
                            Latest News
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {news.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={500}
                                        height={300}
                                        className="w-full h-60 object-cover"
                                    />

                                    <div className="p-6">

                                        <p className="text-sm text-green-700 mb-2">
                                            {item.date}
                                        </p>

                                        <h3 className="text-2xl font-semibold mb-4">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-600 mb-5">
                                            {item.description}
                                        </p>

                                        {/* <button className="text-green-700 font-semibold hover:underline">
                                            Read More →
                                        </button> */}

                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                </section>

                <Mail />

            </main>

            <Footer />
        </>
    );
}