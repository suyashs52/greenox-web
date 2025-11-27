import React from "react";
import { useLocation, Link } from "react-router-dom";

const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const offerList = [
  "Extra ₹1500 off applied T&C",
  "Free Nutrition Consultation (Two 1:1 Dietitian Sessions)",
];
const aboutList = [
  "10 days of meal delivery pause",
  "Access to 15 cuisines in other cities",
  "1000+ recipe videos",
  "₹500 OFF on kitchen essentials",
  "Free meal plan transfer within 15 days",
];
const meals = [
  {
    label: "Salads",
    img: "/img/menu/Extravaganza Veggies Salad.jpg",
  },
  {
    label: "Meal",
    img: "/img/Soya.jpg",
  },
  {
    label: "Sandwich",
    img: "/img/Sandwich.jpg",
  },
];

export default function SubscriptionDetails() {
  const location = useLocation();
  const selectedPlan = location.state?.plan || null;

  // extract duration text from plan.duration JSX
  const getDurationText = () => {
    return selectedPlan?.duration || "Selected Plan";
  };

  return (
    <div
      className="mt-12 min-h-screen bg-[#fafbfc] px-4 py-8 pt-12"
      style={{
        backgroundImage: "url('img/subscription3.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        backgroundPosition: "top center",
      }}
    >
      <div className="mx-auto mt-12 flex max-w-7xl flex-col overflow-hidden md:flex-row">
        {/* Left: Images */}
        <div className="flex flex-col gap-4 p-6 md:w-1/3">
          {/* <img
            src="/menuimg/herosection2.avif"
            alt="Meal Plan"
            className="h-100 w-full rounded-lg object-cover"
          /> */}
        </div>

        {/* Right: Details */}
        <div className="flex flex-col p-6 md:w-2/3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">
              <span className="text-green-500">{getDurationText()} </span>
              {/* <span className="pl-24">{selectedPlan.perMonth}</span> */}
            </h2>
            <div className="flex flex-col items-end">
              <span className="text-lg text-gray-400 line-through">
                {selectedPlan.originalPrice}
              </span>
              <span className="text-2xl font-bold text-gray-800">
                {selectedPlan.discountedPrice}
              </span>
              <button className="mt-2 rounded bg-green-500 px-6 py-2 font-semibold text-white transition hover:bg-green-600">
                Get Plan
              </button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-2 font-semibold">Benefits</h3>
            <ul className="space-y-1">
              {selectedPlan.benefits?.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">
                    {" "}
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {benefit.text}
                </li>
              ))}
            </ul>
          </div>
          {/* Offer */}
          <div className="mt-4">
            <div className="mb-1 font-semibold">Offer</div>
            <ul className="mb-2">
              {offerList.map((item, i) => (
                <li
                  key={i}
                  className="mb-1 flex items-center gap-2 text-green-600"
                >
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* About this plan */}
          <div>
            <div className="mb-1 font-semibold">About this plan</div>
            <ul className="mb-2">
              {aboutList.map((item, i) => (
                <li
                  key={i}
                  className="mb-1 flex items-center gap-2 text-green-600"
                >
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Cancellation */}
          <div>
            <div className="mb-1 font-semibold">Cancellation & No Shows</div>
            <ul>
              <li className="mb-1 flex items-center gap-2 text-green-600">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-700">
                  Cancellation of your scheduled meals
                </span>
              </li>
            </ul>
          </div>
          {/* How it works */}
          <div className="mt-4">
            <div className="mb-1 font-semibold">How it works</div>
            <p className="mb-2 text-sm text-gray-600">
              Order unlimited Meals anytime at any location in your city for 3
              months. Every NutriPlan kitchen offers a plethora of healthy meal
              options designed and prepared by highly qualified nutrition
              experts. These meals are great for weight loss and fitness
              enthusiasts alike, and are guaranteed to deliver results.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="rounded bg-orange-400 px-2 py-1 font-bold text-white">
                  1
                </span>
                <span className="font-semibold text-gray-700">
                  Meal kitchens:
                </span>
                <span className="text-gray-600">
                  Choose a meal that you like. Visit the kitchen on time and
                  enjoy your meal
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-green-500 px-2 py-1 font-bold text-white">
                  2
                </span>
                <span className="font-semibold text-gray-700">Delivery:</span>
                <span className="text-gray-600">
                  Visit a meal kitchen at any time, check-in via your phone and
                  enjoy your meal
                </span>
              </div>
            </div>
          </div>
          {/* Meals */}
          <div className="mt-6">
            <div className="mb-2 font-semibold">Meals</div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {meals.map((meal, i) => (
                <Link
                  key={i}
                  to={`/menu/${slugify(meal.label)}`}
                  className="group relative block overflow-hidden rounded-xl shadow"
                  aria-label={`Open ${meal.label} menu`}
                >
                  <img
                    src={meal.img}
                    alt={meal.label}
                    className="h100 w-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded bg-black/60 px-3 py-1 text-white">
                    <svg
                      className="h-5 w-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path
                        d="M9 12l2 2 4-4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-semibold">{meal.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
