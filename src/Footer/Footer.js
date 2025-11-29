import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative  bg-contain bg-center bg-no-repeat px-4 pb-4 pt-10 text-gray-200">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#474747]/90"></div>
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between gap-8 pt-8 md:flex-row">
        {/* Left: Logo and About */}
        <div className="min-w-[220px] flex-1">
          <div className="mb-4 flex items-center gap-2">
            <img src="/img/logo.png" alt="GreeNox Logo" className="h-10 w-10" />
            <span className="quiklinks text-2xl font-semibold italic">
              You are what you eat!
            </span>
          </div>
          <p className="mb-4 text-sm text-gray-300">
            The Journey of GreeNox Started in 2016 by Two Engineering Graduate
            with an idea to provide healthy snacking with the aim of catering to
            your craving without compromising on your holistic wellbeing.
          </p>
          <div className="mt-12 flex gap-5">
            <a
              target="_blank"
              href="https://www.facebook.com/officialgreenox"
              className="hover:text-green-400"
            >
              <FaFacebook size={32} className="bg-orange" />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/officialgreenox/"
              className="hover:text-green-400"
            >
              <FaInstagram size={32} />
            </a>
            <a
              target="_blank"
              href="https://in.linkedin.com/company/officialgreenox"
              className="hover:text-green-400"
            >
              <IoLogoLinkedin size={32} />
            </a>
            {/* <a href="#" className="hover:text-green-400">
              <FaTwitter size={32} />
            </a>
            <a href="#" className="hover:text-green-400">
              <FaYoutube size={32} />
            </a> */}
          </div>
        </div>
        {/* Center: Quick Links and Utility Pages */}
        <div className="flex flex-[2] flex-col justify-between gap-8 md:flex-row">
          <div>
            <div className="quiklinks mb-2 font-semibold">Quick Links</div>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-white">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="hover:text-white">
                  Subscription Plan
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>

              {/* <li>
                <Link to="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <div className="quiklinks mb-2 font-semibold">Learn More</div>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <Link to="/privacypolicy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li className="py-2">
                <Link to="/termsconditions" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/termservice" className="hover:text-white">
                  Cancellation & Refund Policy
                </Link>
                {/* <button
                  onClick={() =>
                    document
                      .getElementById("target-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Terms & Conditions
                </button> */}
              </li>
            </ul>
          </div>
          {/* Instagram */}
          <div>
            <div className="quiklinks mb-4 font-semibold">
              Follow Us On Instagram
            </div>
            <a
              target="_blank"
              href="https://www.instagram.com/officialgreenox/"
              className="grid grid-cols-2 gap-2"
            >
              <img
                src="/img/insta1.jpg"
                alt="Insta1"
                className="h-24 w-24 rounded-lg object-cover"
              />
              <img
                src="/img/insta2.jpg"
                alt="Insta2"
                className="h-24 w-24 rounded-lg object-cover"
              />
              <img
                src="/img/insta3.jpg"
                alt="Insta3"
                className="h-24 w-24 rounded-lg object-cover"
              />
              <img
                src="/img/insta4.jpg"
                alt="Insta4"
                className="h-24 w-24 rounded-lg object-cover"
              />
            </a>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="relative z-10 mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-gray-500 pt-4 md:flex-row">
        <div className="text-sm text-gray-400">
          Copyright © 2025{" "}
          <Link to="/" className="underline hover:text-white">
            Geenox
          </Link>
          , All Rights Reserved
        </div>
        {/* <div className="flex gap-4">
          <img src="/img/appstore.png" alt="App Store" className="h-10" />
          <img src="/img/playstore.png" alt="Google Play" className="h-10" />
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
