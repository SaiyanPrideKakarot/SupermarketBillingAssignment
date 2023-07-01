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
                            discount: null
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
                            discount: null
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
                            discount: null
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
                            discount: null
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

// Function to calculate total bill and amount saved
const calculateInvoice = (purchaseItems) => {
    let totalAmount = 0, totalSavedAmount = 0

    for (const purchaseItem of purchaseItems) {
        const category = referenceData.categories.find((c) => c.subcategories.some((subcat) => subcat.items.some((item) => item.name === purchaseItem.name)));

        if (category) {
            const subcategory = category.subcategories.find((subcat) => subcat.items.some((item) => item.name === purchaseItem.name));
            if (subcategory) {
                const item = subcategory.items.find((item) => item.name === purchaseItem.name);
                if (item) {
                    let itemAmount = 0

                    if (purchaseItem.unit === item.unit) {
                        itemAmount = purchaseItem.qty * item.price
                    } else {
                        // For weighted items, calculate price based on unit price and quantity
                        if (purchaseItem.unit === "kg") {
                            itemAmount = (purchaseItem.qty * 1000 * item.price) / (item.unit === "kg" ? 1 : 1000)
                        } else if (purchaseItem.unit === 'lt') {
                            itemAmount = (purchaseItem.qty * 1000 * item.price) / (item.unit === "lt" ? 1 : 1000)
                        }
                    }

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
    }

    return { totalAmount, totalSavedAmount }
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

// Generate Invoice
const invoice = calculateInvoice(purchaseItems)

// Output the invoice and amount saved
console.log("Following is the invoice that is generated based on the above items that customer has bought:");
console.log(`Customer: ${customerName}`);
console.log("\nItem Qty Amount");
for (const purchaseItem of purchaseItems) {
    console.log(
        `${purchaseItem.name} ${purchaseItem.qty}${purchaseItem.unit} ${(
            (referenceData.categories.find((c) =>
                c.subcategories.some((subcat) =>
                    subcat.items.some((item) => item.name === purchaseItem.name)
                )
            ) || {}).subcategories.find((subcat) =>
                subcat.items.some((item) => item.name === purchaseItem.name)
            ) || {}
        ).items.find((item) => item.name === purchaseItem.name).price.toFixed(2)} Rs`
    );
}
console.log("\nTotal Amount", invoice.totalAmount.toFixed(2), "Rs");
console.log(
    "\nYou Saved",
    invoice.totalSavedAmount.toFixed(2),
    "-",
    invoice.totalAmount.toFixed(2),
    "=",
    (invoice.totalSavedAmount - invoice.totalAmount).toFixed(2),
    "Rs"
);