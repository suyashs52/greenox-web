import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import categoriesData from "../img/categories.json";

// same slugify/normalizer logic used by FoodMenu
const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const normalizeCategory = (raw, idx = 0) => {
  // simple handling of common shapes
  if (!raw) return { id: `cat-${idx}`, name: `Category ${idx + 1}`, items: [] };

  // Swiggy-like card
  if (raw.title && Array.isArray(raw.itemCards)) {
    const items = raw.itemCards.map((cardObj, i) => {
      const info = cardObj?.card?.info || {};
      return {
        id: info.id ?? `item-${i}`,
        name: info.name ?? `Item ${i + 1}`,
        description: info.description ?? "",
        img: Array.isArray(info.imageRelPath) ? info.imageRelPath[0] : info.imageId || info.image || "",
        price: typeof info.price === "number" ? info.price / 100 : info?.priceString || 0,
      };
    });
    const name = raw.title || `Category ${idx + 1}`;
    return { id: raw.id ?? slugify(name), name, items };
  }

  // already normalized
  if (raw.name || raw.items) {
    return {
      id: raw.id ?? slugify(raw.name ?? `cat-${idx}`),
      name: raw.name ?? `Category ${idx + 1}`,
      items: Array.isArray(raw.items) ? raw.items : raw.menu || [],
    };
  }

  // object map entry { "Salads": [...] }
  if (typeof raw === "object" && !Array.isArray(raw)) {
    const keys = Object.keys(raw);
    if (keys.length === 1 && Array.isArray(raw[keys[0]])) {
      const name = keys[0];
      return { id: slugify(name), name, items: raw[name] };
    }
  }

  // fallback
  return {
    id: `cat-${idx}`,
    name: String(raw) || `Category ${idx + 1}`,
    items: Array.isArray(raw) ? raw : [],
  };
};

const normalizeCategories = (data) => {
  if (!data) return [];

  // top-level array: flatten entries and handle nested `categories` arrays (e.g. "Salads" -> categories: [...])
  if (Array.isArray(data)) {
    return data.flatMap((entry, i) => {
      // if entry contains nested subcategories
      if (Array.isArray(entry.categories) && entry.categories.length > 0) {
        const parentSlug = slugify(entry.title || entry.name || `parent-${i}`);
        return entry.categories.map((sub, j) => {
          const cat = normalizeCategory(sub, `${i}-${j}`);
          const subSlug = slugify(sub.title || sub.name || `sub-${j}`);
          cat.id = cat.id ?? `${parentSlug}--${subSlug}`;
          cat.parent = entry.title ?? parentSlug;
          return cat;
        });
      }

      // otherwise normalize the entry itself
      return [normalizeCategory(entry, i)];
    });
  }

  // object map: { "Salads": [...] } or { key: { itemCards / items / categories } }
  if (typeof data === "object") {
    return Object.entries(data).flatMap(([k, v], idx) => {
      // v is array of items
      if (Array.isArray(v)) return [{ id: slugify(k), name: k, items: v }];

      // v contains nested categories
      if (v && Array.isArray(v.categories)) {
        return v.categories.map((sub, j) => {
          const cat = normalizeCategory(sub, `${idx}-${j}`);
          cat.id = cat.id ?? `${slugify(k)}--${slugify(sub.title || sub.name || `sub-${j}`)}`;
          cat.parent = k;
          return cat;
        });
      }

      // v has itemCards / items / menu
      if (v && (v.itemCards || v.items || v.menu)) {
        const base = { title: k, ...v };
        const cat = normalizeCategory(base, idx);
        cat.id = cat.id ?? slugify(k);
        cat.name = k;
        return [cat];
      }

      // fallback to single-key normalize
      return [normalizeCategory({ [k]: v }, idx)];
    });
  }

  return [];
};

// add image require.context maps and resolver
let menuLgImages = {};
let menuSmImages = {};
try {
  const reqLg = require.context("../img/menu/lg", false, /\.(png|jpe?g|svg)$/);
  reqLg.keys().forEach((k) => {
    menuLgImages[k.replace("./", "")] = reqLg(k);
  });
} catch (err) {
  // ignore if no lg folder or context fails
}
try {
  const reqSm = require.context("../img/menu/sm", false, /\.(png|jpe?g|svg)$/);
  reqSm.keys().forEach((k) => {
    menuSmImages[k.replace("./", "")] = reqSm(k);
  });
} catch (err) {
  // ignore if no sm folder or context fails
}

const resolveItemImg = (imgPath) => {
  if (!imgPath) return "/img/placeholder.png";
  if (imgPath.startsWith("http")) return imgPath;
  // strip leading slashes
  const base = imgPath.replace(/^\/+/, "");
  const filename = base.split("/").pop();

  // prefer large image from src/img/menu/lg/
  if (filename && menuLgImages[filename]) return menuLgImages[filename];
  // fallback to small images bundled
  if (filename && menuSmImages[filename]) return menuSmImages[filename];

  // attempt dynamic require attempts (best-effort)
  try {
    return require(`../img/menu/lg/${filename}`);
  } catch (e) { }
  try {
    return require(`../img/menu/sm/${filename}`);
  } catch (e) { }

  // if the imgPath already points to public path (e.g. img/..., return as public URL
  if (base.startsWith("img/") || base.startsWith("menu/")) return `/${base}`;

  // final fallback
  return "/img/placeholder.png";
};

// parse nutrition numbers from free-form description text
const parseNutritionFromText = (text = "") => {
  if (!text) return {};
  const norm = (s) => (s == null ? null : Number(String(s).replace(/[^\d.]/g, "").replace(/^\./, "0") || null));
  const find = (re) => {
    const m = String(text).match(re);
    if (!m) return null;
    return norm(m[1]?.replace(/\s+/g, ""));
  };
  // common patterns in your JSON: "energy -516 kcal", "carbs-53. 9g", "protein-20g", "lipid fat-26. 2g"
  const calories = find(/(?:energy|energy[:\s-]*)([\d.,]+)/i) || find(/([\d.,]+)\s*kcal/i);
  const carbs = find(/(?:carbs|carbohydrates?)[:\s-]*([\d.,]+)/i) || find(/carbs[-\s]*([\d.,]+)/i);
  const protein = find(/protein[:\s-]*([\d.,]+)/i) || find(/protien[:\s-]*([\d.,]+)/i);
  const fat = find(/(?:lipid\s*fat|lipid|fat)[:\s-]*([\d.,]+)/i) || find(/fat[-\s]*([\d.,]+)/i);
  const fiber = find(/fiber[:\s-]*([\d.,]+)/i) || find(/fibre[:\s-]*([\d.,]+)/i);
  const any = { calories, protein, carbs, fat, fiber };
  // remove nulls
  Object.keys(any).forEach((k) => { if (any[k] == null) delete any[k]; });
  return any;
};

export default function MenuDetails() {
  const { category: categoryParam, id: idParam } = useParams();
  const navigate = useNavigate();

  const [openNutrition, setOpenNutrition] = useState(true);

  const { menuArray, itemsByKey } = useMemo(() => {
    const cats = normalizeCategories(categoriesData);
    const catsNorm = cats.map((c) => {
      const items = (c.items || []).map((it) => {
        const item = { ...it, _categoryId: c.id, _categoryName: c.name };

        // helper to normalize numeric strings to Number
        const normVal = (v) => {
          if (v == null) return null;
          const s = String(v).replace(/[^\d.]/g, "").replace(/^\./, "0");
          const n = s === "" ? null : Number(s);
          return Number.isFinite(n) ? n : null;
        };

        // derive normalized nutrition from any existing nutrition object (case-insensitive keys)
        let normalized = {};
        if (item.nutrition && typeof item.nutrition === "object") {
          Object.entries(item.nutrition).forEach(([k, v]) => {
            const key = String(k || "").toLowerCase().replace(/\s+/g, "");
            if (key.includes("energy")) normalized.calories = normalized.calories ?? normVal(v);
            else if (key.includes("carb")) normalized.carbs = normalized.carbs ?? normVal(v);
            else if (key.includes("prot")) normalized.protein = normalized.protein ?? normVal(v);
            else if (key.includes("lipid") || key.includes("fat")) normalized.fat = normalized.fat ?? normVal(v);
            else if (key.includes("fiber") || key.includes("fibre")) normalized.fiber = normalized.fiber ?? normVal(v);
          });
        }

        // fallback: parse from free-form description / subtitle / nutritionText
        if (Object.keys(normalized).length === 0) {
          normalized = parseNutritionFromText(item.description || item.subtitle || item.nutritionText || "") || {};
        }

        if (Object.keys(normalized).length > 0) item.nutrition = normalized;

        return item;
      });
      return { ...c, items };
    });

    const arr = catsNorm.flatMap((c) => c.items || []);
    const map = {};
    catsNorm.forEach((c) => {
      map[c.id] = c.items || [];
      map[slugify(c.name)] = c.items || [];
      map[c.name] = c.items || [];
    });

    return { categories: catsNorm, menuArray: arr, itemsByKey: map };
  }, []);

  const catKey = decodeURIComponent(categoryParam || "");
  const idRaw = decodeURIComponent(idParam || "");

  const candidates =
    itemsByKey[catKey] ||
    menuArray.filter(
      (it) =>
        it._categoryId === catKey ||
        slugify(it._categoryName) === catKey ||
        it._categoryName === catKey
    );

  const item =
    candidates.find((it) => String(it.id) === idRaw) ||
    candidates.find((it) => slugify(it.name || "") === slugify(idRaw || "")) ||
    candidates.find((it) => it.name === idRaw);

  if (!item) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-4 text-2xl font-semibold">Item not found</h1>
        <p className="mb-4">Category: {catKey || "—"}, ID: {idRaw || "—"}</p>
        <Link to="/menu" className="text-green-600 underline">
          Back to menu
        </Link>
      </main>
    );
  }

  // when rendering, use resolveItemImg
  const itemImgSrc = resolveItemImg(item.imgFile || item.img || item.image || "");
  const nutrition = item.nutrition || {};
  const hasNutrition =
    nutrition && typeof nutrition === "object" &&
    ["calories", "protein", "carbs", "fat", "fiber"].some(
      (k) => nutrition[k] != null && !Number.isNaN(Number(nutrition[k]))
    );
  // allergens data (unused in current UI)

  return (
    // ensure section is positioned for absolute background
    <section>
      {/* Hero Section */}
      <div className="relative mt-20 h-[300px]">
        <img
          alt="About Background"
          className="menubg absolute inset-0 -z-10 w-full h-full object-cover"
          src="/img/menubg.svg"
        />
      </div>

      {/* MAIN BOX */}
      <main className="main_box mx-auto max-w-7xl px-6">
        <button
          type="button"
          className="mb-6 inline-block text-white"
          onClick={() => {
            // prefer browser back; fallback to /menu/:category so the Menu page can pick the active tab
            if (window.history.length > 1) {
              window.history.back();
            } else {
              // try to navigate to the category param if available, otherwise use item's category id/name
              const cat = encodeURIComponent(catKey || item._categoryId || slugify(item._categoryName || ""));
              navigate(cat ? `/menu/${cat}` : "/menu");
            }
          }}
        >
          ← Back
        </button>

        <div className="mx-auto max-w-7xl rounded-lg bg-white px-4 py-4">
          <div className="grid mb-4 grid-cols-1 gap-8 md:grid-cols-2">
            {/* Image */}
            <div className="relative overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-r-none">
              <img src={itemImgSrc} alt={item.name} className="w-full h-100 rounded-lg  object-cover" loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/img/placeholder.png"; }} />
            </div>

            {/* Details */}
            <div className="p-8">
              <h1 className="mb-2 text-3xl font-extrabold text-gray-900">
                {item.name}
              </h1>
              <p className="mb-4 text-sm text-gray-500">{item.subtitle}</p>

              {/* Calories & Price */}
              <div className="mb-6 flex items-center gap-6">
                <div>
                  <div className="text-lg text-gray-500 font-bold">Price <span className="font-bold ml-3 text-orange-500"> ₹{item.price}</span> </div>

                </div>
              </div>

              <p className="mb-6 text-gray-700 leading-relaxed">{item.description}</p>

              {/* Extra chips: category + type */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                {item._categoryName && (
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    Category: {item._categoryName}
                  </span>
                )}

                {item.type && (
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {item.type}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ----------- NUTRITION SECTION ----------- */}
      {hasNutrition && (
        <div className="freshmealplan mx-auto mt-16 w-full py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="mb-8 text-center text-4xl font-extrabold text-green-500">
              Nutritional Information
            </h1>

            {/* Nutrition collapsible box */}
            <div className="mt-6 rounded-lg border border-gray-100 bg-white">
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpenNutrition((s) => !s)}
                aria-expanded={openNutrition}
              >
                <div>
                  <div className="text-2xl font-semibold text-gray-800">
                    Nutrition summary
                  </div>
                </div>

                <svg
                  className={`h-5 w-5 transform transition-transform ${openNutrition ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openNutrition && (
                <div className="border-t border-gray-100 px-6 py-5">
                  <div className="mb-8 grid grid-cols-5 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-500">
                        {nutrition.calories ?? "—"}
                      </div>
                      <div className="mt-1 text-sm text-gray-600">Calories</div>
                    </div>

                    <div>
                      <div className="text-2xl font-bold text-green-500">
                        {nutrition.protein ?? "—"}
                      </div>
                      <div className="mt-1 text-sm text-gray-600">Protein</div>
                    </div>

                    <div>
                      <div className="text-2xl font-bold text-green-500">
                        {nutrition.carbs ?? "—"}
                      </div>
                      <div className="mt-1 text-sm text-gray-600">Total Carbs</div>
                    </div>

                    <div>
                      <div className="text-2xl font-bold text-green-500">
                        {nutrition.fat ?? "—"}
                      </div>
                      <div className="mt-1 text-sm text-gray-600">Total Fat</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">
                        {nutrition.fiber ?? "—"}
                      </div>
                      <div className="mt-1 text-sm text-gray-600">Fiber</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Allergens section removed (not used) */}
          </div>
        </div>
      )}
    </section>

  );
}