import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";

// Ganti path image agar sesuai GitHub Pages (public path)
const smoothies = [
  {
    name: "Beauty Burst",
    main: "Collagen for youthful skin",
    image: `${process.env.PUBLIC_URL}/images/Beauty Burst.jpg`,
    ingredients: ["Blueberry", "Strawberry", "Raspberry", "Fresh & Sour!"],
    badge: "best seller!"
  },
  {
    name: "Tropical Immune",
    main: "Vitamin C boost for sunny days",
    image: `${process.env.PUBLIC_URL}/images/Tropical Immune.jpg`,
    ingredients: ["Mango", "Pineapple", "Orange", "Turmeric"],
    badge: "new!"
  },
  {
    name: "Active Fuel",
    main: "Detox and refresh naturally",
    image: `${process.env.PUBLIC_URL}/images/Active Fuel.png`,
    ingredients: ["Spinach", "Kale", "Apple", "Green Spirulina"],
    badge: "fan favorite"
  }
];

export default function FreshFuelPage() {
  const [showPopup, setShowPopup] = useState(true);
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % smoothies.length);
  const prev = () => setIndex((index - 1 + smoothies.length) % smoothies.length);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const getSmoothie = (offset) => {
    const newIndex = (index + offset + smoothies.length) % smoothies.length;
    return smoothies[newIndex];
  };

  const current = getSmoothie(0);
  const prevSmoothie = getSmoothie(-1);
  const nextSmoothie = getSmoothie(1);

  return (
    <div className="min-h-screen bg-pink-50 text-center font-sans pb-40 overflow-y-auto">
      {/* Tautan Join Community */}
      <div className="bg-blue-100 py-4">
        <p className="text-lg text-blue-900 font-semibold">
          Join our <b>Freshfuel WhatsApp Community</b> for exclusive deals and updates!
        </p>
        <a
          href="https://whatsapp.com/channel/0029Vb9bTcS4inozDwqJx525"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block bg-green-600 text-white font-bold rounded-full px-6 py-2 hover:bg-green-700"
        >
          JOIN COMMUNITY
        </a>
      </div>

      {/* Popup WhatsApp Community */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          >
            <div className="relative w-[90%] md:w-[600px] bg-white rounded-2xl p-6 text-center border border-blue-800 shadow-lg">
              {/* Promo Banner */}
              <div className="absolute top-0 -left-20 -rotate-12 text-white bg-red-800 py-1 px-6 text-xl font-bold rounded-r-3xl shadow-lg">
                GET 20% OFF
                <div className="text-xs italic">your first smoothie!</div>
              </div>

              {/* Tombol Close */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 hover:text-red-600"
              >
                <X />
              </button>

              {/* Logo */}
              <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="FreshFuel" className="mx-auto h-10 my-4" />

              {/* Isi Pesan */}
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Did you know about Freshfuel <b>WhatsApp Community?</b><br />
                Join our club now to enjoy <span className="text-pink-700 font-semibold">exclusive smoothie deals</span> and <span className="text-blue-800 font-semibold">stay up to date</span> with Freshfuel!
              </p>

              {/* Tombol JOIN NOW */}
              <a
                href="https://whatsapp.com/channel/0029Vb9bTcS4inozDwqJx525"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white text-lg font-bold rounded-full shadow-md hover:shadow-lg transition-all"
              >
                🎉 JOIN NOW!
              </a>
              <p className="text-xs mt-3 text-gray-500 italic">No spam. Deals only.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Our Menu Section */}
      <div className="pt-24 relative">
        <h2 className="text-xl text-gray-700">
          Introducing our <span className="italic font-semibold">signature menu</span>
        </h2>
        <h1 className="text-5xl font-bold text-white drop-shadow-md">{current.name}</h1>
        <div className="mt-4 text-sm">
          <span className="px-3 py-1 bg-pink-100 border rounded-full font-semibold">
            <span className="text-red-700">{current.main.split(" ")[0]}</span>{" "}
            {current.main.split(" ").slice(1).join(" ")}
          </span>
        </div>

        {/* Smoothie Carousel */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button onClick={prev} className="text-pink-500 bg-white rounded-full p-3 shadow">
            <ChevronLeft size={32} />
          </button>
          <div className="flex items-center justify-center gap-6 w-full max-w-4xl overflow-hidden">
            <img src={prevSmoothie.image} alt="prev" className="h-60 opacity-40 scale-90 transition duration-300" />
            <motion.div
              key={current.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative pb-10"
            >
              <img
                src={current.image}
                alt={current.name}
                className="h-80 drop-shadow-xl rounded-2xl z-10"
              />
              {current.badge && (
                <span className="absolute -bottom-4-left-6 bg-red-700 text-white px-2 py-1 rounded-full text-xs font-bold rotate-[-20deg]">
                  {current.badge}
                </span>
              )}
            </motion.div>
            <img src={nextSmoothie.image} alt="next" className="h-60 opacity-40 scale-90 transition duration-300" />
          </div>
          <button onClick={next} className="text-pink-500 bg-white rounded-full p-3 shadow">
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Ingredients Tags */}
        <div className="mt-4 flex justify-center gap-3 flex-wrap">
          {current.ingredients.map((item, idx) => (
            <span
              key={idx}
              className="border border-blue-800 px-3 py-1 rounded-full text-sm text-blue-900 bg-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-24 px-6">
        <h2 className="text-4xl font-extrabold text-blue-900">
          Ready to Blend Your <span className="text-red-600">OWN</span> Drink?
        </h2>
        <div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="text-center">
            <p className="text-lg text-blue-900">
              👷‍♂️👷‍♀️<br />Crave Control? <b>Customize It!</b>
            </p>
            <Link to="/customize">
              <button className="mt-2 bg-red-700 text-white px-6 py-3 rounded shadow-md hover:bg-red-800">
                CUSTOMIZE YOUR CUP
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
