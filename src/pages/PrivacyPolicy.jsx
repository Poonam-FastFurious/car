import React from "react";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "info-collection",
      title: "1. Information We Collect",
      content: [
        "Personal Info: Name, mobile number, email, and payment information.",
        "Travel Details: Pickup, drop, date, time.",
        "Device & Location Info: For service enhancement.",
      ],
    },
    {
      id: "data-use",
      title: "2. How We Use Your Data",
      content: [
        "Match your trip request with suitable drivers.",
        "Send notifications (SMS, WhatsApp, email).",
        "Customer support and feedback.",
        "Analytics to improve platform performance.",
      ],
    },
    {
      id: "data-sharing",
      title: "3. Data Sharing",
      content: [
        "We share your trip details with assigned drivers only.",
        "We do not sell your data to third parties.",
        "We may share data with legal authorities if required by law.",
      ],
    },
    {
      id: "data-security",
      title: "4. Data Security",
      content: [
        "Your data is stored in secure servers with encryption protocols.",
        "We follow best practices to prevent data loss, misuse, or unauthorized access.",
      ],
    },
    {
      id: "user-control",
      title: "5. User Control",
      content: [
        "You may edit or delete your account at any time.",
        "You can opt out of marketing messages.",
      ],
    },
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last updated: [12/08/2025]</p>
          <p className="mt-4 text-gray-600">
            IntraRoutes respects your privacy and is committed to protecting your personal data. 
            This Privacy Policy outlines how we collect, use, and secure your information.
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

        {/* Back to Top */}
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

export default PrivacyPolicy;
