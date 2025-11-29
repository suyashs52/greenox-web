import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import categoriesData from "../img/categories.json";

/* ----------------------------se
   Image loader (Webpack safe)
----------------------------- */
let menuSmImages = {};
try {
  const req = require.context("../img/menu/sm", false, /\.(png|jpe?g|svg)$/);
  req.keys().forEach((k) => {
    menuSmImages[k.replace("./", "")] = req(k);
  });
} catch (err) {
  /* ignore */
}

/* ----------------------------
   Resolve Item Image
----------------------------- */
const resolveItemImg = (img) => {
  if (!img) return "/img/placeholder.png";
  if (typeof img !== "string") img = String(img);
  if (img.startsWith("http") || img.startsWith("/")) return img;
  const filename = img.split("/").pop() || "";
  if (menuSmImages[filename]) return menuSmImages[filename];
  try {
    return require(`../img/${img.replace(/^\/+/, "")}`);
  } catch {
    try {
      return require(`../img/menu/sm/${filename}`);
    } catch {
      return "/img/placeholder.png";
    }
  }
};

/* ----------------------------
   Slugify
----------------------------- */
const slugify = (s = "") =>
  String(s)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/* ----------------------------
   Normalize Category (keeps existing shapes compatible)
   simple, robust normalizer used for sidebar + links
----------------------------- */
const normalizeCategory = (raw = {}, idx = 0) => {
  const safeStr = (v) => (v == null ? "" : typeof v === "string" ? v : String(v));
  // swiggy-like with itemCards
  if (Array.isArray(raw.itemCards)) {
    const items = raw.itemCards
      .map((c) => c?.card?.info)
      .filter(Boolean)
      .map((info, i) => {
        const imageRel = info.imageRelPath || info.imageId || info.image || "";
        const img = Array.isArray(imageRel) ? String(imageRel[0] || "") : String(imageRel || "");
        const file = img ? img.split("/").pop() : "";
        const price = typeof info.price === "number" ? info.price / 100 : Number(String(info.priceString || info.price || 0).replace(/[^\d.]/g, "")) || 0;
        return {
          id: String(info.id ?? `item-${i}`),
          name: safeStr(info.name),
          description: safeStr(info.description || info.subtitle),
          img,
          imgFile: file,
          price,
          nutrition: info.nutrition || {},
          type: info.itemAttribute?.vegClassifier === "NONVEG" ? "nonveg" : info.isVeg ? "veg" : undefined,
        };
      });
    const name = safeStr(raw.title || raw.name || `Category ${idx + 1}`);
    return { id: raw.id ?? slugify(name), name, items, image48Id: raw.image48Id || raw.image || raw.img || "" };
  }

  // already normalized (items/menu)
  if (Array.isArray(raw.items) || Array.isArray(raw.menu)) {
    const arr = Array.isArray(raw.items) ? raw.items : raw.menu;
    const items = arr.map((it, i) => {
      const imageRel = it.imageRelPath || it.imageId || it.image || it.img || "";
      const img = Array.isArray(imageRel) ? String(imageRel[0] || "") : String(imageRel || "");
      const file = img ? img.split("/").pop() : "";
      return {
        id: String(it.id ?? `item-${i}`),
        name: safeStr(it.name || it.title),
        description: safeStr(it.description || it.subtitle),
        img,
        imgFile: file,
        price: Number(it.price) || (it.priceInPaise ? it.priceInPaise / 100 : 0) || 0,
        nutrition: it.nutrition || {},
        type: it.type || (it.isVeg ? "veg" : undefined),
      };
    });
    const name = safeStr(raw.name || raw.title || `Category ${idx + 1}`);
    return { id: raw.id ?? slugify(name), name, items, image48Id: raw.image48Id || raw.image || raw.img || "" };
  }

  // object map single key { "Salads": [...] }
  if (typeof raw === "object" && !Array.isArray(raw)) {
    const keys = Object.keys(raw);
    if (keys.length === 1 && Array.isArray(raw[keys[0]])) {
      const name = keys[0];
      const items = raw[name].map((it, i) => {
        const imageRel = it.imageRelPath || it.imageId || it.image || it.img || "";
        const img = Array.isArray(imageRel) ? String(imageRel[0] || "") : String(imageRel || "");
        const file = img ? img.split("/").pop() : "";
        return {
          id: String(it.id ?? `item-${i}`),
          name: safeStr(it.name || it.title),
          description: safeStr(it.description),
          img,
          imgFile: file,
          price: Number(it.price) || 0,
          nutrition: it.nutrition || {},
          type: it.type,
        };
      });
      return { id: slugify(name), name, items, image48Id: "" };
    }
  }

  // fallback
  const name = safeStr(raw.title || raw.name || `Category ${idx + 1}`);
  return { id: raw.id ?? slugify(name), name, items: Array.isArray(raw) ? raw : [], image48Id: raw.image48Id || raw.image || raw.img || "" };
};

/* ----------------------------
   Normalize all categories (flatten parent.categories)
----------------------------- */
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
    return Object.entries(data).map(([k, v], idx) => {
      if (Array.isArray(v)) return { id: slugify(k), name: k, items: v, image48Id: "" };
      return normalizeCategory({ name: k, ...v }, idx);
    });
  }
  return [];
};

/* ----------------------------
   Build categories
----------------------------- */
const categories = normalizeCategories(categoriesData);
const firstWithItems = categories.find((c) => c.items?.length > 0);
const defaultKey = firstWithItems?.id || categories[0]?.id || "default";

/* ----------------------------
   Component: visual design matching attached image
----------------------------- */
const Menu = () => {
  const [activeKey, setActiveKey] = useState(defaultKey);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // "all" | "veg" | "nonveg"
  const [openFilter, setOpenFilter] = useState(false);

  const activeCategory = categories.find((c) => c.id === activeKey) || categories[0] || null;

  // filter items by query
  const activeItems = useMemo(() => {
    const arr = (activeCategory?.items || []);
    const q = (query || "").toLowerCase().trim();
    return arr.filter((it) => {
      // search match
      const text = String((it.name || "") + " " + (it.description || "")).toLowerCase();
      if (q && !text.includes(q)) return false;
      // type filter
      if (typeFilter === "veg") {
        // accept items marked "veg" or isVeg truthy
        const t = (it.type || "").toString().toLowerCase();
        const isVegFlag = !!it.isVeg || t === "veg";
        return isVegFlag;
      }
      if (typeFilter === "nonveg") {
        const t = (it.type || "").toString().toLowerCase();
        const isNonVegFlag = t === "nonveg" || it.isVeg === 0 || it.isVeg === false;
        return isNonVegFlag;
      }
      return true;
    });
  }, [activeCategory, query, typeFilter]);

  return (
    <section className="menu-bg">
      <img
        alt="About Background"
        className="h-200 menubg absolute left-0 top-0 -z-10 w-full object-cover"
        src="img/menubg.svg"
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
          <h1 className="animate__animated animate__zoomIn mb-4 text-2xl font-bold md:text-4xl">
            Trending on the Menu
          </h1>
          <h2 className="quiklinks animate__animated animate__zoomIn text-3xl font-bold md:text-5xl">
            Most Loved at GreeNox
          </h2>
        </div>
      </div>


      <div className="flex gap-6 justify-center px-4 ">
        {/* left sidebar */}
        <aside className="custom-scrollbar sticky top-20 hidden w-80 flex-col gap-4 overflow-y-auto rounded-lg bg-white shadow-lg lg:flex">
          <div className="sticky top-20 bg-white  rounded-lg p-4 h-[100vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/logo.png" alt="logo" className="h-10 w-10 rounded" />
              <div>
                <div className="text-lg font-semibold">All Menu</div>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {categories.map((cat) => {
                const isActive = activeKey === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveKey(cat.id)}
                    className={`group flex items-center gap-3 w-full text-left rounded-md px-3 py-2 transition-colors ${isActive ? "bg-green-50 ring-1 ring-green-200" : "hover:bg-gray-50"}`}
                  >
                    <img
                      src={resolveItemImg(cat.image48Id || cat.image || "")}
                      alt={cat.name}
                      className="h-12 w-12 rounded-md object-cover flex-none"
                    />
                    <span className={`text-sm font-medium ${isActive ? "text-green-700" : "text-gray-700"}`}>{cat.name || "Unnamed"}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* main content */}
        <main className="flex-1">
          {/* top control bar */}
          <div className="bg-white rounded-lg  p-4 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-green-600">{activeCategory?.name || "All Menu"}</h3>
            </div>

            <div className="flex items-center gap-3 relative">
              {/* Filter dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFilter((s) => !s)}
                  className="px-4 py-2 bg-white border rounded text-sm inline-flex items-center gap-2"
                >
                  {typeFilter === "all" ? "Filter" : typeFilter === "veg" ? "Veg" : "Non‑Veg"} ▾
                </button>
                {openFilter && (
                  <div className="absolute left-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-30">
                    <div className="py-1">
                      <button
                        onClick={() => { setTypeFilter("all"); setOpenFilter(false); }}
                        className={`w-full text-left px-4 py-2 text-sm ${typeFilter === "all" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => { setTypeFilter("veg"); setOpenFilter(false); }}
                        className={`w-full text-left px-4 py-2 text-sm ${typeFilter === "veg" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                      >
                        Veg
                      </button>
                      <button
                        onClick={() => { setTypeFilter("nonveg"); setOpenFilter(false); }}
                        className={`w-full text-left px-4 py-2 text-sm ${typeFilter === "nonveg" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                      >
                        Non‑Veg
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Menu..."
                  className="border rounded-md py-2 pl-10 pr-3 w-72 focus:ring-2 focus:ring-green-300"
                  onKeyDown={(e) => { if (e.key === "Escape") setQuery(""); }}
                />
                <span className="absolute left-3 top-2 text-gray-400">🔍</span>
              </div> */}
            </div>
          </div>

          {/* card grid: 3 columns like attached */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeItems.length === 0 ? (
              <div className="col-span-full rounded-lg  p-6 text-center text-gray-500">No items found for this category.</div>
            ) : (
              activeItems.map((item, idx) => {
                const itemId = encodeURIComponent(item.id || slugify(item.name));
                const catId = encodeURIComponent(activeCategory?.id || slugify(activeCategory?.name || "all"));
                return (
                  <Link
                    key={item.id ?? idx}
                    to={`/menu/${catId}/${itemId}`}
                    className="group bg-white rounded-lg  p-4 flex flex-col justify-between hover:shadow-md transition"
                  >
                    <div className="flex gap-4">
                      {/* large left image */}
                      <div className="flex-none">
                        <img
                          src={resolveItemImg(item.img || item.imgFile)}
                          alt={item.name}
                          className="h-28 w-28 rounded-md object-cover"
                          onError={(e) => { e.currentTarget.src = "/img/placeholder.png"; }}
                        />
                      </div>

                      {/* text */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
                          <span className="ml-2">
                            {item.type === "nonveg" ? <img src="/img/non-veg.svg" alt="nonveg" className="h-5 w-5" /> : <img src="/img/veg.svg" alt="veg" className="h-5 w-5" />}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.description}</p>
                        <div className="mt-4">
                          <span className="text-base font-semibold text-green-600">₹{item.price || "—"}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </main>
      </div>
    </section>
  );
};

export default Menu;
