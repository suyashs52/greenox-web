import { useState } from "react";

const slides = [
  {
    title: "Grilled Chicken",
    subtitle: "Barbeque Sandwich",
    description:
      "Brown Bread, Barbecue Chicken, Bell Pepper,\nOnion, Lettuce, Black Olive",
    img: "/img/slider-1.png",
    user: {
      name: "Jitendra Mandal",
      avatar: "/img/profile.svg",
      rating: "4.5 ♥",
      likes: "1k+ Likes",
    },
  },
  // Add more slides here if needed
  {
    title: "Paneer Tikka",
    subtitle: "Veg Sandwich",
    description:
      "Brown Bread, Paneer Tikka, Bell Pepper,\nOnion, Lettuce, Black Olive",
    img: "/img/slider-1.png",
    user: {
      name: "Jitendra Mandal",
      avatar: "/img/user.png",
      rating: "4.8 ♥",
      likes: "2k+ Likes",
    },
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((current - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section className="slider_bg-color w-full">
      <div className="mx-auto flex w-full flex-col items-center gap-8 pl-12 md:flex-row">
        {/* Left Content */}
        <div className="flex-1 pl-0 text-left md:pl-[100px]">
          <h3 className="mb-2 pb-4 text-3xl text-orange-500">CHEF'S SPECIAL</h3>
          <h1 className="mb-4 text-4xl font-bold leading-normal text-gray-900 md:text-5xl md:leading-[70px]">
            {slide.title}
            <br />
            {slide.subtitle}
          </h1>
          <p className="fw-normal mb-6 whitespace-pre-line pt-4 text-gray-600">
            {slide.description}
          </p>
          <form className="mb-8 flex items-center">
            <input
              type="text"
              placeholder="Enter email or phone"
              className="rounded-l-full border border-r-0 border-gray-300 px-4 py-4 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-r-full border bg-orange-400 px-6 py-4 text-white transition hover:bg-orange-500"
            >
              GET START NOW
            </button>
          </form>
          <div className="mt-4 flex gap-4 pt-4">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-orange-500 transition hover:bg-orange-100"
              onClick={prevSlide}
              aria-label="Previous Slide"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-orange-500 transition hover:bg-orange-100"
              onClick={nextSlide}
              aria-label="Next Slide"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        {/* Right Image & Badges */}
        <div className="relative flex flex-1 items-center justify-center">
          <img
            src={slide.img}
            alt={slide.title + " " + slide.subtitle}
            className="w-full"
          />
          {/* Delivery Badge */}
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-green-700 shadow">
            <span className="text-xl">
              <img src="/img/delivery.svg" alt="delivery" />
            </span>
            <span className="text-sm font-semibold">Delivery In 30 Min</span>
          </div>
          {/* Location Badge */}
          <div className="boarder boarder border-orange absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white px-3 py-3 text-green-700 shadow">
            <span className="text-xl">
              <img src="/img/location.svg" alt="location" />
            </span>
            <span className="fs-bold ms-2 text-lg font-semibold">
              Location
              <br />
              <span className="text-sm font-semibold">at destination</span>
            </span>
          </div>
          {/* User Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-white px-6 py-4 shadow">
            <img
              src={slide.user.avatar}
              alt="User"
              className="h-6 w-6 rounded-full"
            />
            <span className="text-sm font-semibold">
              {slide.user.name}
              <br />
              <span className="">
                <span className="text-xs text-pink-500">
                  {slide.user.rating}
                </span>
                <span className="text-xs text-gray-500">
                  {slide.user.likes}
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
