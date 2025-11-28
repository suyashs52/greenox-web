import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { categories, menuItems } from "../data/menuItems";
import categories_new from "../img/categories.json";
// helper: slugify and titleize
const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const titleize = (s = "") =>
  s
    .toString()
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase())
    .trim();

const placeholderImg = "/img/menu/logo.jpg";

export default function FoodMenu() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // normalize raw menu: flat array + map by slug-key (group name)
  const { menuArray, itemsByKey } = useMemo(() => {
    // create flat array of all items (from the explicit menuItems groups)
    const arr = Object.values(menuItems).flatMap((v) =>
      Array.isArray(v) ? v : [],
    );

    // build itemsByKey ONLY from the explicit menuItems groups (avoid mixing by item.category)
    const map = Object.entries(menuItems).reduce((acc, [groupName, items]) => {
      const key = slugify(groupName);
      acc[key] = Array.isArray(items) ? items.slice() : [];
      return acc;
    }, {});

    return { menuArray: arr, itemsByKey: map };
  }, []);

  // ensure we can accept categories exported as strings or objects; fallback to menuItems keys
  const rawCategories = Array.isArray(categories)
    ? categories
    : Object.keys(menuItems).map((k) => k);

  const ALL_KEY = "All Menu"; // use raw name as active key

  // build left categories list from categories array (All first)
  const categoryList = useMemo(() => {
    const total = menuArray.length;
    const list = [
     // { key: ALL_KEY, name: "All Menu", slug: slugify(ALL_KEY), count: total },
    ];

    // rawCategories.forEach((c) => {
    //   const name = typeof c === "string" ? c : String(c?.name ?? "");
    //   if (!name || name === ALL_KEY) return;
    //   const slug = slugify(name);
    //   const count = itemsByKey[slug]?.length ?? 0;
    //   // keep both raw name (key) and slug for lookups
    //   list.push({ key: name, name, slug, count });
    // });

    categories_new.forEach((item, index) =>{
      console.log(item);
      debugger;
       const slug = slugify(item.title);
       const count = 0;
       const title = item.title;
      list.push({ key: index, title, slug, count });
  });

    return list;
  }, [rawCategories, menuArray, itemsByKey]);

  // set default active to ALL_KEY so page shows full menu by default
  const [activeKey, setActiveKey] = useState(ALL_KEY);
  const [optionsOpen, setOptionsOpen] = useState(false); // <-- add this
  const [dietFilter, setDietFilter] = useState("all"); // "all" | "veg" | "nonveg"

  const activeItems = useMemo(() => {
    const applyDiet = (list = []) => {
      if (dietFilter === "all") return list;
      return list.filter((it) => {
        const t = String(it.type || "").toLowerCase();
        const isNon =
          t.includes("non") ||
          t.includes("non-veg") ||
          t.includes("nonveg") ||
          t.includes("non veg");
        return dietFilter === "veg" ? !isNon : isNon;
      });
    };

    const qSearch = (searchQuery || "").toString().trim().toLowerCase();
    if (qSearch) {
      const result = menuArray.filter((it) =>
        `${it.name || ""} ${it.description || ""}`
          .toLowerCase()
          .includes(qSearch),
      );
      return applyDiet(result);
    }

    // show full menu only when ALL_KEY is selected (apply diet filter too)
    if (activeKey === ALL_KEY) return applyDiet(menuArray);

    // prefer lookup by slug of the activeKey (itemsByKey built on slugs)
    const activeSlug = slugify(activeKey);
    if (itemsByKey[activeSlug] && itemsByKey[activeSlug].length)
      return applyDiet(itemsByKey[activeSlug]);

    // fallback: fuzzy match using readable name
    const q = activeKey.replace(/-/g, " ");
    const baseList = menuArray.filter((it) =>
      `${it.name || ""} ${it.description || ""}`.toLowerCase().includes(q),
    );

    return applyDiet(baseList);
  }, [activeKey, ALL_KEY, menuArray, itemsByKey, searchQuery, dietFilter]);

  // add this line so links use slugified category (no spaces / %20)
  const activeSlug = slugify(activeKey);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = placeholderImg;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput || "");
  };
  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

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
          <h2 className="animate__animated animate__zoomIn text-3xl font-bold md:text-5xl">
            Most Loved at GreeNox
          </h2>
        </div>
      </div>
      <div className="mx-auto w-full px-4">
        <div className="flex gap-6">
          {/* Left categories sidebar */}
          <aside
            className="custom-scrollbar sticky top-20 hidden w-80 flex-col gap-4 overflow-y-auto rounded-lg bg-white shadow-lg lg:flex"
            style={{ maxHeight: "calc(100vh - 6rem)" }}
          >
            <nav className="flex-1">
              <ul className="space-y-1">
                {categoryList.map((cat, idx) => {
                  const isActive = activeKey === cat.key;
                  const thumbPath =
                    cat.thumb || `/img/menu/thumbs/${slugify(cat.key)}.jpg`;
                  return (
                    <li key={`${cat.slug ?? slugify(cat.key)}-${idx}`}>
                      <button
                        type="button"
                        onClick={() => setActiveKey(cat.key)}
                        className={`flex w-full items-center gap-4 px-4 py-2 text-left ${isActive ? "border-l-4 border-green-600 bg-white" : "bg-white"}`}
                      >
                        <div className="h-12 w-12 flex-none overflow-hidden rounded-md bg-gray-100">
                          <ThumbImage
                            cat={cat}
                            alt={cat.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-md font-small text-gray-900">
                            {cat.name}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-4 px-2">
              <div className="rounded-lg bg-gradient-to-r from-green-600 to-teal-500 p-3 text-white">
                <div className="text-xs">Greenox Food Ltd</div>
                <div className="mt-1 text-sm font-semibold">
                  Healthy food & meals
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <div className="serchpanel mb-4 flex items-center justify-between rounded bg-white p-3 shadow-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-green-500">
                {categoryList.find((c) => c.key === activeKey)?.name ?? "Menu"}

                {/* Filter */}
                <div className="relative ml-6 inline-block text-left">
                  <button
                    type="button"
                    onClick={() => setOptionsOpen((s) => !s)}
                    className="shadow-xs inline-flex items-center gap-4 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                    aria-haspopup="true"
                    aria-expanded={optionsOpen}
                  >
                    Filter
                    <svg
                      className="h-4 w-4 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z" />
                    </svg>
                  </button>

                  {optionsOpen && (
                    <div
                      className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                      role="menu"
                    >
                      <div className="py-1">
                        {/* <button
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${dietFilter === "all" ? "bg-gray-50 font-semibold" : "text-gray-700"}`}
                        role="menuitem"
                        onClick={() => {
                          setDietFilter("all");
                          setOptionsOpen(false);
                        }}
                      >
                        All
                      </button> */}
                        <button
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${dietFilter === "veg" ? "bg-gray-50 font-semibold" : "text-gray-700"}`}
                          role="menuitem"
                          onClick={() => {
                            setDietFilter("veg");
                            setOptionsOpen(false);
                          }}
                        >
                          Veg Foods
                        </button>
                        <button
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${dietFilter === "nonveg" ? "bg-gray-50 font-semibold" : "text-gray-700"}`}
                          role="menuitem"
                          onClick={() => {
                            setDietFilter("nonveg");
                            setOptionsOpen(false);
                          }}
                        >
                          Non-Veg Foods
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {/* end replacement */}
              </h2>

              <form
                className="relative w-[400px] max-w-[100vw]"
                onSubmit={handleSearchSubmit}
              >
                <label
                  htmlFor="default-search"
                  className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search Menu..."
                  />
                  <button
                    type="submit"
                    className="absolute bottom-2.5 right-2.5 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    Search
                  </button>
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute bottom-2.5 right-24 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {activeItems.map((item, idx) => {
                const itemId =
                  typeof item.id !== "undefined"
                    ? String(item.id)
                    : encodeURIComponent(String(item.name ?? `item-${idx}`));
                return (
                  <Link
                    key={`${activeKey}-${itemId}`}
                    to={`/menu/${encodeURIComponent(activeSlug)}/${encodeURIComponent(itemId)}`}
                    className="group flex items-start gap-4 rounded-lg bg-white p-4 shadow-lg transition-shadow hover:shadow-lg"
                  >
                    <div className="relative flex-none">
                      <img
                        src={item.img || placeholderImg}
                        onError={handleImgError}
                        alt={String(item.name)}
                        className="h-32 w-32 rounded-lg object-cover"
                      />

                      {/* Veg / Non-Veg badge — check item.type or fallback to "Veg" */}
                      <span
                        className="absolute right-1 top-1 z-10 flex h-5 w-5 items-center justify-center shadow-md"
                        title={
                          item.type
                            ? String(item.type).toLowerCase().includes("non")
                              ? "Non Veg"
                              : "Veg"
                            : "Veg"
                        }
                      >
                        {item.type &&
                          String(item.type).toLowerCase().includes("non") ? (
                          // Non-veg: red dot
                          <img src="/img/non-veg.svg" alt="nonveg" />
                        ) : (
                          // Veg: green leaf
                          <img src="/img/veg.svg" alt="veg" />
                        )}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 group-hover:text-green-600">
                        {item.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                        {item.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-base font-semibold text-green-600">
                          {item.price
                            ? String(item.price).startsWith("₹")
                              ? item.price
                              : `₹${item.price}`
                            : ""}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Try multiple candidate paths for a category thumbnail.
 * Falls back to /img/menu/placeholder.jpg when none found.
 */
function ThumbImage({ cat = {}, className = "", alt = "" }) {
  const baseName = cat.slug ?? slugify(cat.key ?? cat.name ?? "");
  const candidates = [
    cat.thumb, // explicit path if available
    `/img/menu/thumbs/${baseName}.jpg`,
    `/img/menu/thumbs/${baseName.replace(/-/g, "")}.jpg`,
    `/img/menu/thumbs/${baseName.replace(/-/g, "_")}.jpg`,
    `/img/menu/thumbs/${encodeURIComponent(cat.name || baseName)}.jpg`,
  ].filter(Boolean);

  const [idx, setIdx] = useState(0);
  const src = candidates[idx] || "/img/menu/salads.jpg";

  return (
    <img
      src={encodeURI(src)}
      alt={alt || cat.name}
      className={className}
      onError={(e) => {
        // try next candidate, then finally placeholder
        e.currentTarget.onerror = null;
        if (idx < candidates.length - 1) {
          setIdx((i) => i + 1);
        } else {
          e.currentTarget.src = "/img/menu/salads.jpg";
        }
      }}
    />
  );
}
