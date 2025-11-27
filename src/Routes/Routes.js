import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Menu from "../Menu/Menu";
import MenuItemDetail from "../pages/MenuDetails";
import Blog from "../Blog/Blog";
import BlogPost from "../pages/BlogPost";
import About from "../About/About";
import Subscription from "../Subscription/Subscription";
import Contact from "../Contact/Contact";
import Careers from "../Careers/Careers";
import Subcriptiondestails from "../pages/Subcriptiondestails";
import AllMenuIteams from "../pages/AllMenuIteams";
import Termservice from "../pages/Termservice";
import Termsconditions from "../pages/Termsconditions";
import Privacypolicy from "../pages/Privacypolicy";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu/:category" element={<Menu />} />
      <Route path="/menu/:category/:id" element={<MenuItemDetail />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/post/:slug" element={<BlogPost />} />
      <Route path="/about" element={<About />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/subcriptiondestails" element={<Subcriptiondestails />} />
      <Route path="/allmenuiteams" element={<AllMenuIteams />} />
      <Route path="/termservice" element={<Termservice />} />
      <Route path="/termsconditions" element={<Termsconditions />} />
      <Route path="/privacypolicy" element={<Privacypolicy />} />
    </Routes>
  );
}
