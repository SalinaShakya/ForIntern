export default function FAQ() {
  const faqs = [
    {
      question: "Are your teas organic?",
      answer: "Yes! All our teas are 100% organic, ethically sourced from the Himalayan regions of Nepal, and grown without synthetic pesticides or fertilizers.",
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the country. We also offer expedited 2-day shipping at checkout.",
    },
    {
      question: "How should I store my tea to keep it fresh?",
      answer: "To maintain maximum flavor and freshness, store your tea in an airtight container in a cool, dry place, away from direct sunlight and strong odors.",
    },
    {
      question: "What is your return policy?",
      answer: "We want you to love your tea! If you are not completely satisfied, you can return any unopened packages within 30 days of purchase for a full refund.",
    },
  ];

  return (
    <section className="text-black py-16 bg-[#FBF5EF]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-[#3B6B4A] text-3xl font-bold text-center mb-2">
          Frequently Asked Questions
        </h2>
        <div className="w-16 h-1 bg-[#3B6B4A] mx-auto mb-12 rounded-full" />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border border-[#E8DFCF]/60 bg-[#FBF5EF]/30 rounded-lg [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-[#2C3A1E] font-semibold text-lg">
                {faq.question}
                <span className="shrink-0 rounded-full bg-[#EAF0EB] p-1.5 text-[#3B6B4A] sm:p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-[#5C6650] leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
