// App.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const smoothies = [
  {
    name: "Beauty Burst",
    main: "Collagen for youthful skin",
    image: `${process.env.PUBLIC_URL}/images/beauty burst.png`,
    ingredients: ["Blueberry", "Strawberry", "Raspberry", "Fresh & Sour!"],
    badge: "best seller!",
  },
  {
    name: "Tropical Immune",
    main: "Vitamin C boost for sunny days",
    image: `${process.env.PUBLIC_URL}/images/tropical immune.png`,
    ingredients: ["Mango", "Pineapple", "Orange", "Turmeric"],
    badge: "new!",
  },
  {
    name: "Active Fuel",
    main: "Detox and refresh naturally",
    image: `${process.env.PUBLIC_URL}/images/active fuel.png`,
    ingredients: ["Spinach", "Kale", "Apple", "Green Spirulina"],
    badge: "fan favorite",
  },
  {
    name: "Energy Blast",
    main: "Energy recharge on the go",
    image: `${process.env.PUBLIC_URL}/images/energy blast.png`,
    ingredients: ["Banana", "Mango", "Electrolyte", "Yummy Yogurt"],
  },
  {
    name: "Sunrise Oats",
    main: "Nutritious Morning meal",
    image: `${process.env.PUBLIC_URL}/images/sunrise oats.png`,
    ingredients: ["Muesli & Oats", "Banana", "Yogurt", "Green Spirulina"],
  },
];

const aboutSlides = [
  {
    image: `${process.env.PUBLIC_URL}/event/evnt1.jpg`,
    title: "Empowering FRESHFUEL: Shaping The Future at PIK 2",
    tags: ["FUELING MINDS", "INSPIRING CHANGE", "JAKARTA CENTER", "F&B"],
    description:
      "An inspiring confuse event where ideas, inside and innovations come together to create meaningful impact.",
  },
  {
    image: `${process.env.PUBLIC_URL}/event/evnt2.jpg`,
    title: "ICN : Embracing Heritage Uniting the Future",
    tags: ["SPORTS", "FITNESS", "HEALTHY", "ENDURE", "ENERGIZE"],
    description:
      "A Vibrant celebration of Indonesia's rich culture and nationalism, bringing tradisions to life at Prasmul",
  },
  {
    image: `${process.env.PUBLIC_URL}/event/evnt3.jpg`,
    title: "Push Your Limits, Own the Race",
    tags: ["INNOVATE", "CULTURE", "SMOOTHIES", "ENERGIZE", "SMOOTHIES"],
    description:
      "A thrilling marathon at prasmul that challenges endurance, builds community and fuels a healthier lifestyle ",
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [aboutIndex, setAboutIndex] = useState(0);

  const next = () => setIndex((index + 1) % smoothies.length);
  const prev = () => setIndex((index - 1 + smoothies.length) % smoothies.length);
  const current = smoothies[index];
  const prevSmoothie = smoothies[(index - 1 + smoothies.length) % smoothies.length];
  const nextSmoothie = smoothies[(index + 1) % smoothies.length];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-center font-sans">

      {/* ✅ Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md w-full">
        <div className="w-full flex items-center justify-between px-4 md:px-6 py-4">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img
              src={`${process.env.PUBLIC_URL}/images/Logo Freshfuel.png`}
              alt="FreshFuel Logo"
              className="h-14 md:h-16 w-auto object-contain cursor-pointer"
            />
          </Link>
          <div className="flex space-x-4">
            <button onClick={() => scrollTo("our-menu")} className="px-4 py-2 border rounded-full hover:bg-black hover:text-white transition">Our Menu</button>
            <button onClick={() => scrollTo("about-us")} className="px-4 py-2 border rounded-full hover:bg-black hover:text-white transition">About Us</button>
            <button onClick={() => scrollTo("support")} className="px-4 py-2 border rounded-full hover:bg-black hover:text-white transition">Support</button>
          </div>
        </div>
      </header>

      {/* ✅ Hero */}
      <section className="bg-[#ffffff] text-gray-900 py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-center md:w-1/2 px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Freshfuel Experience</h1>
            <p className="text-lg text-gray-700">
              At Freshfuel, we believe that staying healthy should be easy and delicious. Our smoothies are crafted
              from the freshest fruits, vegetables, and superfoods to fuel your body and mind.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Customize CTA */}
      <section className="bg-white py-24 px-4 text-center">
        <h2 className="text-4xl font-extrabold text-blue-900">
          Ready to Blend Your <span className="text-red-600">OWN</span> Drink?
        </h2>
        <p className="mt-2 text-blue-900 text-sm">👷‍♂️👷‍♀️ Crave Control? <b>Customize It!</b></p>
        <Link to="/customize">
          <button className="mt-4 bg-red-700 text-white px-6 py-3 rounded shadow-md hover:bg-red-800">
            CUSTOMIZE YOUR CUP
          </button>
        </Link>
      </section>

      {/* ✅ Our Menu */}
      <div id="our-menu" className="pt-24 relative bg-pink-50 pb-20">
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
              <img src={current.image} alt={current.name} className="h-80 drop-shadow-xl rounded-2xl z-10" />
              {current.badge && (
                <span className="absolute -bottom-4 left-6 bg-red-700 text-white px-2 py-1 rounded-full text-xs font-bold rotate-[-20deg]">
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

        <div className="mt-4 flex justify-center gap-3 flex-wrap">
          {current.ingredients.map((item, idx) => (
            <span key={idx} className="border border-blue-800 px-3 py-1 rounded-full text-sm text-blue-900 bg-white">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ✅ About Us Section */}
      <section id="about-us" className="py-24 px-6 bg-gradient-to-r from-[#fff0d4] to-[#fbd2a8]">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-red-800">ABOUT US</h2>
        <div className="relative max-w-6xl mx-auto overflow-hidden">
          <div className="flex transition-all duration-500" style={{ transform: `translateX(-${aboutIndex * 100}%)` }}>
            {aboutSlides.map((slide, index) => (
              <div key={index} className="flex-shrink-0 w-full bg-white rounded-xl shadow-lg p-6 mx-2 text-left">
                <img src={slide.image} alt={slide.title} className="w-full max-h-[500px] object-contain mx-auto rounded-md mb-4" />
                <div className="flex flex-wrap gap-2 mb-3">
                  {slide.tags.map((tag, idx) => (
                    <span key={idx} className="bg-green-300 text-white text-sm font-bold px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 text-center">{slide.title}</h3>
                <p className="text-gray-700 mt-1 text-base text-center">{slide.description}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setAboutIndex((prev) => (prev === 0 ? aboutSlides.length - 1 : prev - 1))} className="absolute top-1/2 left-0 transform -translate-y-1/2 px-3 text-3xl text-gray-600 hover:text-black">‹</button>
          <button onClick={() => setAboutIndex((prev) => (prev === aboutSlides.length - 1 ? 0 : prev + 1))} className="absolute top-1/2 right-0 transform -translate-y-1/2 px-3 text-3xl text-gray-600 hover:text-black">›</button>
        </div>
      </section>

      {/* ✅ Support Section */}
      <section id="support" className="bg-[#fdfdf6] py-20 px-6 border-t border-gray-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-20 items-start justify-between">
          <div className="space-y-6 text-left text-red-800">
            <div className="flex items-center gap-3">
              <MapPin />
              <p className="text-lg">BSD City, South Tangerang</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone />
              <p className="text-lg">+62 882-4547-2468</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail />
              <p className="text-lg">freshfuel25@gmail.com</p>
            </div>
          </div>
          <div className="flex-1 text-left text-red-800 border-l border-gray-300 pl-10">
            <h3 className="text-2xl font-bold mb-3">About WhatsApp Community</h3>
            <p className="text-base leading-relaxed">
              Becoming a member of the Freshfuel WhatsApp community offers a range of exclusive benefits...
            </p>
            <div className="mt-6">
              <h4 className="text-xl font-semibold">Find Us At</h4>
              <div className="flex gap-4 mt-2">
                <a href="https://wa.me/6288245472468" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="text-red-800 hover:text-red-600" />
                </a>
                <a href="https://www.instagram.com/drinkfreshfuel/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="text-red-800 hover:text-red-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-16 text-red-800 font-bold text-xl">
          <img
            src={`${process.env.PUBLIC_URL}/images/Logo Freshfuel.png`}
            alt="Freshfuel"
            className="mx-auto h-12"
          />
          <p className="text-sm mt-2">"Fuel Your Day, Fresh Every Way"</p>
        </div>
      </section>
    </div>
  );
}
