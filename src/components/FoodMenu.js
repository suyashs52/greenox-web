import React, { useState } from "react";
import { Link } from "react-router-dom";
import categoriesData from "../img/categories.json";
import Delicious from "./Delicious";

/* ----------------------------
   Image loader (Webpack safe)
----------------------------- */
let menuSmImages = {};
try {
  const req = require.context("../img/menu/sm", false, /\.(png|jpe?g|svg)$/);
  req.keys().forEach((k) => {
    menuSmImages[k.replace("./", "")] = req(k);
  });
} catch (err) { }

/* ----------------------------
   Resolve Item Image
----------------------------- */
const resolveItemImg = (img) => {
  if (!img) return "/img/placeholder.png";
  if (img.startsWith("http") || img.startsWith("/")) return img;

  const filename = img.split("/").pop();
  if (menuSmImages[filename]) return menuSmImages[filename];

  try {
    return require(`../img/${img.replace(/^\/+/, "")}`);
  } catch { }

  return "/img/placeholder.png";
};

/* ----------------------------
   Slugify
----------------------------- */
const slugify = (s = "") =>
  s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/* ----------------------------
   Normalize Category
----------------------------- */
const normalizeCategory = (raw, idx = 0) => {
  if (!raw) return { id: `cat-${idx}`, name: "", items: [] };

  // Swiggy-like structure
  if (Array.isArray(raw.itemCards)) {
    return {
      id: raw.id ?? slugify(raw.title || `Category ${idx + 1}`),
      name: raw.title || raw.name || `Category ${idx + 1}`,
      items: raw.itemCards
        .map((c, i) => c?.card?.info)
        .filter(Boolean)
        .map((info, i) => {
          const imageRel = info.imageRelPath || info.imageId || info.image || "";
          const img = Array.isArray(imageRel)
            ? imageRel[0] || ""
            : String(imageRel || "");

          return {
            id: String(info.id || `item-${i}`),
            name: info.name || "",
            description: info.description || info.subtitle || "",
            img,
            imgFile: img.split("/").pop(),
            price:
              typeof info.price === "number"
                ? info.price / 100
                : Number(info.priceString?.replace(/[^\d]/g, "")) || 0,
            type:
              info.itemAttribute?.vegClassifier === "NONVEG"
                ? "nonveg"
                : info.isVeg
                  ? "veg"
                  : undefined,
          };
        }),
    };
  }

  // Already normalized
  if (raw.items || raw.menu) {
    const itemsArr = raw.items || raw.menu || [];
    return {
      id: raw.id ?? slugify(raw.name || raw.title),
      name: raw.name || raw.title,
      items: itemsArr.map((it, i) => {
        const imageRel = it.imageRelPath || it.imageId || it.image || it.img || "";
        const img = Array.isArray(imageRel)
          ? imageRel[0] || ""
          : String(imageRel || "");

        return {
          id: String(it.id || `item-${i}`),
          name: it.name || it.title || "",
          description: it.description || it.subtitle || "",
          img,
          imgFile: img.split("/").pop(),
          price:
            Number(it.price) ||
            (it.priceInPaise ? it.priceInPaise / 100 : 0) ||
            0,
          type: it.type || (it.isVeg ? "veg" : undefined),
        };
      }),
    };
  }

  // Simple map: { "Salads": [...] }
  if (typeof raw === "object" && !Array.isArray(raw)) {
    const k = Object.keys(raw)[0];
    if (Array.isArray(raw[k])) {
      return {
        id: slugify(k),
        name: k,
        items: raw[k],
      };
    }
  }

  // Fallback
  return {
    id: `cat-${idx}`,
    name: String(raw),
    items: Array.isArray(raw) ? raw : [],
  };
};

/* ----------------------------
   Normalize all categories
----------------------------- */
const normalizeCategories = (data) => {
  if (Array.isArray(data)) {
    return data.flatMap((entry, i) => {
      if (Array.isArray(entry.categories)) {
        return entry.categories.map((sub, j) => {
          const cat = normalizeCategory(sub, `${i}-${j}`);
          cat.parent = entry.title || "";
          return cat;
        });
      }
      return [normalizeCategory(entry, i)];
    });
  }

  if (typeof data === "object") {
    return Object.entries(data).map(([name, val], idx) => {
      if (Array.isArray(val)) return { id: slugify(name), name, items: val };
      return normalizeCategory({ name, ...val }, idx);
    });
  }

  return [];
};

const categories = normalizeCategories(categoriesData);
const firstWithItems = categories.find((c) => c.items?.length > 0);
const defaultKey = firstWithItems?.id || categories[0]?.id || "default";

/* ----------------------------
   Component
----------------------------- */
const FoodMenu = () => {
  const [activeKey, setActiveKey] = useState(defaultKey);
  const activeCategory = categories.find((c) => c.id === activeKey);
  const activeItems = activeCategory?.items || [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12" id="target-section">
      {/* Heading */}
      <div className="tabs_view mb-8 flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="w-full md:w-1/2">
          <p className="text-sm text-gray-500">Popular Menu</p>
          <Delicious />
          <div className="mt-3 w-20 border-b-4 border-orange-500" />
        </div>

        {/* Tabs */}
        <div className="w-full md:w-auto">
          <div className="tabsmenu flex w-full gap-2 overflow-x-auto py-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveKey(cat.id)}
                className={`inline-flex flex-shrink-0 whitespace-nowrap rounded-md px-4 py-3 text-base font-medium transition-colors ${activeKey === cat.id
                  ? "text-orange-500"
                  : "text-gray-600 hover:text-orange-500"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {activeItems.length === 0 ? (
          <div className="col-span-full p-6 text-center text-gray-500">
            No items found for this category.
          </div>
        ) : (
          activeItems.map((item, idx) => {
            const itemId = encodeURIComponent(item.id || slugify(item.name));
            const catId = encodeURIComponent(activeCategory?.id);

            return (
              <Link
                key={item.id || idx}
                to={`/menu/${catId}/${itemId}`}
                className="group flex items-start gap-4 bg-white p-4 transition-shadow hover:shadow-lg"
              >
                <div className="relative flex-none">
                  <img
                    src={resolveItemImg(item.img || item.imgFile)}
                    onError={(e) => {
                      e.currentTarget.src = "/img/placeholder.png";
                    }}
                    alt={item.name}
                    className="h-32 w-32 rounded-lg object-cover"
                  />

                  <span className="absolute right-1 top-1 h-5 w-5">
                    <img
                      src={
                        item.type === "nonveg"
                          ? "/img/non-veg.svg"
                          : "/img/veg.svg"
                      }
                      alt={item.type}
                    />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg line-clamp-1 font-semibold text-gray-900 group-hover:text-orange-500">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3">
                    <span className="text-base font-semibold text-green-600">
                      ₹{item.price}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
};

export default FoodMenu;
