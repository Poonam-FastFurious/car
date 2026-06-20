import React from "react";

const TermsConditions = () => {
  const sections = [
    {
      id: "service-scope",
      title: "1. Service Scope",
      content: [
        "IntraRoutes acts as an intermediary between passengers and verified independent drivers.",
        "We facilitate bookings, pricing, and communication but do not operate any vehicles ourselves.",
      ],
    },
    {
      id: "booking-process",
      title: "2. Booking Process",
      content: [
        "Passengers create a trip request.",
        "Drivers bid with fare offers.",
        "Passenger selects the preferred bid.",
        "Bookings are only confirmed after passenger approval and, if applicable, payment.",
      ],
    },
    {
      id: "driver-verification",
      title: "3. Driver Verification",
      content: [
        "All drivers on the platform are vetted with valid ID, vehicle documents, insurance, and license.",
        "Ratings and feedback systems are used to maintain quality.",
      ],
    },
    {
      id: "user-responsibilities",
      title: "4. User Responsibilities",
      content: [
        "Users must provide accurate information.",
        "Misuse of the platform or false bookings may lead to account suspension.",
      ],
    },
    {
      id: "payment-terms",
      title: "5. Payment Terms",
      content: [
        "Payment may be made online or to the driver at the time of pickup.",
        "IntraRoutes may charge a small convenience/service fee for some bookings.",
      ],
    },
    {
      id: "cancellation",
      title: "6. Cancellation & Refunds",
      content: [
        "See separate Cancellation Policy for applicable charges and timelines.",
      ],
    },
    {
      id: "liability",
      title: "7. Liability",
      content: [
        "IntraRoutes is not liable for delays, driver behavior, vehicle condition, or service disruption caused by third-party drivers.",
        "We strive to maintain standards via our verification and review systems.",
      ],
    },
    {
      id: "platform-use",
      title: "8. Platform Use",
      content: [
        "Users agree not to engage in scraping, misuse, or illegal activity on our platform.",
        "IntraRoutes retains the right to suspend or terminate accounts violating these terms.",
      ],
    },
    {
      id: "modifications",
      title: "9. Modifications",
      content: [
        "We reserve the right to modify these terms at any time. Continued use indicates acceptance.",
      ],
    },
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Terms & Conditions</h1>
          <p className="text-sm text-gray-500">Last updated: [12/08/2025]</p>
          <p className="mt-4 text-gray-600">
            These Terms & Conditions govern your use of the website{" "}
            <a
              href="https://www.intraroutes.com"
              className="text-indigo-600 hover:underline"
            >
              www.intraroutes.com
            </a>{" "}
            and the services provided by IntraRoutes. By accessing or using our platform, you
            agree to these terms.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="border-b border-gray-100 pb-6">
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

export default TermsConditions;
