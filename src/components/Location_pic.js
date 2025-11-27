import React, { useEffect, useRef } from "react";

const testimonials = [
  {
    img: "/img/Sector62.jpg",
    name: "Sector 62, Noida",
  },
  {
    name: "Sector 52, Noida",
    img: "/img/Sector50.jpg",
  },
  {
    name: "SARC building, Greater Noida",
    img: "/img/Greater-Noida.jpg",
  },
  {
    name: "Rajendra Nagar, Ghaziabad",
    img: "/img/Ghaziabad.jpg",
  },
  {
    name: "Sector 39, Gurugram",
    img: "/img/Gurugram.jpg",
  },
];

const SLIDE_HEIGHT = 250; // px
const SCROLL_SPEED = 0.5; // px per frame
const SLIDES_TO_SHOW = 2;

const Location_pic = () => {
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
    <div className="main-container flex items-center justify-center">
      <div
        className="mobile_view_loc_pic"
        style={{
          position: "relative",
          width: "330px",
          height: `${SLIDE_HEIGHT * SLIDES_TO_SHOW}px`,
          overflow: "hidden",
          marginLeft: "45px",
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
              className="testimonial-item"
              style={{
                width: "100%",
                height: `${SLIDE_HEIGHT}px`,
                marginBottom: "25px",
                borderRadius: "10px",
                background: "#F3F6F4",
                boxShadow: "0 2px 8px #0001",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "background 0.3s, color 0.3s",
                color: "#222",
              }}
            >
              <div className="flex items-center gap-3">
                <img src={item.img} alt={item.name} className="h-full w-full" />
              </div>

              <div className="flex px-4 pb-4 text-lg font-bold text-cyan-700">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Location_pic;
