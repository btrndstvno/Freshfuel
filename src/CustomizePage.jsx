import React, { useState } from "react";
import { Link } from "react-router-dom"; // untuk navigasi ke Home

// Warna real berdasarkan color tone Google / warna khas bahan
const ingredientColors = {
  "Apple Juice": "#f8d49d",
  "Mango Nectar": "#ffc94b",
  "Coconut": "#f5f5f5",
  "Milk": "#ffffff",
  "Yogurt": "#eeeeee",

  "Strawberry": "#f44336",
  "Blueberry": "#4b0082",
  "Raspberry": "#c2185b",
  "Mango": "#ffb300",
  "Banana": "#fff176",

  "Oats & Muesli": "#e0c097",
  "Chia Seeds": "#333333",
  "Cinnamon": "#a0522d",
  "Peanut Butter": "#d2691e",
  "Cocoa Powder": "#5d4037",

  "Electrolyte": "#cceeff",
  "Vitamin C": "#ff9800",
  "Collagen": "#f8bbd0",
  "Charcoal": "#2f2f2f",
  "Green Spirulina": "#006400"
};

const ingredients = {
  "LIQUID BASE": ["Apple Juice", "Mango Nectar", "Coconut", "Milk", "Yogurt"],
  "FRUITS": ["Strawberry", "Blueberry", "Raspberry", "Mango", "Banana"],
  "DRY INGREDIENTS": ["Oats & Muesli", "Chia Seeds", "Cinnamon", "Peanut Butter", "Cocoa Powder"],
  "BOOSTERS": ["Electrolyte", "Vitamin C", "Collagen", "Charcoal", "Green Spirulina"]
};

const categoryLimits = {
  "LIQUID BASE": 2,
  "FRUITS": 3,
  "DRY INGREDIENTS": Infinity,
  "BOOSTERS": Infinity
};

const getColorForItem = (item) => ingredientColors[item] || "#ddd";

const isDark = (hex) => {
  if (!hex) return false;
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

export default function CustomizePage() {
  const [customItems, setCustomItems] = useState([]);
  const [smoothieName, setSmoothieName] = useState("");

  const addIngredient = (item, category) => {
    const selectedItemsInCategory = customItems.filter((i) =>
      ingredients[category].includes(i)
    );

    if (
      selectedItemsInCategory.length < categoryLimits[category] &&
      !customItems.includes(item)
    ) {
      setCustomItems([...customItems, item]);
    }
  };

  const removeIngredient = (item) => {
    setCustomItems(customItems.filter((i) => i !== item));
  };

  const buildWhatsAppMessage = () => {
    let text = `Hi Freshfuel! Saya ingin pesan smoothie dengan kombinasi berikut:\n\n`;
    text += `🥤 Smoothie Name: ${smoothieName}\n\n`;

    Object.entries(ingredients).forEach(([category, items]) => {
      const selectedItems = items.filter((item) => customItems.includes(item));
      if (selectedItems.length > 0) {
        text += `${category}:\n`;
        selectedItems.forEach((item) => {
          text += `- ${item}\n`;
        });
        text += `\n`;
      }
    });

    text += `Terima kasih!`;
    return text;
  };

  const handleCustomizeClick = () => {
    if (smoothieName.trim()) {
      const waURL = `https://wa.me/6281222207624?text=${encodeURIComponent(buildWhatsAppMessage())}`;
      window.open(waURL, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 text-center">
      {/* Tombol Home */}
      <div className="flex justify-start mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-900 font-semibold text-sm hover:underline hover:text-blue-600 transition"
        >
          <span className="text-lg">🏠</span>
          <span>Back to Home</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-red-700 mb-8">Let's build your smoothie!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Kolom Kiri - Bahan */}
        <div>
          {Object.entries(ingredients).map(([category, items], idx) => (
            <div key={idx} className="mb-6">
              <h3 className="font-bold text-lg mb-2 text-gray-800">{category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {items.map((item) => {
                  const bg = getColorForItem(item);
                  const textColor = isDark(bg) ? "text-white" : "text-black";
                  const isDisabled =
                    customItems.filter((i) => ingredients[category].includes(i))
                      .length >= categoryLimits[category] &&
                    !customItems.includes(item);

                  return (
                    <button
                      key={item}
                      onClick={() => addIngredient(item, category)}
                      disabled={isDisabled}
                      className={`border rounded-lg p-2 text-sm hover:scale-105 transition ${
                        isDisabled ? "opacity-50 cursor-not-allowed" : textColor
                      }`}
                      style={{ backgroundColor: bg }}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Kolom Tengah - Gelas dan Form */}
        <div className="flex flex-col items-center justify-between gap-6">
          {/* Gelas */}
          <div className="relative h-[400px] w-40 border-4 border-black rounded-b-3xl overflow-hidden bg-white flex flex-col justify-end">
            {customItems.map((item, idx) => {
              const bg = getColorForItem(item);
              const textColor = isDark(bg) ? "text-white" : "text-black";
              return (
                <div
                  key={item}
                  className={`h-8 w-full text-xs font-bold flex items-center justify-center border-t border-black ${textColor}`}
                  style={{ backgroundColor: bg }}
                >
                  {item}
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="w-full max-w-xs">
            <input
              value={smoothieName}
              onChange={(e) => setSmoothieName(e.target.value)}
              placeholder="Name your smoothie..."
              className="border p-2 rounded w-full mb-3"
            />
            <button
              onClick={handleCustomizeClick}
              disabled={!smoothieName.trim()}
              className={`w-full px-4 py-2 rounded ${
                smoothieName.trim()
                  ? "bg-blue-800 text-white hover:bg-blue-900"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              CUSTOMIZE!
            </button>
          </div>
        </div>

        {/* Kolom Kanan - Remove */}
        <div className="flex flex-col items-start">
          <h4 className="font-semibold text-sm mb-2">Remove Ingredients</h4>
          <div className="flex flex-wrap gap-2">
            {customItems.map((item) => (
              <button
                key={item}
                onClick={() => removeIngredient(item)}
                className="bg-red-200 text-xs px-2 py-1 rounded-full"
              >
                {item} ×
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
