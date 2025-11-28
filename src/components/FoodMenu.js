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
   Small helpers (added)
----------------------------- */
const asStr = (v) => (v == null ? "" : typeof v === "string" ? v : String(v));

const parseNutritionFromText = (text = "") => {
  if (!text) return {};
  const norm = (s) => {
    if (s == null) return null;
    const n = Number(String(s).replace(/[^\d.]/g, ""));
    return Number.isFinite(n) ? n : null;
  };
  const find = (re) => {
    const m = String(text).match(re);
    if (!m) return null;
    return norm(m[1]?.replace(/\s+/g, ""));
  };
  const calories = find(/(?:energy|energy[:\s-]*)([\d.,]+)/i) || find(/([\d.,]+)\s*kcal/i);
  const carbs = find(/(?:carbs|carbohydrates?)[:\s-]*([\d.,]+)/i) || find(/carbs[-\s]*([\d.,]+)/i);
  const protein = find(/protein[:\s-]*([\d.,]+)/i);
  const fat = find(/(?:lipid\s*fat|lipid|fat)[:\s-]*([\d.,]+)/i) || find(/fat[-\s]*([\d.,]+)/i);
  const out = { calories, protein, carbs, fat };
  Object.keys(out).forEach((k) => { if (out[k] == null) delete out[k]; });
  return out;
};

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
        .map((c) => c?.card?.info)
        .filter(Boolean)
        .map((info, i) => {
          const imageRel = info.imageRelPath || info.imageId || info.image || "";
          const img = Array.isArray(imageRel) ? String(imageRel[0] ?? "") : String(imageRel ?? "");
          const imgFile = img ? img.split("/").pop() : "";

          return {
            id: String(info.id ?? `item-${i}`),
            name: asStr(info.name),
            description: asStr(info.description || info.subtitle),
            img,
            imgFile,
            price: typeof info.price === "number" ? info.price / 100 : Number(info.priceString?.replace(/[^\d.]/g, "")) || 0,
            nutrition: info.nutrition && Object.keys(info.nutrition).length ? info.nutrition : parseNutritionFromText(info.description || ""),
            type: info.itemAttribute?.vegClassifier === "NONVEG" ? "nonveg" : (info.isVeg ? "veg" : undefined),
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
        let imgStr = "";
        if (Array.isArray(imageRel)) imgStr = String(imageRel[0] ?? "");
        else imgStr = String(imageRel ?? "");
        const imgFile = imgStr ? imgStr.split("/").pop() : "";
        return {
          id: String(it.id ?? `item-${i}`),
          name: asStr(it.name ?? it.title ?? `Item ${i + 1}`),
          description: asStr(it.description ?? it.subtitle ?? ""),
          img: imgStr,
          imgFile,
          price: Number(it.price) || Number(it.priceInPaise ? it.priceInPaise / 100 : 0) || 0,
          nutrition: it.nutrition && Object.keys(it.nutrition).length ? it.nutrition : parseNutritionFromText(it.description || it.subtitle || ""),
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
  const [moreOpen, setMoreOpen] = useState(false);
  const activeCategory = categories.find((c) => c.id === activeKey);
  const activeItems = activeCategory?.items || [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12" id="target-section">
      {/* Heading */}
      <div className="tabs_view mb-8 flex w-full flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="w-full md:w-1/2">
          <p className="text-sm text-gray-500">Popular Menu</p>
          <Delicious />
          <div className="mt-3 w-20 border-b-4 border-orange-500" />
        </div>

        {/* Tabs */}
        <div className="w-full md:w-auto">
          {(() => {
            const visible = categories.slice(0, 4);
            const overflow = categories.length > 4 ? categories.slice(4) : [];
            return (
              <div className="tabsmenu flex items-center gap-2 py-2">
                {visible.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveKey(cat.id);
                      setMoreOpen(false);
                    }}
                    className={`inline-flex flex-shrink-0 whitespace-nowrap rounded-md px-4  text-base font-medium transition-colors ${activeKey === cat.id ? "text-orange-500" : "text-gray-600 hover:text-orange-500"}`}
                  >
                    {cat.name}
                  </button>
                ))}

                {overflow.length > 0 && (
                  <div className="relative inline-block text-left">
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={moreOpen}
                      onClick={() => setMoreOpen((s) => !s)}
                      className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      More
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {moreOpen && (
                      <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                        <div className="py-1">
                          {overflow.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setActiveKey(cat.id);
                                setMoreOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {cat.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}
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
