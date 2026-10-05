import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24 lg:px-20 lg:py-32">
        <div className="w-full max-w-md lg:max-w-lg bg-white p-8 lg:p-12 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-6">
            Contact Us
          </h1>

          <form className="flex flex-col gap-4 ">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-gray-200 text-green py-3 rounded-md hover:bg-gray-400 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
