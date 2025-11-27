import { Link } from "react-router-dom";

const menuItems = [
  {
    label: "ABC Red Nutritional Juice",
    img: "/products/ABC Red Nutritional Juice.jpg",
  },
  {
    label: "Extra Value Meals",
    img: "/products/Alfredo ( White Sauce ) Pasta - 2.jpg",
  },
  { label: "Alfredo®", img: "/products/Alfredo.jpg" },
  { label: "Snack Wrap®", img: "/products/Apple Berry Oatmeal Jar -2.jpg" },
  {
    label: "Assorted Veggies",
    img: "/products/Assorted Veggies & Quinoa Salad -2.jpg",
  },
  { label: "Avocado", img: "/products/Avocado & Berries Smoothie Bowl.jpg" },
  { label: "Avocado Banana", img: "/products/Avocado Banana Smoothie.jpg" },
  {
    label: "Veg Burrito Bowl",
    img: "/products/Avocado Veg Burrito Bowl - 2.jpg",
  },
  { label: "Basil Pesto®", img: "/products/Basil Pesto Pasta Salad (1).jpg" },
  { label: "Bircher Muesli Jar®", img: "/products/Bircher Muesli Jar.jpg" },
  { label: "Caribbean", img: "/products/Caribbean Chicken Fillets .jpg" },
  { label: "Cheese Veg Burger", img: "/products/Cheese Veg Burger- 2.jpg" },
  { label: "Blue Lagoon Mint", img: "/products/Blue Lagoon Mint - 2.jpg" },
  { label: "Cheesy Tikka", img: "/products/Cheesy Tikka Sub -2.jpg" },
  { label: "Cheesy Tikka Sub", img: "/products/Cheesy Tikka Sub.jpg" },
  {
    label: "Chicken Caesar Salad",
    img: "/products/Chicken Caesar Salad- 2.jpg",
  },
  {
    label: "Choco Brownie Shake",
    img: "/products/Choco Brownie Shake- 2 (1).jpg",
  },
  { label: "Classic Cold Coffee", img: "/products/Classic Cold Coffee.jpg" },
  {
    label: "Soya Paneer Rice Bowl",
    img: "/products/Soya Paneer Rice Bowl -3.jpg",
  },
];

export default function MegaDropdown({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="leftmargin absolute left-0 top-full z-50 mt-3 bg-transparent">
      <div className="mx-auto w-full max-w-screen-xl p-6">
        <div className="flex gap-6">
          {/* Left column: categories */}
          <div className="w-2/5">
            <h4 className="mb-4 text-sm font-bold text-gray-600">
              Explore Categories
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {menuItems.slice(0, 12).map((it, i) => (
                <Link
                  key={i}
                  to="/allmenuiteams"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-50"
                >
                  <img
                    src={it.img}
                    alt={it.label}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <span className="text-sm text-gray-800">{it.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Center: popular */}
          <div className="w-2/5 border-l border-r border-gray-100 px-6">
            <h4 className="mb-4 text-sm font-bold text-gray-600">Popular</h4>
            <div className="grid grid-cols-2 gap-4">
              {menuItems.slice(6, 12).map((it, i) => (
                <Link
                  key={i}
                  to="/allmenuiteams"
                  onClick={onClose}
                  className="group block overflow-hidden rounded-lg bg-gray-50 p-3 hover:shadow-md"
                >
                  <img
                    src={it.img}
                    alt={it.label}
                    className="mb-3 h-20 w-full rounded object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="text-sm font-medium text-gray-800">
                    {it.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: promo CTA */}
          <div className="w-1/5">
            <img
              src="/products/Protein Packed Salad ( Veg ) - 2.jpg"
              alt="promo"
              className="mb-4 h-40 w-full rounded object-cover"
            />
            <Link
              to="/allmenuiteams"
              onClick={onClose}
              className="block rounded bg-green-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-green-700"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
