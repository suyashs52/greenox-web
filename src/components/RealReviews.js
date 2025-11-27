import React, { useEffect, useRef } from "react";

const testimonials = [
  {
    text: "Greenox has quickly become my top choice for a wholesome and fulfilling meal. Their dedication to sustainability, freshness, and high-quality ingredients truly stands out. It’s more than just great food—it’s a commitment to a healthier, greener lifestyle.",
    name: "Akash",
    role: "Designation Name",
    img: "/img/Akash.jpg",
  },
  {
    text: "I’ve been a loyal GreeNox customer for over two years, and their delicious, nutritious dishes keep me coming back. Their plant-based menu has truly been a game-changer for my lifestyle, and every visit feels welcoming thanks to their warm and inviting atmosphere.",
    name: "Aditya Chaudhary",
    role: "Designation Name",
    img: "/img/Aditya.jpg",
  },
  {
    text: "As a fitness enthusiast, I appreciate the protein-packed options at GreeNox. The Soya Paneer Rice Bowl is my favorite - it's both nutritious and delicious. Plus, the cleanliness and hygiene at their food production unit are top-notch.",
    name: "Adeesh",
    role: "Designation Name",
    img: "/img/Adeesh.jpg",
  },
  {
    text: "As a fitness enthusiast, I truly value the protein-rich meals GreeNox offers. Their Soya Paneer Rice Bowl is my absolute favorite—nutritious, delicious, and perfectly balanced. I’m also consistently impressed by the exceptional hygiene and cleanliness maintained at their food production unit. GreeNox sets a high standard!",
    name: "Kinjalika Verma",
    role: "Designation Name",
    img: "/img/Kinjalika.jpg",
  },
];

const SLIDE_HEIGHT = 360; // px
const SCROLL_SPEED = 0.5; // px per frame
const SLIDES_TO_SHOW = 2;

const MainSlider = () => {
  const sliderRef = useRef(null);
  const animRef = useRef();
  const scrollRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slides = [...testimonials, ...testimonials]; // duplicate for seamless loop
    const totalHeight = slides.length * (SLIDE_HEIGHT + 18); // each slide height + margin

    // Start offset so we scroll downward from top to bottom
    scrollRef.current = -totalHeight / 2;

    const animate = () => {
      if (!pausedRef.current) {
        scrollRef.current += SCROLL_SPEED;
        if (scrollRef.current >= 0) {
          // reset seamlessly to start again from middle
          scrollRef.current = -totalHeight / 2;
        }
        slider.style.transform = `translateY(${scrollRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    // Pause on hover
    slider.parentElement.addEventListener("mouseenter", () => {
      pausedRef.current = true;
    });
    slider.parentElement.addEventListener("mouseleave", () => {
      pausedRef.current = false;
    });

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="main-container testimonials_justify flex items-center justify-center">
      <div
        className="Testimonials_mobile Testimonials_tabs_view relative"
        style={{
          position: "relative",
          width: "330px",
          height: `${SLIDE_HEIGHT * SLIDES_TO_SHOW}px`,
          overflow: "hidden",
        }}
      >
        <div
          ref={sliderRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {[...testimonials, ...testimonials].map((item, i) => (
            <div
              key={i}
              className="testimonial-item testimonial-item_tabs"
              style={{
                width: "100%",
                height: `${SLIDE_HEIGHT}px`,
                marginBottom: "25px",
                borderRadius: "10px",
                background: "#fff",
                boxShadow: "0 2px 8px #0001",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "background 0.3s, color 0.3s",
                color: "#222",
              }}
            >
              <div className="text-base text-gray-700">{item.text}</div>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-14 w-14 rounded-full border-2 border-cyan-500 object-cover"
                />
                <div>
                  <div className="text-lg font-bold text-cyan-700">
                    {item.name}
                  </div>
                  <div className="text-sm font-semibold text-gray-600">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
