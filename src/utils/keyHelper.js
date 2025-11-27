export function makeKey(prefix = "k", item, idx) {
    // item may be primitive, object, or undefined
    if (item == null) return `${prefix}-${idx}`;
    if (typeof item === "object") {
        // use id if available, otherwise fallback to index
        if ("id" in item && (typeof item.id === "string" || typeof item.id === "number")) {
            return `${prefix}-${String(item.id)}`;
        }
        return `${prefix}-${idx}`;
    }
    // primitive
    return `${prefix}-${String(item)}`;
}