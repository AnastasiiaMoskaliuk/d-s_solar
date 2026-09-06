const advantages = [
  {
    icon: "☀",
    title: "Nachhaltig",
    description: "Saubere Energie für eine bessere Zukunft.",
  },
  {
    icon: "✅",
    title: "Zuverlässig",
    description: "Qualität und professionelle Umsetzung.",
  },
  {
    icon: "⚡",
    title: "Effizient",
    description: "Moderne Lösungen für weniger Energiekosten.",
  },
  {
    icon: "❤️",
    title: "Persönlich",
    description: "Individuelle Beratung für Ihre Bedürfnisse.",
  },
];

const ÜberUnsSection = () => {
  return (
    <section
      id="ueber-uns"
      className="relative overflow-hidden bg-white py-[80px] px-[20px] lg:py-[120px] lg:px-[60px]"
    >
      <div className="relative mx-auto ">
        <div className="mb-[60px] text-center">
          <h2 className="text-[36px] font-[700] leading-[1.1] text-onyx md:text-[48px]">
            Energie für heute.
            <br />
            <span className="text-[#154b4b]">Verantwortung für morgen.</span>
          </h2>
          <p className="mx-auto mt-[20px] max-w-[750px] text-[16px] leading-[28px] text-gray-600">
            Wir begleiten Sie auf dem Weg zu einer nachhaltigen und unabhängigen
            Energieversorgung – von der ersten Beratung bis zur fertigen
            Solaranlage.
          </p>
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:gap-[100px]">
          <div className=" max-w-[500px]  text-center lg:text-start">
            <h3 className="mb-[20px] text-[28px] font-[700] leading-[1.2] text-onyx">
              Wir machen Solarenergie
              <span className="text-[#154b4b]"> einfach.</span>
            </h3>
            <p className="mb-[20px] text-[16px] leading-[28px] text-gray-600">
              Willkommen bei D&S Solar! Wir sind ein engagiertes Team von
              Expertinnen und Experten, das sich auf die Planung und
              Installation moderner Solarsysteme spezialisiert hat.
            </p>
            <p className="mb-[35px] text-[16px] leading-[28px] text-gray-600">
              Unser Anspruch ist es, nachhaltige Energie für jeden zugänglich zu
              machen. Dabei setzen wir auf zuverlässige Lösungen, transparente
              Beratung und eine fachgerechte Installation.
            </p>
          </div>
          <div className="grid gap-[15px] sm:grid-cols-2">
            {advantages.map((item) => (
              <div
                key={item.title}
                className="rounded-[18px] border border-gray-100 bg-[#f8faf9] p-[20px] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg hover:shadow-lightGreen/50"
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
      </div>
    </section>
  );
};

export default ÜberUnsSection;
