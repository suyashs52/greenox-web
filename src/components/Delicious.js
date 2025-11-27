import React, { useState, useEffect } from "react";

const Delicious = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const words = [
    { text: "Food Menu", className: "text-[#000]" },
    { text: "Mega Healthy", className: "text-[#16a049]" },
    { text: "Ultra Fresh", className: "text-[#FF9800]" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="justify-Left delicious_mobile relative flex items-center">
      <div className="flex items-center text-[40px] font-semibold">
        <p className="mobile_text mr-2">Delicious</p>
        <div className="relative min-h-[60px] min-w-[300px]">
          {words.map((word, index) => (
            <span
              key={index}
              className={`animation_text absolute left-0 top-0 block w-full transition-all duration-700 ${word.className}`}
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

export default Delicious;
