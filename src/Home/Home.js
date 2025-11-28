import FreshMeals from "../components/Freshmealplans.js";
import Location from "../components/Location.js";
import Hero from "../components/Herosection.js";
import FoodMenu from "../components/FoodMenu.js";
import OurHistory from "../components/OurHistory.js";
import Bigestbrand from "../components/Bigestbarand.js";
import Testimonials from "../components/Testimonials.js";

const Home = () => {
  return (
    <>
      <Hero />
      <FoodMenu />
      <FreshMeals />
      <OurHistory />
      <Location />
      <Bigestbrand />
      <Testimonials />
    </>
  );
};

export default Home;
