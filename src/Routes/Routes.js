import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Home = lazy(() => import("../Home/Home"));
const Menu = lazy(() => import("../Menu/Menu"));
const MenuDetails = lazy(() => import("../pages/MenuDetails"));
const Blog = lazy(() => import("../Blog/Blog"));
const BlogPost = lazy(() => import("../pages/BlogPost"));
const About = lazy(() => import("../About/About"));
const Subscription = lazy(() => import("../Subscription/Subscription"));
const Contact = lazy(() => import("../Contact/Contact"));
const Careers = lazy(() => import("../Careers/Careers"));
const Subcriptiondestails = lazy(() => import("../pages/Subcriptiondestails"));
const Termservice = lazy(() => import("../pages/Termservice"));
const Termsconditions = lazy(() => import("../pages/Termsconditions"));
const Privacypolicy = lazy(() => import("../pages/Privacypolicy"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:category" element={<Menu />} />
        <Route path="/menu/:category/:id" element={<MenuDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/post/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/subcriptiondestails" element={<Subcriptiondestails />} />
        <Route path="/termservice" element={<Termservice />} />
        <Route path="/termsconditions" element={<Termsconditions />} />
        <Route path="/privacypolicy" element={<Privacypolicy />} />
      </Routes>
    </Suspense>
  );
}
