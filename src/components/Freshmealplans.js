import React from "react";
import Subscription_Plans from "./Subscription_Plans";
import FreshMealPlansHeading from "./FreshMealPlansHeading";

const features = [
  {
    icon: (
      <img
        src="/img/discount.svg"
        className="w50 mx-auto"
        alt="Fresh Ingredients"
      />
    ),
    title: "Save up to 50% on",
    desc: "Every Subscription",
  },
  {
    icon: (
      <img src="/img/custom.svg" className="w50 mx-auto" alt="Custom Plans" />
    ),
    title: "Custom Plans",
    desc: "tailored for you",
  },
  {
    icon: (
      <img
        src="/img/Reschedule.svg"
        className="w50 mx-auto"
        alt="Nutritionist"
      />
    ),
    title: "Change, Reschedule ",
    desc: "Anytime you want",
  },
  {
    icon: (
      <img
        src="/img/local_shipping.svg"
        className="w50 mx-auto"
        alt="Free Delivery"
      />
    ),
    title: "Healthy meals ",
    desc: "Delivered Everyday",
  },
];

const Freshmealplans = () => {
  return (
    <div className=" px-2 py-12">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mx-auto w-full max-w-2xl text-center">
          {/* <h1 className="animate__animated animate__backInDown mb-2 text-4xl font-bold text-green-600 md:text-5xl">
            Fresh Meal Plans
          </h1> */}
          <FreshMealPlansHeading />
          <p className="animate__animated animate__backInDown text-gray-600">
            Healthy Balance Meal Box For Everyday You can’t exercise your way
            out of a bad diet <br />
            (Visuals show salad bowl with vitamins and nutrients like B6, B9, C,
            PP, E, B1, A, N, D)
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto mb-10 mt-10 grid max-w-4xl grid-cols-2 gap-4 text-center text-sm text-gray-600 md:grid-cols-4">
        {features.map((feature, index) => (
          <div className="grid gap-2" key={index}>
            <span className="animate-bounce">{feature.icon}</span>
            <div className="font-semibold text-green-700">{feature.title}</div>
            <div className="text-xs text-gray-500">{feature.desc}</div>
          </div>
        ))}
      </div>

      {/* Plans */}
      <Subscription_Plans />
    </div>
  );
};

export default Freshmealplans;
