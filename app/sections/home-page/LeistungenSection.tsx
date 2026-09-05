const leistungen = [
  {
    icon: "☀",
    title: "Solaranlagen",
    description:
      "Wir planen und installieren moderne Solaranlagen, die optimal auf Ihr Gebäude und Ihren individuellen Energiebedarf abgestimmt sind. So können Sie Sonnenenergie effizient nutzen und langfristig Energiekosten sparen.",
  },
  {
    icon: "🔧",
    title: "Wartung & Support",
    description:
      "Damit Ihre Solaranlage zuverlässig und effizient arbeitet, bieten wir regelmäßige Wartung und einen umfassenden technischen Support. Wir überprüfen die Anlage und helfen Ihnen schnell bei Fragen oder Problemen.",
  },
  {
    icon: "📊",
    title: "Energieberatung",
    description:
      "Wir analysieren Ihren Energiebedarf und entwickeln gemeinsam mit Ihnen eine passende Lösung. Dabei zeigen wir Ihnen Möglichkeiten, wie Sie Ihren Energieverbrauch optimieren und Ihre Unabhängigkeit von steigenden Stromkosten erhöhen können.",
  },
];

const LeistungenSection = () => {
  return (
    <section
      id="leistungen"
      className="relative overflow-hidden bg-white py-[80px] px-[20px] lg:py-[120px] lg:px-[60px]"
    >
      <div className="relative mx-auto ">
        <div className="mb-[60px] text-center">
          <h2 className="text-[36px] font-[700] leading-[1.1] text-onyx md:text-[48px]">
            Unsere
            <span className="text-[#154b4b]"> Leistungen</span>
          </h2>
          <p className="mx-auto mt-[20px] max-w-[750px] text-[16px] leading-[28px] text-gray-600">
            Entdecken Sie unsere umfassenden Dienstleistungen für eine nachhaltige
            Energieversorgung.
          </p>
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:justify-center gap-[50px] lg:gap-[100px]">
          {leistungen.map((item) => (
            <div
              key={item.title}
              className="rounded-[18px] border border-lightGreen bg-[#f8faf9] p-[20px] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg hover:shadow-lightGreen/50"
            >
              <div className="mb-[12px] flex h-[42px] w-[42px] items-center justify-center rounded-full bg-lightGreen text-[20px]">
                {item.icon}
              </div>

              <h4 className="mb-[6px] text-[17px] font-[700] text-onyx">
                {item.title}
              </h4>

              <p className="text-[14px] leading-[22px] text-gray-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeistungenSection;
