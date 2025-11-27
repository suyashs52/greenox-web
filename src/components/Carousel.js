import React, { useState, useEffect } from "react";

const slidesData = [
  {
    image: "https://picsum.photos/id/1018/1200/600",
    title: "Explore the Wilderness",
    description: "Discover breathtaking landscapes.",
    buttonText: "View Gallery",
  },
  {
    image: "https://picsum.photos/id/1060/1200/600",
    title: "Future of Technology",
    description: "Innovations that change the world.",
    buttonText: "Learn More",
  },
  {
    image: "https://picsum.photos/id/1070/1200/600",
    title: "Creative Spaces",
    description: "Find your next inspiration.",
    buttonText: "Get Started",
  },
];

const carouselStyles = `
  .carousel-hero-banner { position: relative; max-width: 1200px; margin: 0 auto; }
  .carousel-images { position: relative; width: 100%; height: 600px; overflow: hidden; background:#111; border-radius:8px; }
  .carousel-slide { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .5s ease, transform .5s ease; z-index: 1; }
  .carousel-slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .carousel-slide .slide-content { position: absolute; left: 32px; bottom: 32px; color: #fff; background: rgba(0,0,0,0.45); padding: 18px; border-radius: 8px; max-width: 48%; }
  .carousel-slide h1{ margin:0 0 8px; font-size:1.6rem; line-height:1.1; }
  .carousel-slide p{ margin:0 0 12px; opacity:.95; }
  .carousel-slide .cta-button{ display:inline-block; padding:8px 14px; background:#10b981; color:#fff; border-radius:6px; text-decoration:none; font-weight:600; }
  .carousel-slide.active { opacity: 1; z-index: 2; transform: translateX(0); }

  .nav-button { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.45); border: none; color: #fff; width:44px; height:44px; display:flex; align-items:center; justify-content:center; border-radius:999px; cursor:pointer; z-index:40; }
  .nav-button:hover{ background: rgba(0,0,0,0.6); }
  .nav-button.prev{ left: 12px; }
  .nav-button.next{ right: 12px; }

  .carousel-indicators{ position: absolute; left: 50%; bottom: 12px; transform: translateX(-50%); display:flex; gap:8px; z-index:50; }
  .dot{ width:12px; height:12px; border-radius:999px; background: rgba(255,255,255,0.4); cursor:pointer; display:inline-block; border: 2px solid rgba(0,0,0,0.15); }
  .dot.active{ background: #f59e0b; box-shadow: 0 0 0 6px rgba(245,158,11,0.12); }

  @media (max-width: 768px){
    .carousel-images { height: 360px; }
    .carousel-slide .slide-content { left: 16px; bottom: 16px; max-width: 75%; padding: 12px; }
    .carousel-slide h1{ font-size:1.25rem; }
  }
`;

const CarouselHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = 5000;

  // inject component-scoped styles
  useEffect(() => {
    // optional: ensure only one style tag (in dev HMR it'll re-run)
    let id = "carousel-component-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.innerHTML = carouselStyles;
      document.head.appendChild(el);
    }
    return () => {};
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, slideInterval);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slidesData.length) % slidesData.length,
    );
  };

  return (
    <div className="carousel-hero-banner">
      <div className="carousel-images">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
          >
            <img src={slide.image} alt={`Slide ${index + 1}`} />
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <a href="#" className="cta-button">
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>

      <button
        className="nav-button prev"
        onClick={prevSlide}
        aria-label="Previous"
      >
        &#10094;
      </button>
      <button className="nav-button next" onClick={nextSlide} aria-label="Next">
        &#10095;
      </button>

      <div className="carousel-indicators">
        {slidesData.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default CarouselHero;
