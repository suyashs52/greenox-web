import React, { useState, useEffect } from "react";

const FreshMealPlansHeading = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const words = [
    { text: "Balanced Meal", className: "text-[#16a049]" },
    { text: "Fruit Bowl", className: "text-[#000]" },
    { text: "Mega Healthy", className: "text-[#16a049]" },
    { text: "Ultra Fresh", className: "text-[#FF9800]" },
    { text: "Sprout Bowl", className: "text-[#16a049]" },
    { text: "White Egg Bowl", className: "text-[#FF9800]" },
    { text: "Signature Egg Bowl", className: "text-[#16a049]" },
    { text: "Grilled Chicken", className: "text-[#FF9800]" },
    { text: "Chipotle Chicken", className: "text-[#16a049]" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mobile_view_plan relative mb-4 flex w-full items-center justify-end overflow-hidden">
      <div className="animate__animated animate__zoomIn flex items-center text-[40px] font-semibold">
        <p className="Meal_Plans mr-2 text-[#16a049]">Fresh Meal Plans </p>
        <div className="aliment-left relative min-h-[60px] min-w-[300px] text-left">
          {words.map((word, index) => (
            <span
              key={index}
              className={`absolute left-0 top-0 block w-full transition-all duration-700 ${word.className}`}
              style={{
                opacity: index === currentIndex ? 1 : 0,
                visibility: index === currentIndex ? "visible" : "hidden",
                transform: `translateY(${index === currentIndex ? 0 : "20px"})`,
              }}
            >
              {word.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreshMealPlansHeading;
