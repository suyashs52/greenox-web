import React, { useState } from "react";
import { Link } from "react-router-dom";
import categoriesData from "../img/categories.json";
import Delicious from "./Delicious";

// Build map of small images (Webpack require.context)
const menuSmImages = (() => {
  const map = {};
  try {
    const req = require.context("../img/menu/sm", false, /\.(png|jpe?g|svg)$/);
    req.keys().forEach((k) => (map[k.replace("./", "")] = req(k)));
  } catch (e) {
    // ignore when context not available in some builds
  }
  return map;
})();

const placeholder = "/img/placeholder.png";

const resolveItemImg = (img) => {
  if (!img) return placeholder;
  if (Array.isArray(img)) img = img[0];
  if (typeof img !== "string") img = String(img);
  if (img.startsWith("http") || img.startsWith("/")) return img;
  const filename = img.split("/").pop() || "";
  if (filename && menuSmImages[filename]) return menuSmImages[filename];
  try {
    return require(`../img/${img.replace(/^\/+/, "")}`);
  } catch (e) {
    return placeholder;
  }
};

const slugify = (s = "") => String(s).toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

const normalizeCategory = (raw = {}, idx = 0) => {
  const safe = (v) => (v == null ? "" : v);
  if (Array.isArray(raw.itemCards)) {
    const items = raw.itemCards
      .map((c) => c?.card?.info)
      .filter(Boolean)
      .map((info, i) => {
        const imageRel = info.imageRelPath || info.imageId || info.image || "";
        const img = Array.isArray(imageRel) ? imageRel[0] : String(imageRel || "");
        const file = img ? String(img).split("/").pop() : "";
        const price = typeof info.price === "number" ? info.price / 100 : Number(String(info.priceString || info.price || 0).replace(/[^\d.]/g, "")) || 0;
        return {
          id: String(info.id ?? `item-${i}`),
          name: safe(info.name),
          description: safe(info.description || info.subtitle),
          img,
          imgFile: file,
          price,
          nutrition: info.nutrition || {},
          type: info.itemAttribute?.vegClassifier === "NONVEG" ? "nonveg" : info.isVeg ? "veg" : undefined,
        };
      });
    const name = safe(raw.title || raw.name || `Category ${idx + 1}`);
    return { id: raw.id ?? slugify(name), name, items, image48Id: raw.image48Id || raw.image || raw.img || "" };
  }

  if (Array.isArray(raw.items) || Array.isArray(raw.menu)) {
    const arr = Array.isArray(raw.items) ? raw.items : raw.menu;
    const items = arr.map((it, i) => {
      const imageRel = it.imageRelPath || it.imageId || it.image || it.img || "";
      const img = Array.isArray(imageRel) ? imageRel[0] : String(imageRel || "");
      const file = img ? String(img).split("/").pop() : "";
      return {
        id: String(it.id ?? `item-${i}`),
        name: safe(it.name || it.title),
        description: safe(it.description || it.subtitle),
        img,
        imgFile: file,
        price: Number(it.price) || (it.priceInPaise ? it.priceInPaise / 100 : 0) || 0,
        nutrition: it.nutrition || {},
        type: it.type || (it.isVeg ? "veg" : undefined),
      };
    });
    const name = safe(raw.name || raw.title || `Category ${idx + 1}`);
    return { id: raw.id ?? slugify(name), name, items, image48Id: raw.image48Id || raw.image || raw.img || "" };
  }

  if (typeof raw === "object" && !Array.isArray(raw)) {
    const keys = Object.keys(raw);
    if (keys.length === 1 && Array.isArray(raw[keys[0]])) {
      const name = keys[0];
      return { id: slugify(name), name, items: raw[name], image48Id: "" };
    }
  }

  return { id: raw.id ?? `cat-${idx}`, name: String(raw || ""), items: Array.isArray(raw) ? raw : [] };
};

const normalizeCategories = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.flatMap((entry, i) => {
      if (Array.isArray(entry.categories)) {
        return entry.categories.map((sub, j) => {
          const cat = normalizeCategory(sub, `${i}-${j}`);
          cat.parent = entry.title || "";
          cat.id = cat.id ?? `${slugify(entry.title || `parent-${i}`)}--${slugify(sub.title || sub.name || `sub-${j}`)}`;
          cat.image48Id = cat.image48Id || entry.image48Id || "";
          return cat;
        });
      }
      return [normalizeCategory(entry, i)];
    });
  }
  if (typeof data === "object") {
    return Object.entries(data).map(([k, v], idx) => (Array.isArray(v) ? { id: slugify(k), name: k, items: v, image48Id: "" } : normalizeCategory({ name: k, ...v }, idx)));
  }
  return [];
};

const categories = normalizeCategories(categoriesData);
const firstWithItems = categories.find((c) => c.items?.length > 0);
const defaultKey = firstWithItems?.id || categories[0]?.id || "default";

const FoodMenu = () => {
  const [activeKey, setActiveKey] = useState(defaultKey);
  const [moreOpen, setMoreOpen] = useState(false);
  const activeCategory = categories.find((c) => c.id === activeKey) || categories[0] || null;
  const activeItems = activeCategory?.items || [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12" id="target-section">
      <div className="tabs_view mb-8 flex w-full flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="w-full md:w-1/2">
          <p className="text-sm text-gray-500">Popular Menu</p>
          <Delicious />
          <div className="mt-3 w-20 border-b-4 border-orange-500" />
        </div>

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
                      if (typeof window !== "undefined" && window.scrollTo) window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`inline-flex flex-shrink-0 whitespace-nowrap rounded-md px-4 text-base font-medium transition-colors ${activeKey === cat.id ? "text-orange-500" : "text-gray-600 hover:text-orange-500"}`}
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
                                if (typeof window !== "undefined" && window.scrollTo) window.scrollTo({ top: 0, behavior: "smooth" });
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

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {activeItems.length === 0 ? (
          <div className="col-span-full p-6 text-center text-gray-500">No items found for this category.</div>
        ) : (
          activeItems.map((item, idx) => {
            const itemId = encodeURIComponent(item.id || slugify(item.name));
            const catId = encodeURIComponent(activeCategory?.id || "");
            return (
              <Link key={item.id || idx} to={`/menu/${catId}/${itemId}`} className="group flex items-start gap-4 bg-white p-4 transition-shadow hover:shadow-lg">
                <div className="relative flex-none">
                  <img src={resolveItemImg(item.img || item.imgFile)} onError={(e) => (e.currentTarget.src = placeholder)} alt={item.name} className="h-32 w-32 rounded-lg object-cover" />
                  <span className="absolute right-1 top-1 h-5 w-5">
                    <img src={item.type === "nonveg" ? "/img/non-veg.svg" : "/img/veg.svg"} alt={item.type} />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg line-clamp-1 font-semibold text-gray-900 group-hover:text-orange-500">{item.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  <div className="mt-3"><span className="text-base font-semibold text-green-600">₹{item.price}</span></div>
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