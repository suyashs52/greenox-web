import React, { useState } from "react";

const tabData = [
  {
    label: "BURGERS & WRAPS",
    content: {
      title: "Veg Surprise Burger",
      subtitle: "A surprise that will leave you wide-eyed.",
      description:
        "A scrumptious potato patty topped with delectable Italian herbs, fresh cut veggies and delicious sauces placed between perfectly toasted buns.",
      serving: "Serving Size: 130g",
      allergen: "Allergen Warning/ Contains:",
      cereal: "Cereal containing gluten, Milk, Soya",
      img: "/img/burger1.svg",
      features: [
        { icon: "🍽️", label: "Weekly Recipes", desc: "Fresh ideas delivered" },
        { icon: "🎁", label: "Exclusive Offers", desc: "Special discounts" },
        { icon: "💡", label: "Health Tips", desc: "Nutrition advice" },
      ],
    },
  },
  {
    label: "SNACKS & SIDES",
    content: {
      title: "French Fries",
      subtitle: "Crispy and golden perfection.",
      description:
        "Classic potato fries, lightly salted and fried to a golden crisp. The perfect side for any meal.",
      serving: "Serving Size: 100g",
      allergen: "Allergen Warning/ Contains: None",
      img: "/img/Sandwich2.svg",
      features: [
        { icon: "🍽️", label: "Weekly Recipes", desc: "Fresh ideas delivered" },
        { icon: "🎁", label: "Exclusive Offers", desc: "Special discounts" },
        { icon: "💡", label: "Health Tips", desc: "Nutrition advice" },
      ],
    },
  },
  {
    label: "DESSERTS",
    content: {
      title: "Chocolate Brownie",
      subtitle: "Rich and decadent treat.",
      description:
        "A moist chocolate brownie made with premium cocoa and topped with chocolate chips.",
      serving: "Serving Size: 80g",
      allergen: "Allergen Warning/ Contains: Milk, Eggs, Wheat",
      img: "/img/jush.svg",
      features: [
        { icon: "🍽️", label: "Weekly Recipes", desc: "Fresh ideas delivered" },
        { icon: "🎁", label: "Exclusive Offers", desc: "Special discounts" },
        { icon: "💡", label: "Health Tips", desc: "Nutrition advice" },
      ],
    },
  },
  {
    label: "BEVERAGES",
    content: {
      title: "Fresh Lemonade",
      subtitle: "Cool and refreshing.",
      description:
        "A tangy blend of fresh lemons, sugar, and water served chilled.",
      serving: "Serving Size: 250ml",
      allergen: "Allergen Warning/ Contains: None",
      img: "/img/salad.svg",
      features: [
        { icon: "🍽️", label: "Weekly Recipes", desc: "Fresh ideas delivered" },
        { icon: "🎁", label: "Exclusive Offers", desc: "Special discounts" },
        { icon: "💡", label: "Health Tips", desc: "Nutrition advice" },
      ],
    },
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const {
    title,
    subtitle,
    description,
    serving,
    allergen,
    cereal,
    img,
    features,
  } = tabData[activeTab].content;

  return (
    // ensure base font-size is 1rem and layout stacks on mobile (tabs full-width)
    <section
      className="relative w-full bg-white py-8 text-base" // text-base = 1rem
      id="target-section"
      style={{
        backgroundImage: "url('/img/tabg.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top left",
      }}
    >
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-8 px-4 md:flex-row">
        {/* Left: Tabs and Content */}
        <div className="w-full flex-1">
          {/* Tabs - stacked on mobile (100% width each), row from sm/md up */}
          <div className="mb-6 w-full">
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-start">
              {tabData.map((tab, idx) => {
                const active = activeTab === idx;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(idx)}
                    // full width on mobile, text-size 1rem (text-base)
                    className={`w-full rounded px-3 py-2 text-left text-base transition sm:w-auto sm:text-center ${
                      active
                        ? "border-b-2 border-green-500 text-green-600"
                        : "border-b-2 border-transparent text-gray-700 hover:text-green-500"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="bggreen mb-4 inline-block rounded-lg px-6 py-2 text-green-700">
            {title}
          </div>
          <h4 className="mb-2 italic text-green-600"> {subtitle}</h4>
          <p className="mb-4 pb-4 text-gray-600">{description}</p>
          <div className="mb-2 mt-6 font-semibold">{serving}</div>
          <div className="fw-bold text-lg text-green-700">{allergen}</div>
          <div className="mb-4 text-sm text-gray-600">{cereal}</div>
          <div className="mb-6 mt-6 flex gap-4 pt-4">
            <button className="order_now rounded-full bg-green-500 px-4 py-2 text-white transition hover:bg-green-600">
              ORDER NOW
            </button>
            <button className="know_more rounded-full border-2 border-dashed border-green-500 bg-white px-4 py-2 text-green-500 transition hover:bg-green-50">
              Know More
            </button>
          </div>
          {/* Features */}
          <div className="mt-6 flex flex-wrap gap-8 pt-4">
            {features.map((f) => (
              <div
                key={f.label}
                className="nthchild mt-6 flex flex-col items-center pt-4"
              >
                <span className="weekly mb-2 text-3xl">{f.icon}</span>
                <span className="font-semibold">{f.label}</span>
                <span className="text-xs text-gray-500">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex w-full flex-1 items-center justify-center">
          <img
            src={img}
            alt={title}
            className="w-100 h-100 object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
