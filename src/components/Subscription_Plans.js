import React from "react";
import { BiLock } from "react-icons/bi";
import { Link } from "react-router-dom";

const plans = [
  {
    duration: (
      <>
        <span>45</span>
        <span style={{ display: "block" }}>DAYS</span>
      </>
    ),
    originalPrice: "₹8970",
    discountedPrice: "₹7999",
    perMonth: "177 each day*",
    benefits: [
      { icon: "img/shopping_cart.svg", text: "Veg Meal 30 Meals" },
      { icon: "img/percent.svg", text: "Save ₹1971 instantly" },
      { icon: "img/calendar.svg", text: "Validity 45 days" },
      { icon: "img/chef_hat.svg", text: "Healthy balanced veg meals" },
      { icon: "img/clinical_notes.svg", text: "Delivered everyday fresh" },
      { icon: "img/lefttoright.svg", text: "Change or reschedule anytime" },
      { icon: "img/star.svg", text: "Save up to 50% on subscription" },
    ],
  },
  {
    duration: (
      <>
        <span>45</span>
        <span style={{ display: "block" }}>DAYS</span>
      </>
    ),
    originalPrice: "₹10470",
    discountedPrice: "₹8999",
    perMonth: "199 each day*",
    benefits: [
      { icon: "img/shopping_cart.svg", text: "Non Veg Meal 30 Meals" },
      { icon: "img/percent.svg", text: "Save ₹2471 instantly" },
      { icon: "img/calendar.svg", text: "Validity 45 days" },
      { icon: "img/chef_hat.svg", text: "Healthy non-veg meal box" },
      { icon: "img/clinical_notes.svg", text: "Delivered fresh daily" },
      { icon: "img/lefttoright.svg", text: "Change or reschedule anytime" },
      { icon: "img/star.svg", text: "Up to 50% off on subscription" },
    ],
  },
  {
    duration: (
      <>
        <span>80</span>
        <span style={{ display: "block" }}>DAYS</span>
      </>
    ),
    originalPrice: "₹17940",
    discountedPrice: "₹14999",
    perMonth: "187 each day*",
    benefits: [
      { icon: "img/shopping_cart.svg", text: "Veg Meal 60 Meals" },
      { icon: "img/percent.svg", text: "Save ₹4941 instantly" },
      { icon: "img/calendar.svg", text: "Validity 80 days" },
      { icon: "img/chef_hat.svg", text: "Healthy veg plan for 2 months" },
      { icon: "img/clinical_notes.svg", text: "Delivered fresh everyday" },
      { icon: "img/lefttoright.svg", text: "Change or reschedule anytime" },
      { icon: "img/star.svg", text: "Up to 50% savings" },
    ],
  },
  {
    duration: (
      <>
        <span>80</span>
        <span style={{ display: "block" }}>DAYS</span>
      </>
    ),
    originalPrice: "₹20940",
    discountedPrice: "₹16999",
    perMonth: "212 each day*",
    benefits: [
      { icon: "img/shopping_cart.svg", text: "Non-Veg Meal 60 Meals" },
      { icon: "img/percent.svg", text: "Save ₹4941 instantly" },
      { icon: "img/calendar.svg", text: "Validity 80 days" },
      { icon: "img/chef_hat.svg", text: "Healthy veg plan for 2 months" },
      { icon: "img/clinical_notes.svg", text: "Delivered fresh everyday" },
      { icon: "img/lefttoright.svg", text: "Change or reschedule anytime" },
      { icon: "img/star.svg", text: "Up to 50% savings" },
    ],
  },
];

const Subscription_Plans = () => {
  return (
    <div className="Subscription_Plans wfull px-2">
      {/* Plans */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg bg-gradient-to-b from-green-500 to-green-600 p-6 text-white shadow transition hover:shadow-lg"
          >
            <div className="flex justify-between">
              <h1 className="MONTHS mb-2 pt-4 text-center text-xl font-semibold uppercase tracking-wider">
                {plan.duration}
              </h1>
              <div className="amount mb-2">
                <span className="text-gray-200 line-through">
                  {plan.originalPrice}
                </span>
                <span className="text-3xl font-bold">
                  {plan.discountedPrice}
                </span>
                <span className="mb-4 text-xs text-gray-200">
                  {plan.perMonth}
                </span>
              </div>
            </div>

            <ul className="mb-4 space-y-2 text-sm text-white">
              {plan.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2 py-1">
                  {benefit.icon.endsWith(".svg") ||
                  benefit.icon.endsWith(".png") ? (
                    <img src={`/${benefit.icon}`} alt="" className="h-5 w-5" />
                  ) : (
                    <span className="text-lg">{benefit.icon}</span>
                  )}
                  {benefit.text}
                </li>
              ))}
            </ul>
            <Link
              to="/subcriptiondestails"
              state={{
                plan: {
                  duration:
                    plan.duration && typeof plan.duration === "string"
                      ? plan.duration
                      : `${plan.duration?.props?.children?.[0]?.props?.children || ""} ${plan.duration?.props?.children?.[1]?.props?.children || ""}`.trim(),
                  originalPrice: plan.originalPrice,
                  discountedPrice: plan.discountedPrice,
                  perMonth: plan.perMonth,
                  benefits: plan.benefits,
                },
              }}
              className="mt-2 mt-auto w-full rounded bg-orange-400 px-4 py-4 text-center font-semibold text-white transition hover:bg-orange-500"
            >
              SUBSCRIBE NOW
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription_Plans;
