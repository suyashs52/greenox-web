import React from "react";

const popularItems = [
  {
    id: 1,
    name: "Veggie Delight",
    img: "/img/veggie_delight.jpg",
    price: 199,
    description: "A delicious mix of fresh vegetables.",
  },
  {
    id: 2,
    name: "Chicken Wrap",
    img: "/img/chicken_wrap.jpg",
    price: 299,
    description: "Grilled chicken wrapped with fresh veggies.",
  },
  {
    id: 3,
    name: "Quinoa Salad",
    img: "/img/quinoa_salad.jpg",
    price: 249,
    description: "Healthy quinoa salad with a zesty dressing.",
  },
  // Add more items as needed
];

export const PopularMenu = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8" id="target-section">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Popular Menu Items
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {popularItems.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg border shadow-md"
          >
            <img
              src={item.img}
              alt={item.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">
                  ₹{item.price}
                </span>
                <button className="rounded bg-orange-400 px-4 py-2 text-white transition hover:bg-orange-500">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
