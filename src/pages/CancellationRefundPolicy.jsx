import React from "react";

const CancellationRefundPolicy = () => {
  const sections = [
    {
      id: "for-customers",
      title: "1. For Customers",
      content: [
        "Cancellation before driver confirmation: No charges.",
        "After confirmation but before 2 hours of pickup: 10% of trip amount or ₹200 (whichever is higher).",
        "Within 2 hours of pickup: 50% charge applies.",
        "No-show: Full fare will be charged.",
      ],
    },
    {
      id: "for-drivers",
      title: "2. For Drivers",
      content: [
        "Drivers who cancel accepted bookings may be penalized or temporarily suspended after repeated offenses.",
      ],
    },
    {
      id: "refund-timeline",
      title: "3. Refund Timeline",
      content: [
        "Refunds (if applicable) will be processed within 5–7 working days to the original payment method.",
      ],
    },
    {
      id: "force-majeure",
      title: "4. Force Majeure",
      content: [
        "IntraRoutes is not responsible for cancellations due to weather, strikes, accidents, or law enforcement interventions.",
      ],
    },
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">
            Cancellation & Refund Policy
          </h1>
          <p className="text-sm text-gray-500">Last updated: [12/08/2025]</p>
          <p className="mt-4 text-gray-600">
            We understand that plans change. Here's how cancellations and
            refunds work on{" "}
            <span className="font-semibold">IntraRoutes</span>.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="border-b border-gray-100 pb-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {section.title}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {section.content.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </section>
        ))}

        {/* Back to Top Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-5 py-2 rounded-full custom-blue  text-white text-sm font-medium shadow-sm transition"
          >
            Back to Top ↑
          </button>
        </div>
      </main>
    </div>
  );
};

export default CancellationRefundPolicy;
