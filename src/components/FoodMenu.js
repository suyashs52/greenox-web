import React, { useState } from "react";
import { Link } from "react-router-dom";
import categoriesData from "../img/categories.json";
import Delicious from "./Delicious";

// load all images from src/img/menu/sm into a map so webpack bundles them
let menuSmImages = {};
try {
  const req = require.context("../img/menu/sm", false, /\.(png|jpe?g|svg)$/);
  req.keys().forEach((k) => {
    const name = k.replace("./", "");
    menuSmImages[name] = req(k);
  });
} catch (err) {
  // context may fail in some environments — fallback to empty map
  console.warn("menu/sm images not found via require.context", err);
}

// helper to resolve image for an item (images are in src/img/menu/sm/...)
const resolveItemImg = (itemImg) => {
  if (!itemImg) return "/img/placeholder.png";
  if (itemImg.startsWith("http")) return itemImg;
  if (itemImg.startsWith("/")) {
    // absolute public path – try as-is first
    return itemImg;
  }
  const base = itemImg.replace(/^\/+/, ""); // e.g. "menu/sm/82176619.jpg" or "82176619.jpg" or "img/menu/..."
  const parts = base.split("/");
  const filename = parts[parts.length - 1];

  // prefer images from src/img/menu/sm loaded by require.context
  if (menuSmImages[filename]) return menuSmImages[filename];

  // try variants that might match the file in src/img/...
  try {
    // try direct import from src/img path if path matches that structure
    return require(`../img/${base}`);
  } catch (e) {
    // ignore
  }
  try {
    return require(`../img/menu/sm/${filename}`);
  } catch (e) {
    // ignore
  }

  // fallback to treating as public path
  return `/${base}`;
};

// slug converter (used as id fallback)
const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// normalize a single category item into {id, name, items:[]}
const normalizeCategory = (raw, idx = 0) => {
  // Swiggy-like card shape
  if (raw && raw.title && Array.isArray(raw.itemCards)) {
    const items = raw.itemCards.map((cardObj, i) => {
      const info = cardObj?.card?.info || {};
      return {
        id: info.id ?? `item-${i}`,
        name: info.name ?? `Item ${i + 1}`,
        description: info.description ?? "",
        img:
          (info.imageRelPath && info.imageRelPath[0]) ||
          info.imageId ||
          info.image ||
          "/img/default.jpg",
        type: info.itemAttribute?.vegClassifier === "NONVEG" ? "nonveg" : "veg",
        price:
          typeof info.price === "number"
            ? info.price / 100
            : info?.priceString || 0,
      };
    });
    const name = raw.title || `Category ${idx + 1}`;
    return { id: raw.id ?? slugify(name), name, items };
  }

  // already normalized shape { name, items }
  if (raw && (raw.name || raw.items)) {
    return {
      id: raw.id ?? slugify(raw.name ?? `cat-${idx}`),
      name: raw.name ?? `Category ${idx + 1}`,
      items: Array.isArray(raw.items) ? raw.items : raw.menu || [],
    };
  }

  // object map entry like { "Salads": [...] } passed as an object with single key
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const keys = Object.keys(raw);
    if (keys.length === 1 && Array.isArray(raw[keys[0]])) {
      const name = keys[0];
      return { id: slugify(name), name, items: raw[name] };
    }
  }

  // fallback for string or unknown
  return {
    id: `cat-${idx}`,
    name: String(raw) || `Category ${idx + 1}`,
    items: Array.isArray(raw) ? raw : [],
  };
};

// top-level normalizer: accept array, object map, or wrapped { categories: [...] }
const normalizeCategories = (data) => {
  if (!data) return [];

  // If top-level is an array of menu blocks
  if (Array.isArray(data)) {
    return data.flatMap((entry, i) => {
      // Case: entry contains nested categories array (e.g. "Salads" -> categories: [ { title, itemCards }, ... ])
      if (Array.isArray(entry.categories) && entry.categories.length > 0) {
        return entry.categories.map((sub, j) => {
          // Use normalizeCategory to handle Swiggy-like sub structures (title + itemCards)
          const cat = normalizeCategory(sub, `${i}-${j}`);
          // Ensure id is unique and predictable: parent-slug + sub-slug
          const parentSlug = slugify(entry.title || `parent-${i}`);
          const subSlug = slugify(sub.title || sub.name || `sub-${j}`);
          cat.id = cat.id ?? `${parentSlug}--${subSlug}`;
          // keep parent name for debugging/links if needed
          cat.parent = entry.title ?? parentSlug;
          return cat;
        });
      }

      // Case: entry itself is a category-like object (itemCards, itemCards nested directly, or { title, itemCards })
      return [normalizeCategory(entry, i)];
    });
  }

  // If top-level is an object map e.g. { "Salads": { itemCards: [...] } } or { "Salads": [...] }
  if (typeof data === "object") {
    return Object.entries(data).flatMap(([k, v], idx) => {
      // if value is array -> treat as items array
      if (Array.isArray(v)) return [{ id: slugify(k), name: k, items: v }];

      // if v has categories (nested subcategories) flatten them with parent name
      if (v && Array.isArray(v.categories)) {
        return v.categories.map((sub, j) => {
          const cat = normalizeCategory(sub, `${idx}-${j}`);
          cat.id = cat.id ?? `${slugify(k)}--${slugify(sub.title || `sub-${j}`)}`;
          cat.parent = k;
          return cat;
        });
      }

      // if v has itemCards or items, normalize
      if (v && (v.itemCards || v.items || v.menu)) {
        const base = { title: k, ...v };
        const cat = normalizeCategory(base, idx);
        cat.id = cat.id ?? slugify(k);
        cat.name = k;
        return [cat];
      }

      // fallback single-key mapping
      return [normalizeCategory({ [k]: v }, idx)];
    });
  }

  return [];
};

// build categories from imported JSON
const categories = normalizeCategories(categoriesData);

// default active: pick first category that has items, else first category id
const firstWithItems = categories.find((c) => Array.isArray(c.items) && c.items.length > 0);
const defaultKey = firstWithItems ? firstWithItems.id : (categories[0]?.id ?? "default");

const FoodMenu = () => {
  const [activeKey, setActiveKey] = useState(defaultKey);

  // find active category using canonical id
  const activeCategory = categories.find((c) => c.id === activeKey) || null;
  const activeItems = activeCategory?.items || [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12" id="target-section">
      {/* heading */}
      <div className="tabs_view mb-8 flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="w-full md:w-1/2">
          <p className="text-sm text-gray-500">Popular Menu</p>
          <Delicious />
          <div className="mt-3 w-20 border-b-4 border-orange-500" />
        </div>

        {/* Tabs */}
        <div className="w-full md:w-auto">
          <div className="tabsmenu flex w-full gap-2 overflow-x-auto py-2 no-scrollbar">
            {categories.map((cat) => {
              const active = activeKey === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveKey(cat.id)}
                  className={`inline-flex flex-shrink-0 whitespace-nowrap rounded-md px-4 py-3 text-base font-medium transition-colors ${active ? "text-orange-500" : "text-gray-600 hover:text-orange-500"}`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {activeItems.length === 0 ? (
          <div className="col-span-full p-6 text-center text-gray-500">
            No items found for this category.
          </div>
        ) : (
          activeItems.map((item, idx) => (
            <Link
              key={item.id ?? idx}
              to={`/menu/${activeKey}/${item.id || slugify(item.name)}`}
              className="group flex items-start gap-4 bg-white p-4 transition-shadow hover:shadow-lg"
            >
              <div className="relative flex-none">
                <img
                  src={resolveItemImg(item.img)}
                  onError={(e) => {
                    // last-resort fallback to placeholder (also avoids infinite loop)
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/img/placeholder.png";
                  }}
                  alt={item.name}
                  className="h-32 w-32 rounded-lg object-cover"
                />

                <span
                  className="absolute right-1 top-1 h-5 w-5"
                  title={item.type === "nonveg" ? "Non Veg" : "Veg"}
                >
                  {item.type === "nonveg" ? (
                    <img src="/img/non-veg.svg" alt="nonveg" />
                  ) : (
                    <img src="/img/veg.svg" alt="veg" />
                  )}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-500">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {item.description}
                </p>
                <div className="mt-3">
                  <span className="text-base font-semibold text-green-600">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default FoodMenu;
