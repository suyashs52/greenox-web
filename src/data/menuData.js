export const categories = [
    { id: 1, name: "Salads" },
    { id: 2, name: "Meal" },
    { id: 3, name: "Sandwich" },
    { id: 4, name: "Hot Coffee" },
    { id: 5, name: "Shake & Smoothie" }
];

export const menuItems = {
    "Salads": [
        {
            id: 1,
            name: "Classic Caesar Salad",
            type: "Veg",
            category: "Veg Salads",
            description: "Lettuce, Parmesan Cheese, Cherry Tomato, Bell Peppers, Black Olives, Croutons, Caesar Dressing",
            price: 289,
            img: "/img/menu/Classic Caesar Salad.jpg",
            nutritionInfo: { calories: "101 kcal", carbs: "9.7g", protein: "5.9g", fat: "4.6g", fiber: "2.1g" },
            allergens: [],
            pairs: []
        },
        {
            id: 2,
            name: "Extravaganza Veggies Salad",
            type: "Veg",
            category: "Veg Salads",
            description: "Lettuce, Broccoli, Bell Peppers, Zucchini, French Beans, Cherry Tomato, Jalapeno, Black Olives, Cucumber, Choice of Dressing",
            price: 299,
            img: "/img/menu/Extravaganza Veggies Salad.jpg",
            nutritionInfo: { calories: "132 kcal", carbs: "22.3g", protein: "7g", fat: "2.4g", fiber: "9.7g" },
            allergens: [],
            pairs: []
        },
        {
            id: 3,
            name: "Protein Packed Salad",
            type: "Veg",
            category: "Veg Salads",
            description: "Soya Chunks, Mix Sprouts, Broccoli, Zucchini, Cherry Tomato, Chickpeas, Lettuce, Cottage Cheese, Almond, Mix Seeds, Black Olives, Choice of Dressing",
            price: 299,
            img: "/img/menu/Protein Packed Salad ( Veg ).jpg",
            nutritionInfo: { calories: "497 kcal", carbs: "49g", protein: "38g", fat: "19g", fiber: "11.8g" },
            allergens: [],
            pairs: []
        },
        {
            id: 4,
            name: "Basil Pesto Pasta Salad",
            type: "Veg",
            category: "Veg Salads",
            description: "Pesto pasta tossed with Broccoli, Mushrooms, Lettuce, Bell Peppers, Corn, Cherry Tomatoes & Olives",
            price: 299,
            img: "/img/menu/Basil Pesto Pasta Salad- 3.jpg",
            nutritionInfo: { calories: "426 kcal", carbs: "65g", protein: "10.5g", fat: "14.5g", fiber: "4.3g" },
            allergens: [],
            pairs: []
        },
        {
            id: 5,
            name: "Hummus Falafel Salad",
            type: "Veg",
            category: "Veg Salads",
            description: "Hummus, Falafel, Lettuce, Cucumber, Carrot Sticks, Lavas, Chickpeas, Cherry Tomatoes, Black Olives, Beetroot, Mix Seeds, Garlic Ranch Dressing",
            price: 299,
            img: "/img/menu/Hummus Falafel Salad.jpg",
            nutritionInfo: { calories: "516 kcal", carbs: "53.9g", protein: "20g", fat: "26.2g", fiber: "16.3g" },
            allergens: [],
            pairs: []
        },
        {
            id: 6,
            name: "Greek Salad With Avocado & Feta Cheese",
            type: "Veg",
            category: "Veg Salads",
            description: "Feta cheese, Cucumber, Onion, Bell Peppers, Lettuce, Avocado, Cherry Tomato, Black Olives, Choice of Dressing",
            price: 329,
            img: "/img/menu/Greek Salad with Avocado & Feta Cheese.jpg",
            nutritionInfo: { calories: "273 kcal", carbs: "11g", protein: "9g", fat: "19.1g", fiber: "5g" },
            allergens: [],
            pairs: []
        },
    ],

    "Meal": [

        {
            "id": 7,
            "name": "High Protein Chicken Bowl (200g) - Grilled Chicken / Peri Peri Chicken",
            "type": "Non Veg",
            "category": "Balanced Bowl",
            "description": "Bowl full of nutrient and delicious protein-rich chicken breast served with lettuce, french beans, and cherry tomato.",
            "price": 289,
            "img": "/img/menu/logo.jpg",
            "nutritionInfo": {
                "calories": "257 kcal",
                "carbs": "0 g",
                "protein": "43 g",
                "fat": "9 g",
                "fiber": "1 g"
            },
            "allergens": [],
            "pairs": []
        },
        {
            "id": 8,
            "name": "Caribbean Chicken Fillets",
            "type": "Non Veg",
            "category": "Balanced Bowl",
            "description": "Grilled chicken with Caribbean spices topped with cherry tomato, beans, parsley, and lettuce.",
            "price": 329,
            "img": "/img/menu/logo.jpg",
            "nutritionInfo": {
                "calories": "306 kcal",
                "carbs": "0.1 g",
                "protein": "54.3 g",
                "fat": "8.1 g",
                "fiber": "0 g"
            },
            "allergens": [],
            "pairs": []
        },
        {
            "id": 9,
            "name": "Grilled Chicken With Mashed Potato",
            "type": "Non Veg",
            "category": "Balanced Bowl",
            "description": "Grilled chicken served with mashed potatoes, side salad, and parsley. Choice of sauce: Marinara, Broccoli, or BBQ.",
            "price": 349,
            "img": "/img/menu/logo.jpg",
            "nutritionInfo": {
                "calories": "333 kcal",
                "carbs": "30.8 g",
                "protein": "30 g",
                "fat": "9.3 g",
                "fiber": "3.2 g"
            },
            "allergens": [],
            "pairs": []
        },
        {
            id: 10,
            name: "Paneer Steak With Mashed Potato",
            type: "Veg",
            category: "Balanced Bowl",
            description: "Paneer steak with mashed potatoes, side salad, and parsley. Choice of sauce: Marinara, Broccoli, or BBQ.",
            price: 329,
            "img": "/img/menu/logo.jpg",
            nutritionInfo: {
                calories: "407 kcal",
                carbs: "40 g",
                protein: "25.4 g",
                fat: "16 g",
                fiber: "5 g"
            },
            allergens: [],
            pairs: []
        },
        {
            id: 11,
            name: "Hummus Falafel Platter",
            type: "Veg",
            category: "Balanced Bowl",
            description: "Hummus, side salad, falafel, pickled beetroot, chickpeas, olives, crisp lavas, and tzatziki.",
            price: 329,
            "img": "/img/menu/logo.jpg",
            nutritionInfo: {
                calories: "737 kcal",
                carbs: "76.6 g",
                protein: "21.6 g",
                fat: "39.3 g",
                fiber: "12.3 g"
            },
            allergens: [],
            pairs: []
        }


    ],

    "Sandwich": [
        {
            "id": 12,
            "name": "Classic Sandwich",
            "type": "Veg",
            "category": "Sandwich",
            "description": "Brown bread sandwich stuffed with golden corn, bell pepper, onion, tomato, cucumber, and lettuce.",
            "price": 199,
            "img": "/img/menu/logo.jpg",
            "nutritionInfo": {
                "calories": "330 kcal",
                "carbs": "41.1 g",
                "protein": "8.4 g",
                "fat": "13.9 g",
                "fiber": "5.1 g"
            },
            "allergens": [],
            "pairs": []
        },
        {
            "id": 13,
            "name": "Corn & Cheese Sandwich",
            "type": "Veg",
            "category": "Sandwich",
            "description": "Brown bread sandwich with golden corn, cheese, chopped onion, capsicum, and tomato.",
            "price": 229,
            "img": "/img/menu/Corn Sandwich ( Cheese_ Paneer ).jpg",
            "nutritionInfo": {
                "calories": "319 kcal",
                "carbs": "43 g",
                "protein": "7 g",
                "fat": "12 g",
                "fiber": "5 g"
            },
            "allergens": [],
            "pairs": []
        },
        {
            "id": 14,
            "name": "Pesto Grilled Veggies Sandwich",
            "type": "Veg",
            "category": "Sandwich",
            "description": "Brown bread sandwich with broccoli, zucchini, bell pepper, onion, lettuce, and pesto sauce.",
            "price": 249,
            "img": "/img/menu/logo.jpg",
            "nutritionInfo": {
                "calories": "526 kcal",
                "carbs": "68 g",
                "protein": "14.9 g",
                "fat": "20.2 g",
                "fiber": "9.1 g"
            },
            "allergens": [],
            "pairs": []
        },
        {
            "id": 15,
            "name": "Paneer Tikka Sandwich",
            "type": "Veg",
            "category": "Sandwich",
            "description": "Brown bread sandwich with paneer tikka, bell pepper, onion, tomato, and lettuce.",
            "price": 249,
            "img": "/img/menu/logo.jpg",
            "nutritionInfo": {
                "calories": "531 kcal",
                "carbs": "65.8 g",
                "protein": "21 g",
                "fat": "19 g",
                "fiber": "8.1 g"
            },
            "allergens": [],
            "pairs": []
        },
        {
            "id": 16,
            "name": "Korean Chicken Sandwich",
            "type": "Non Veg",
            "category": "Sandwich",
            "description": "Brown bread sandwich with grilled chicken, bell pepper, onion, lettuce, and black olives.",
            "price": 279,
            "img": "/img/menu/logo.jpg",
            "nutritionInfo": {
                "calories": "432 kcal",
                "carbs": "61 g",
                "protein": "21.7 g",
                "fat": "8.9 g",
                "fiber": "7.8 g"
            },
            "allergens": [],
            "pairs": []
        }
    ],


    "Hot Coffee": [
        {
            "id": 17,
            "name": "Americano",
            "type": "Veg",
            "category": "Hot Coffee",
            "description": "Expertly crafted with a shot of premium espresso and hot water, delivering a deep rich flavor with a smooth finish.",
            "price": 169,
            "img": "/img/menu/logo.jpg",
            "nutritionInfo": {},
            "allergens": [],
            "pairs": []
        },
        {
            "id": 18,
            "name": "Cappuccino",
            "type": "Veg",
            "category": "Hot Coffee",
            "description": "A beautifully balanced blend of intense espresso, velvety steamed milk, and a cloud of frothy milk foam.",
            "price": 189,
            "img": "/img/menu/logo.jpg",
            "nutritionInfo": {},
            "allergens": [],
            "pairs": []
        },
        {
            "id": 19,
            "name": "Café Latte",
            "type": "Veg",
            "category": "Hot Coffee",
            "description": "An elegant mix of bold espresso and silky steamed milk, finished with a delicate foam layer for a mellow, creamy texture.",
            "price": 189,
            "img": "/img/menu/logo.jpg",
            "nutritionInfo": {},
            "allergens": [],
            "pairs": []
        },
        {
            "id": 20,
            "name": "Flat White",
            "type": "Veg",
            "category": "Hot Coffee",
            "description": "A rich and velvety coffee made with a double shot of espresso and steamed milk, topped with a thin layer of microfoam — stronger than a latte but smoother than a cappuccino.",
            "price": 189,
            "img": "/img/menu/logo.jpg",
            "nutritionInfo": {},
            "allergens": [],
            "pairs": []
        },
        {
            "id": 21,
            "name": "Macchiato",
            "type": "Veg",
            "category": "Hot Coffee",
            "description": "An authentic Italian-style coffee featuring a robust espresso base gently softened with a dash of steamed milk or foam.",
            "price": 199,
            "img": "/img/menu/logo.jpg",
            "nutritionInfo": {},
            "allergens": [],
            "pairs": []
        },
        {
            "id": 22,
            "name": "Café Mocha",
            "type": "Veg",
            "category": "Hot Coffee",
            "description": "A luxurious fusion of bold espresso, velvety steamed milk, and smooth chocolate sauce.",
            "price": 199,
            "img": "/img/menu/logo.jpg",
            "nutritionInfo": {},
            "allergens": [],
            "pairs": []
        }
    ],

    "Shake & Smoothie": [
        {
            "id": 23,
            "name": "Icy Strawberry Shake",
            "type": "Veg",
            "category": "Shake & Smoothies",
            "description": "Refreshing strawberry ice cream blended with milk for a smooth and creamy shake.",
            "price": 199,
            "img": "/img/menu/Icy Strawberry Shake.jpg",
            "nutritionInfo": {},
            "allergens": [],
            "pairs": []
        },
        {
            "id": 24,
            "name": "Whey Protein Shake",
            "type": "Veg",
            "category": "Shake & Smoothies",
            "description": "A protein-packed shake made with whey protein, milk, and banana for a healthy boost.",
            "price": 229,
            "img": "/img/menu/Whey Protein Shake .jpg",
            "nutritionInfo": {},
            "allergens": [],
            "pairs": []
        },
        {
            "id": 25,
            "name": "Dark Chocolate Shake",
            "type": "Veg",
            "category": "Shake & Smoothies",
            "description": "Indulgent dark chocolate ice cream blended with chilled milk for a rich chocolate flavor.",
            "price": 199,
            "img": "/img/menu/Dark Chocolate Shake .jpg",
            "nutritionInfo": {},
            "allergens": [],
            "pairs": []
        },
        {
            "id": 26,
            "name": "Peanut Butter Banana Shake",
            "type": "Veg",
            "category": "Shake & Smoothies",
            "description": "A creamy blend of peanut butter, banana, chocolate, and milk — packed with energy and flavor.",
            "price": 199,
            "img": "/img/menu/Peanut Butter Banana Shake.jpg",
            "nutritionInfo": {},
            "allergens": [],
            "pairs": []
        },
        {
            "id": 27,
            "name": "Mix Berry Shake",
            "type": "Veg",
            "category": "Shake & Smoothies",
            "description": "A vibrant mix of strawberry, blueberry, and milk for a refreshing fruity shake.",
            "price": 239,
            "img": "/img/menu/Mix Berry Shake.jpg",
            "nutritionInfo": {},
            "allergens": [],
            "pairs": []
        },
        {
            "id": 28,
            "name": "Choco Brownie Shake",
            "type": "Veg",
            "category": "Shake & Smoothies",
            "description": "Rich brownie and dark chocolate blended with milk for a decadent, dessert-style shake.",
            "price": 229,
            "img": "/img/menu/Choco Brownie Shake.jpg",
            "nutritionInfo": {},
            "allergens": [],
            "pairs": []
        },

    ]

};

export const slugify = (s = "") =>
    s
        .toString()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

export const menuIndexBySlug = (() => {
    if (typeof menuItems === "undefined") return {};
    return Object.keys(menuItems).reduce((acc, key) => {
        acc[slugify(key)] = menuItems[key];
        return acc;
    }, {});
})();

export const getGroupBySlug = (slug) => menuIndexBySlug[slug] || [];

export const findItemBySlugAndId = (slug, id) => {
    const group = menuIndexBySlug[slug];
    if (!group) return null;
    return group.find((it) => String(it.id) === String(id)) || null;
};