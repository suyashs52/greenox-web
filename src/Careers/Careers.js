import React from "react";
import { Link } from "react-router-dom";

export const Careers = () => {
  // Add jobs data
  const jobs = [
    {
      title: "Nutrition Expert",
      description:
        "Help develop and review healthy meal plans and provide nutritional guidance to our users.",
    },
    {
      title: "Food Photography Specialist",
      description:
        "Create stunning visual content for our recipe library and marketing materials and marketing materials.",
    },
    {
      title: "Customer Success Manager",
      description:
        "Guide our users through their healthy eating journey and ensure their success with our platform.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with gradient background */}
      <div
        className="relative min-h-[600px] bg-gradient-to-r from-purple-900 via-blue-900 to-teal-800"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img/career.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlend: "overlay",
        }}
      >
        <div className="career_sec mx-auto max-w-6xl px-4 pt-52 text-center">
          <h1 className="career_h1 animate__animated animate__backInDown mb-6 text-5xl font-bold text-white">
            Join Our Team:
            <span className="bg-gradient-to-r from-green-500 via-green-500 to-green-500 bg-clip-text text-transparent">
              Exciting Career Opportunities
            </span>
          </h1>
          <p className="animate__animated animate__backInDown mb-12 px-24 text-lg leading-relaxed text-gray-200">
            Are you looking for a rewarding career where you can make a
            difference? Greenox Food Ltd is always on the lookout for talented
            individuals who share our passion for healthy food and
            sustainability. Explore our current job openings and discover how
            you can contribute to our mission and grow with our dynamic team.
          </p>
          <Link
            to="#openings"
            className="animate__animated animate__bounceIn inline-block rounded-md bg-orange-500 from-orange-500 to-yellow-500 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
          >
            Join us in shaping the future and elevate your career!
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* About Us */}
        <div className="mb-16">
          <p className="animate__animated animate__backInUp mb-8 text-lg leading-relaxed text-gray-700">
            At Greenox Food Ltd, we believe everyone should have access to
            nutritious, delicious food made with high-quality ingredients. Our
            platform and product lines are built around transparency,
            sustainability, and health-forward culinary innovation.
          </p>
        </div>

        {/* Why Work with Us */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Why Work with Us?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-700">
            Greenox is committed to creating healthy food options that delight
            customers while supporting responsible sourcing and reduced waste.
            Join a team that blends culinary expertise, nutrition science and
            sustainable operations.
          </p>
        </div>

        {/* Our Features - food related */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Our Features
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Farm-to-Table Sourcing
              </h3>
              <p className="text-gray-600">
                We partner with local farms and trusted suppliers to source
                fresh, seasonal ingredients — ensuring taste, traceability and
                support for local producers.
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Nutritionally Balanced Recipes
              </h3>
              <p className="text-gray-600">
                Our recipe development team and nutrition experts craft meals
                focused on balanced macronutrients, portion control and real
                food ingredients for better health outcomes.
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Quality & Sustainability
              </h3>
              <p className="text-gray-600">
                Greenox maintains strict quality and safety standards and uses
                sustainable packaging and practices to minimize environmental
                impact across our operations.
              </p>
            </div>
          </div>
        </div>

        {/* Current Openings */}
        <div id="openings">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Current Openings
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-3 text-xl font-semibold text-green-600">
                  {job.title}
                </h3>
                <p className="mb-4 text-gray-600">{job.description}</p>
                <button className="rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* How to Apply */}
        <div className="mt-16 rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            How to Apply
          </h2>
          <p className="text-gray-600">
            If you're excited about joining Greenox Food Ltd, please submit your
            resume to{" "}
            <a
              href="mailto:careers@greenox.com"
              className="text-green-600 hover:underline"
            >
              careers@greenox.com
            </a>{" "}
            with a brief description of your experience and why you'd be a great
            fit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
