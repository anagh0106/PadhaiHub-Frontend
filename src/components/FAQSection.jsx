import React from "react";

export default function FAQSection() {
    const faqs = [
        {
            question: "What are your class timings?",
            answer:
                "We offer flexible timings including morning (9 AM – 12 PM), afternoon (2 PM – 5 PM), and evening (6 PM – 9 PM) batches to accommodate different schedules.",
        },
        {
            question: "Do you provide study materials?",
            answer:
                "Yes, we provide comprehensive study materials, practice papers, and digital resources for all subjects included in your course package.",
        },
        {
            question: "What is your fee structure?",
            answer:
                "Our fees range from ₹8,000–₹12,000 per month depending on the course. We offer flexible payment options and sibling discounts.",
        },
        {
            question: "Can I attend a demo class?",
            answer:
                "Absolutely! We offer free demo classes so you can experience our teaching methodology before enrollment. Book your demo today.",
        },
    ];

    return (
        <section className="bg-[#0f172a] text-white px-6 py-16 sm:px-10 md:px-20 rounded-xl max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-10">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                    🔹 Common Questions
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-300 text-center max-w-2xl">
                    Quick answers to questions you may have about our courses and enrollment process
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-[#1e293b] border border-gray-700 p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
                    >
                        <h3 className="text-lg font-semibold mb-2">
                            {faq.question}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
