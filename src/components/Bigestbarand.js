import React from "react";

const BiggestBrands = () => {
  const brands = [
    { name: "christ", logo: "/img/christ.png" },
    { name: "mangalmay", logo: "/img/mangalmay.png" },
    { name: "amity", logo: "/img/amity.png" },
    { name: "shivnadar", logo: "/img/shivnadar.png" },
    { name: "ashoka", logo: "/img/ashoka.png" },
  ];

  return (
    <section className="Our_Presence py-16">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Heading */}
        <h2 className="mb-8 text-center text-5xl font-bold text-green-500">
          Our Presence
        </h2>

        {/* Subheading */}
        <h3 className="mb-12 text-center text-2xl text-gray-800">
          Over the years, we have expanded our presence across various
          institutions and corporate offices. We’ve had the privilege of serving
          and receiving love from over 4,000 students and 1,000 employees, all
          of whom appreciate the care and fresh ingredients that go into every
          meal we prepare.
        </h3>

        {/* Brands Logo Grid */}
        <div className="gap2 mx-auto mb-12 flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-16 w-40 items-center justify-center"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-auto w-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <p className="text-lg text-gray-800">
            For Corporate Catering Enquiries Call us at{" "}
            <a
              href="tel:+91 7078548120"
              className="font-semibold text-green-600 hover:underline"
            >
              +91 7078548120
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default BiggestBrands;
