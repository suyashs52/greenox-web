import React, { useState } from "react";

const categories = [
  { id: 1, name: "Salads", count: 21 },
  { id: 2, name: "Sandwich", count: 4 },
  { id: 3, name: "Wholesome Meal", count: 4 },
  { id: 4, name: "Burrito Bowl", count: 5 },
  { id: 5, name: "Sub", count: 11 },
  { id: 6, name: "Wrap", count: 8 },
  { id: 7, name: "Healthy Rice Bowls", count: 10 },
  { id: 8, name: "Healthy Desserts Jar", count: 5 },
  { id: 9, name: "Pasta (Durum Wheat)", count: 8 },
  { id: 10, name: "Burger (Whole Wheat)", count: 5 },
  { id: 11, name: "Burger (Whole Wheat Goodness)", count: 5 },
  { id: 12, name: "Medley Smoothie Bowl", count: 5 },
  { id: 13, name: "Cold Coffee ", count: 2 },
  { id: 14, name: "Shake & Smoothies", count: 11 },
  { id: 15, name: "Mocktails", count: 5 },
  { id: 16, name: "Cookies", count: 1 },
  { id: 17, name: "Greenox Gourmet", count: 5 },
  { id: 18, name: "Gourmet Soups [350 Ml]", count: 5 },
];

const menuItems = [
  {
    id: 1,
    categoryId: 2, // Sandwich category
    name: "Corn Sandwich ( Cheese_ Paneer )",
    image: "/menuimg/Corn Sandwich ( Cheese_ Paneer ).jpg",
    description:
      "Brown Bread Golden Corn Bell Pepper Onion Tomato Cucumber Lettuce",
    nutritionInfo:
      "Energy -330kcal, Carbs-41.1g, Protein-8.4g, Lipid Fat-13.9g,",
    price: "40.00",
  },
  {
    id: 2,
    categoryId: 2, // Sandwich category
    name: "Chicken Barbecue Sandwich",
    image: "/menuimg/Grilled Chicken Barbecue Sandwich- 2.jpg",
    description: "Brown Bread Paneer Tikka Bell Pepper Onion Tomato Lettuce",
    nutritionInfo: "Energy -531 kcal, Carbs-65.8g, protein-21g Lipid Fat-19g ",
    price: "40.00",
  },
  {
    id: 3,
    categoryId: 1, // Salads category
    name: "Assorted Veggies & Quinoa Salad ",
    image: "/menuimg/Assorted Veggies & Quinoa Salad .jpg",
    description: "Fresh lettuce, tomatoes, cucumbers, olives, feta cheese",
    nutritionInfo: "Energy -220kcal, Carbs-12g, Protein-8g, Fat-16g, Fiber-4g",
    price: "35.00",
  },
  {
    id: 4,
    categoryId: 1, // Salads category
    name: "Basil Pesto Pasta Salad",
    image: "/menuimg/Basil Pesto Pasta Salad- 3.jpg",
    description: "Romaine lettuce, croutons, ",
    nutritionInfo: "Energy -250kcal, Carbs-14g, Protein-10g, Fat-18g, Fiber-3g",
    price: "35.00",
  },
  {
    id: 5,
    categoryId: 1, // Salads category
    name: "Exotic Fruit Salad ",
    image: "/menuimg/Exotic Fruit Salad - 2.jpg",
    description: "Fresh lettuce, tomatoes, cucumbers, olives, feta cheese",
    nutritionInfo: "Energy -220kcal, Carbs-12g, Protein-8g, Fat-16g, Fiber-4g",
    price: "35.00",
  },
  {
    id: 6,
    categoryId: 1, // Salads category
    name: "Exotic Fruit Salad",
    image: "/menuimg/Exotic Fruit Salad - 3.jpg",
    description: "Romaine lettuce, croutons, parmesan cheese, caesar dressing",
    nutritionInfo: "Energy -250kcal, Carbs-14g, Protein-10g, Fat-18g, Fiber-3g",
    price: "35.00",
  },
  {
    id: 7,
    categoryId: 1, // Salads category
    name: "Exotic Fruit Salad  ",
    image: "/menuimg/Exotic Fruit Salad - 4.jpg",
    description: "Fresh lettuce, tomatoes, cucumbers, olives, feta cheese",
    nutritionInfo: "Energy -220kcal, Carbs-12g, Protein-8g, Fat-16g, Fiber-4g",
    price: "35.00",
  },
  {
    id: 8,
    categoryId: 1, // Salads category
    name: "Extravaganza Veggies Salad",
    image: "/menuimg/Extravaganza Veggies Salad - 4.jpg",
    description: "Romaine lettuce, croutons, parmesan cheese, caesar dressing",
    nutritionInfo: "Energy -250kcal, Carbs-14g, Protein-10g, Fat-18g, Fiber-3g",
    price: "35.00",
  },
];

const AllMenuItems = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  // Filter menu items based on active category
  const filteredItems = menuItems.filter(
    (item) => item.categoryId === activeCategory,
  );

  return (
    <div className="freshmealplan container mx-auto px-4 py-12">
      <img
        alt="About Background"
        className="h-200 menubg absolute left-0 top-0 -z-10 w-full object-cover"
        src="menuimg/menubg.svg"
      />
      {/* Hero Section */}
      <div className="relative h-[230px]">
        <div className="absolute inset-0">
          <img
            src="/img/menu-banner.jpg"
            alt="Menu Banner"
            className="h-full w-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
          <h1 className="mb-4 text-4xl font-bold">Popular Menu</h1>
          <h2 className="text-6xl font-bold">Delicious Food Menu</h2>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex gap-8">
        {/* Left Sidebar */}
        <div className="w-1/4 min-w-[250px]">
          <div className="sticky top-4 rounded-lg bg-white p-4 shadow-lg">
            {/* <h3 className="mb-6 text-xl font-bold">Categories</h3> */}
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-md p-3 transition-colors ${
                    activeCategory === category.id
                      ? "bg-green-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span>{category.name}</span>
                  <span
                    className={`${
                      activeCategory === category.id
                        ? "bg-white text-green-500"
                        : "bg-gray-100 text-gray-600"
                    } rounded-full px-2 py-1 text-sm`}
                  >
                    {category.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Content Grid */}
        <div className="w-3/4">
          <div className="grid grid-cols-2 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="flex">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 w-40 object-cover"
                    />
                    <div className="flex-1 p-4 pb-0">
                      <h3 className="mb-2 text-xl font-semibold">
                        {item.name}
                      </h3>
                      <p className="mb-2 text-sm text-gray-600">
                        {item.description}
                      </p>
                      <p className="mb-4 text-xs text-gray-500">
                        {item.nutritionInfo}
                      </p>
                      <div className="mt-auto">
                        <span className="block font-bold text-orange-500">
                          ₹{item.price}
                        </span>
                        {/* <button className="mt-2 w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                          Add to Cart
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500">
                No items found in this category
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMenuItems;
