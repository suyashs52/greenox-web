import React from "react";
import "animate.css";
import { Link } from "react-router-dom";
import { OurHistory } from "../components/OurHistory";

const team = [
  {
    name: "Mr. Narendra Savita",
    role: "Co-Founder",
    img: "/img/narendra.jpeg",
    desc: "Narendra Savita is the CEO of greeNox, steering the company with strategic vision and calm leadership. Known for his thoughtful decision-making and quick execution, he balances patience with agility. A passionate reader, Narendra brings both analytical depth and personal discipline to his role—having successfully followed the Ketogenic diet and shed 20 kgs himself.",
  },
  {
    name: "Mr. Ashwani Tiwari",
    role: "Co-Founder",
    img: "/img/ashwani.jpg",
    desc: "Narendra Savita is the CEO of greeNox, steering the company with strategic vision and calm leadership. Known for his thoughtful decision-making and quick execution, he balances patience with agility. A passionate reader, Narendra brings both analytical depth and personal discipline to his role—having successfully followed the Ketogenic diet and shed 20 kgs himself.",
  },
  {
    name: "Mr. Ashwani Tiwari",
    role: "Co-Founder",
    img: "/img/ashwani.jpg",
    desc: "Narendra Savita is the CEO of greeNox, steering the company with strategic vision and calm leadership. Known for his thoughtful decision-making and quick execution, he balances patience with agility. A passionate reader, Narendra brings both analytical depth and personal discipline to his role—having successfully followed the Ketogenic diet and shed 20 kgs himself.",
  },
  {
    name: "Mr. Narendra Savita",
    role: "Co-Founder",
    img: "/img/narendra.jpeg",
    desc: "Narendra Savita is the CEO of greeNox, steering the company with strategic vision and calm leadership. Known for his thoughtful decision-making and quick execution, he balances patience with agility. A passionate reader, Narendra brings both analytical depth and personal discipline to his role—having successfully followed the Ketogenic diet and shed 20 kgs himself.",
  },
];

export default function About() {
  return (
    <div className="mt-12 pt-12">
      <img
        src="img/aboutbg.svg"
        alt="About Background"
        className="h-300 absolute left-0 top-0 -z-10 w-full rounded-lg object-cover"
      />
      {/* Hero Section */}
      <section className="relative mx-auto mb-8 mt-8 flex max-w-7xl flex-col px-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="animate__animated animate__backInDown mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
            Making the world a healthier place with GreeNox
          </h1>
          <h1 className="d-inline-block animate__animated animate__backInLeft mb-4 mt-4 text-2xl font-bold text-orange-500 md:text-3xl">
            One meal at a time!
          </h1>
          {/* Fixed width cards */}
          <div className="about_cards animate__animated animate__bounceIn mb-8 mt-12 flex gap-6">
            <div className="w-100 w100 flex flex-col items-center rounded-lg bg-white px-8 py-6 shadow">
              <span className="text-2xl font-semibold text-orange-500">
                100k +
              </span>
              <span className="mt-1 text-center text-xs text-gray-500">
                Customers served till now
              </span>
            </div>
            <div className="w-100 w100 flex flex-col items-center rounded-lg bg-white px-8 py-6 shadow">
              <span className="text-2xl font-semibold text-orange-500">
                10 %
              </span>
              <span className="mt-1 text-center text-xs text-gray-500">
                Avg weight loss per person
              </span>
            </div>
            <div className="w100 flex w-48 flex-col items-center rounded-lg bg-white px-8 py-6 shadow">
              <span className="text-2xl font-semibold text-orange-500">2</span>
              <span className="mt-1 text-center text-xs text-gray-500">
                Cities
              </span>
            </div>
          </div>
          <Link
            to="/subscription"
            className="inline-block rounded border-2 border-yellow-300 bg-yellow-400 px-4 py-2 font-semibold text-gray-800 shadow transition hover:bg-yellow-300"
          >
            Get Started
          </Link>
        </div>
      </section>
      <OurHistory />
      {/* Journey Section */}
      <section className="Join_Our_Team mx-auto mb-8 flex max-w-7xl flex-col gap-8 rounded-lg bg-white px-6 py-8 shadow md:flex-row">
        <div className="relative flex min-h-[320px] flex-1 items-center justify-center overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/img/greenox-poster.jpg"
            className="absolute inset-0 z-0 h-full w-full object-cover"
            style={{ width: "100%", borderRadius: "0.5rem" }}
          >
            <source
              src="https://greenox.in/wp-content/uploads/2025/04/you-are-what-you-eat.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-orange-500">
            Our Journey
          </h3>
          <p className="text-sm text-gray-700">
            The Journey of GreeNox Started in 2016 by Two Engineering Graduate
            with an idea to provide healthy snacking with the aim of catering to
            your craving without compromising on your holistic well being. Our
            first restaurant was opened in Sep 2016 as healthy food restaurant.
            The Beginnings concept has grown into a small restaurant chain. Now,
            in 2025 The Beginnings has 16 Outlets and healthy food production.
            Our restaurant type is fast-casual – mash-up of Healthy food and
            casual dining. It has been strongest segment in the restaurant
            industry over the post pandemic time.
          </p>
          <p className="mt-4 text-sm text-gray-700">
            We offer most trendy and fast-growing Healthy cuisine concept
            focused on longevity – with mostly plant based menu. This Concept is
            perfectly suited food for people interested in health-longevity,
            fitness, sustainable, green food prepared in clean and hygienic
            environment. while you explore your love for food, we take care to
            supplement your fitness & nutrients concerns. The Food we serve is
            highly rich in energy and nutrients so that your immune system
            excels with radiant energy. Apart from food our outlet provides you
            homely environment live music free WI-FI sports TV. Be it your
            breakfast or late night dinner, family outings or parties Team
            GreeNox Welcome you to a memorable sojourn into the world of food.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="Join_Our_Team mx-auto mb-8 max-w-7xl rounded-md bg-white px-6 py-8 shadow">
        <h2 className="mb-6 text-lg font-semibold text-orange-500">Our Team</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {team.map((member, idx) => (
            <div key={idx} className="flex gap-4">
              <img
                src={member.img}
                alt={member.name}
                className="h-30 w-24 rounded object-cover shadow"
              />
              <div>
                <div className="font-bold text-gray-900">{member.name}</div>
                <div className="mb-1 text-sm text-gray-600">{member.role}</div>
                <div className="text-xs text-gray-700">{member.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Work & Footer Section */}
      <section className="Join_Our_Team mx-auto mb-8 flex max-w-7xl flex-col rounded-lg bg-white px-0 py-0 shadow md:flex-row">
        <div className="flex-1">
          <img
            src="img/outteam.jpeg"
            alt="outteam"
            className="h-full w-full rounded-l-lg object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center rounded-r-lg bg-green-800 p-8 text-white">
          <h4 className="mb-2 text-lg font-semibold">Work At GreeNox</h4>
          <p className="mb-4 text-sm">
            Join our team and discover how to make an impact. Contact us on
            hr@greenox.com.
          </p>
          <button className="w-fit rounded border border-white px-4 py-2 text-white transition hover:bg-white hover:text-gray-800">
            Join Our Team
          </button>
        </div>
      </section>

      {/* Contact/Questions Section */}
      <footer className="d-flex justify-center justify-items-center bg-green-900 py-8 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 px-4 md:flex-row">
          <div className="mb-4 md:mb-0">
            <div className="mb-2 text-lg font-semibold">
              Having more questions?
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6 text-sm md:flex-row">
            <div>
              <div className="mb-1">
                📞 Call on{" "}
                <span className="text-yellow-400">+91 9590 510 520</span>
              </div>
              <div>
                Mail at{" "}
                <span className="text-yellow-400">inquiries@greenox.com</span>
              </div>
            </div>
            <div>
              <div>For complaints or feedback, email us at</div>
              <div className="text-yellow-400">feedback@greenox.com</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
