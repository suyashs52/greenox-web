import React from "react";
import { useParams, Link } from "react-router-dom";
import { findItemBySlugAndId, getGroupBySlug } from "../data/menuData";

const MenuItemDetails = () => {
  const { category: slug, id } = useParams();
  const item = findItemBySlugAndId(slug, id);

  if (!item) {
    const group = getGroupBySlug(slug);
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Item not found</h2>
        {group.length > 0 ? (
          <>
            <p className="mt-2">Available items in this category:</p>
            <ul className="mt-3 list-disc pl-5">
              {group.map((g) => (
                <li key={g.id}>
                  <Link
                    to={`/menu/${slug}/${g.id}`}
                    className="text-orange-500"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-2">Category not found.</p>
        )}
        <div className="mt-4">
          <Link to="/menu" className="text-blue-600">
            Back to menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <p className="mt-2 text-gray-700">{item.description}</p>
      <p className="mt-4 font-semibold">Price: ₹{item.price}</p>
      {item.img && (
        <img src={item.img} alt={item.name} className="mt-4 w-64 rounded" />
      )}
      <div className="mt-6">
        <Link to="/menu" className="text-blue-600">
          Back to menu
        </Link>
      </div>
    </div>
  );
};

export default MenuItemDetails;
