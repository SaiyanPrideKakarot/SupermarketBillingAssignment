const referenceData = {
    categories: [
        {
            name: "Produce",
            discount: 0.1,
            subcategories: [
                {
                    name: "Fruits",
                    discount: 0.18,
                    items: [
                        {
                            name: "Apple",
                            unit: "kg",
                            price: 50,
                            discount: 0.25  // Buy 3kg Get 1kg Free i.e. 25%
                        },
                        {
                            name: "Orange",
                            unit: "kg",
                            price: 80,
                            discount: 0.2
                        }
                    ]
                },
                {
                    name: "Veg",
                    discount: 0.05,
                    items: [
                        {
                            name: "Potato",
                            unit: "kg",
                            price: 30,
                            discount: 0.285714286 // Buy 5kg Get 2kg Free i.e. 28.5714286%
                        },
                        {
                            name: "Tomato",
                            unit: "kg",
                            price: 70,
                            discount: 0.1
                        }
                    ]
                }
            ]
        },
        {
            name: "Dairy",
            discount: 0.15,
            subcategories: [
                {
                    name: "Milk",
                    discount: 0.2,
                    items: [
                        {
                            name: "Cow Milk",
                            unit: "lt",
                            price: 50,
                            discount: 0.25 // Buy 3lt Get 1lt Free i.e. 25%
                        },
                        {
                            name: "Soy Milk",
                            unit: "lt",
                            price: 40,
                            discount: 0.1
                        }
                    ]
                },
                {
                    name: "Cheese",
                    discount: 0.2,
                    items: [
                        {
                            name: "Cheddar",
                            unit: "kg",
                            price: 50,
                            discount: 0.3333 // Buy 2kg Get 1kg Free i.e. 33.33%
                        },
                        {
                            name: "Gouda",
                            unit: "kg",
                            price: 80,
                            discount: 0.1
                        }
                    ]
                }
            ]
        }
    ]
}

// Sample Input
const customerName = "Anish Kumar"
const purchaseItems = [
    { name: "Apple", unit: "kg", qty: 6 },
    { name: "Orange", unit: "kg", qty: 2 },
    { name: "Potato", unit: "kg", qty: 14 },
    { name: "Tomato", unit: "kg", qty: 3 },
    { name: "Cow Milk", unit: "lt", qty: 8 },
    { name: "Gouda", unit: "kg", qty: 2 }
]

console.log("\nFollowing is the invoice that is generated based on the above items that customer has bought:");
console.log(`Customer: ${customerName}`);
console.log("\nItem Qty Amount");

let totalAmount = 0, totalSavedAmount = 0, itemAmount = 0;
let TAWD = 0;
for (let i = 0; i < purchaseItems.length; i++) {
    const category = referenceData.categories.find((c) => c.subcategories.some((subcat) => subcat.items.some((item) => item.name === purchaseItems[i].name)));

    if (category) {
        const subcategory = category.subcategories.find((subcat) => subcat.items.some((item) => item.name === purchaseItems[i].name));
        if (subcategory) {
            const item = subcategory.items.find((item) => item.name === purchaseItems[i].name);
            if (item) {
                // let itemAmount = 0

                if (purchaseItems[i].unit === item.unit) {
                    itemAmount = purchaseItems[i].qty * item.price
                } else {
                    // For weighted items, calculate price based on unit price and quantity
                    if (purchaseItems[i].unit === "kg") {
                        itemAmount = (purchaseItems[i].qty * 1000 * item.price) / (item.unit === "kg" ? 1 : 1000)
                    } else if (purchaseItems[i].unit === 'lt') {
                        itemAmount = (purchaseItems[i].qty * 1000 * item.price) / (item.unit === "lt" ? 1 : 1000)
                    }
                }

                // Total Amount Without Discount(TAWD)
                TAWD += itemAmount

                // Apply the maximum discount from the category and item discounts
                let maxDiscount = Math.max(category.discount, subcategory.discount, item.discount);

                // Calculate the saved amount
                let savedAmount = itemAmount * maxDiscount
                totalSavedAmount += savedAmount

                // Deduct the saved amount from the item amount to get the final amount
                itemAmount -= savedAmount

                totalAmount += itemAmount
            }
        }
    }
    console.log(purchaseItems[i].name, (purchaseItems[i].qty).toString(), purchaseItems[i].unit, itemAmount.toFixed(2));
}
console.log("\nTotal Amount", totalAmount.toFixed(2), "Rs");
console.log(
    "\nYou Saved",
    TAWD.toFixed(2),
    "-",
    totalAmount.toFixed(2),
    "=",
    (TAWD - totalAmount).toFixed(2),
    "Rs"
);