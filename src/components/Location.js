import React, { useState } from "react";
import Location_pic from "./Location_pic";

const cityLocations = {
  "Uttar Pradesh": [
    {
      address: "Shiv Nadar University, Noida, Uttar Pradesh",
      phone: "9773857436",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address: "Christ University, Delhi NCR Campus, Noida, Uttar Pradesh",
      phone: "9319304911",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "Mangalmay College, Knowledge Park II, Greater Noida, Uttar Pradesh",
      phone: "9773930485",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "Amity University, Knowledge Park-III, Greater Noida, Uttar Pradesh",
      phone: "8920352016",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address: "Sector-18, Vasundhara, Ghaziabad, Uttar Pradesh 201012",
      phone: "7078548120",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "S-1, 4/15, Sector-5, Rajendra Nagar, Ghaziabad 201005, Uttar Pradesh",
      phone: "9625754646",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "639, Shakti Khand 4, Indirapuram, Ghaziabad, Uttar Pradesh 201014",
      phone: "9315700833",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "Orbit Plaza, Crossing Republik, Ghaziabad, Uttar Pradesh 201016",
      phone: "8800765477",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address: "SK-66, Sector 112, Noida, Uttar Pradesh 201304",
      phone: "9211577272",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address: "The Corenthum, Sector 62, Noida, Uttar Pradesh 201301",
      phone: "9899800100",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address: "World Trade Tower, Sector 16, Noida, Uttar Pradesh 201301",
      phone: "8800123580",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address: "HMEL Petrol Pump, Sector 108, Noida, Uttar Pradesh 201304",
      phone: "9311061646",
      dinein: "OPEN",
      delivery: "OPEN",
    },
  ],
  Others: [
    {
      address: "Ashoka University, Sonipat, Haryana 131029",
      phone: "9266871146",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address: "Unitech Trade Centre, Sector 43, Gurugram, Haryana 122002",
      phone: "9919575355",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "SBI Card, DLF Infinity Towers, Cyber City, Gurugram, Haryana 122002",
      phone: "8810389393",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "Ultrex Recreational Club, South City Sector 41, Gurugram, Haryana 122003",
      phone: "9811571646",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address: "Shop No.19, New Market, Malviya Nagar, New Delhi 110017",
      phone: "9821176930",
      dinein: "OPEN",
      delivery: "OPEN",
    },
  ],

  // Mumbai: [],
  // Bangalore: [],
  // Kolkata: [],
  // Chennai: [],
  // Hyderabad: [],
  // Pune: [],
};

const cities = Object.keys(cityLocations);

const Location = () => {
  // Change the initial state to "Uttar Pradesh"
  const [selectedCity, setSelectedCity] = useState("Uttar Pradesh");

  return (
    <div className="flex min-h-screen w-full flex-col bg-white md:flex-row">
      {/* Left: Select City */}
      <div className="freshmealplan locaton_mobile_section flex flex-col items-center justify-center p-8 pl-12 md:w-1/3">
        <div className="max-w-xm select_locotion mb-8 w-full pb-4 pl-12">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <img src="/img/location.svg" alt="Location" className="h-5 w-5" />
            </span>
            <select
              className="m-0 w-full rounded-full border border-gray-300 py-3 pl-12 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <span className="selectLoc pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>
        {/* <img
          src="/img/mixedfruite.svg"
          alt="Veggies"
          className="h-100 w-100 mt-4 hidden object-contain md:block"
        /> */}
        <Location_pic />
      </div>
      {/* Right: Locations or Mascot */}
      <div
        className={
          "relative flex flex-col items-center justify-center p-6 transition-colors duration-300 md:w-2/3 " +
          (selectedCity ? "" : "bg-orange-50")
        }
        style={
          selectedCity
            ? {
                backgroundImage: "url('/img/subscription2.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        {/* Show mascots image only when no city is selected */}
        {!selectedCity && (
          <img
            src="/img/broccolimascots.svg"
            alt="Broccoli Mascots"
            className="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-full w-full object-contain opacity-90 md:block"
          />
        )}

        {!selectedCity ? (
          <div className="z-10 hidden h-full w-full flex-col items-center justify-center md:flex">
            {/* Speech bubble - hidden on small screens, visible md+ */}
            <div className="top_40px absolute left-8 top-8 z-20">
              <div className="relative rounded-lg border border-orange-300 bg-orange-100 px-6 py-4 text-lg font-medium text-gray-700 shadow">
                Please select a city
                <br />
                to find the nearest
                <br />
                GreeNox store
                {/* Arrow */}
                <span className="absolute -left-6 top-6 h-0 w-0 border-b-8 border-r-8 border-t-8 border-b-transparent border-r-orange-100 border-t-transparent"></span>
                <span className="absolute -left-6 top-6 z-[-1] h-0 w-0 border-b-8 border-r-8 border-t-8 border-b-transparent border-r-orange-300 border-t-transparent"></span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="z-10 mb-6 text-center text-2xl font-extrabold text-green-600 md:text-4xl">
              Restaurant Locator
            </h2>
            <div
              className="custom-scrollbar z-10 grid w-full grid-cols-1 gap-6 pr-2 md:grid-cols-2 lg:grid-cols-3"
              style={{ height: "500px", overflowY: "auto" }}
            >
              {cityLocations[selectedCity] &&
              cityLocations[selectedCity].length > 0 ? (
                cityLocations[selectedCity].map((loc, idx) => (
                  <div
                    key={idx}
                    className="custom-scrollbar-inner flex min-h-[300px] flex-col justify-between rounded-2xl bg-white p-6 shadow"
                  >
                    <div>
                      <div className="mb-2 text-base font-semibold text-gray-800">
                        {loc.address}
                      </div>
                      <div className="mb-1 font-bold">
                        Dine-in:{" "}
                        <span className="text-green-600">{loc.dinein}</span>
                      </div>
                      <div className="mb-2 font-bold">
                        Delivery:{" "}
                        <span className="text-green-600">{loc.delivery}</span>
                      </div>
                      <div className="mb-2 flex items-center gap-2 text-lg font-bold text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span className="font-bold">{loc.phone}</span>
                      </div>
                    </div>
                    <button className="mt-4 w-full rounded-full bg-orange-400 py-3 text-lg font-bold text-white transition hover:bg-orange-500">
                      GET DIRECTIONS
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-xl text-gray-700">
                  No locations available for this city.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Location;
