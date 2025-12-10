"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
} from "recharts";
import { MapPin, Heart, Share2, Phone, Mail, Calendar, Home, TrendingUp, Users } from "lucide-react";
import { PROPERTIES } from "@/app/lib/data";
import { provider } from "@/app/components/provider";

const priceData = [
  { month: "Jan", luxury: 420, apartments: 180, houses: 210, commercial: 290 },
  { month: "Feb", luxury: 450, apartments: 195, houses: 225, commercial: 305 },
  { month: "Mar", luxury: 480, apartments: 210, houses: 240, commercial: 320 },
  { month: "Apr", luxury: 520, apartments: 235, houses: 265, commercial: 345 },
  { month: "May", luxury: 580, apartments: 260, houses: 295, commercial: 375 },
  { month: "Jun", luxury: 650, apartments: 290, houses: 330, commercial: 410 },
];

const marketData = [
  { price: 85, demand: 92 },
  { price: 320, demand: 78 },
  { price: 420, demand: 65 },
  { price: 550, demand: 55 },
  { price: 850, demand: 42 },
  { price: 1200, demand: 28 },
];

const agentData = [
  { name: "Chidi O.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", sales: 45, listings: 23 },
  { name: "Amina K.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", sales: 38, listings: 19 },
  { name: "David E.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", sales: 32, listings: 17 },
];

export default function Page() {
  const { favorites, setFavorites } = provider();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<typeof PROPERTIES[0] | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);

  const categories = useMemo(() => {
    return Array.from(new Set(PROPERTIES.map((p) => p.category)));
  }, []);

  function toggleFavorite(id: string) {
    const updated = new Set(favorites);
    if (updated.has(id)) updated.delete(id);
    else updated.add(id);
    setFavorites(updated);
  }

  function handleContact(e: React.FormEvent) {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => setContactSuccess(false), 3000);
    setContactForm({ name: "", email: "", phone: "", message: "" });
  }

  const filteredProperties = PROPERTIES.filter((p) => (activeCategory ? p.category === activeCategory : true));

  return (
    <div className="min-h-screen mt-0 bg-linear-to-b from-slate-50 via-white to-slate-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-8 py-24">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="text-sm font-semibold text-blue-600 mb-2">Find Your Dream Home</div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight text-gray-900">
              Premium Real Estate in Lagos
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl">
              Discover luxury villas, modern apartments, and investment-grade properties. Expert guidance, transparent pricing, verified listings.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#properties" className="px-6 py-3 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg">Browse Properties</a>
              <a href="#market" className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 font-semibold hover:bg-gray-50">Market Insights</a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="bg-white/60 backdrop-blur rounded-lg p-3 shadow-sm">
                <div className="text-lg font-bold text-blue-600">{PROPERTIES.length}</div>
                <div className="text-xs text-gray-600">Active Listings</div>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-lg p-3 shadow-sm">
                <div className="text-lg font-bold text-purple-600">850+</div>
                <div className="text-xs text-gray-600">Happy Clients</div>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-lg p-3 shadow-sm">
                <div className="text-lg font-bold text-green-600">100%</div>
                <div className="text-xs text-gray-600">Verified</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format&fit=crop"
              alt="Luxury property"
              width={900}
              height={700}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="bg-white border-t border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-full font-medium transition ${activeCategory === null ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              All Properties
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory((s) => (s === c ? null : c))}
                className={`px-4 py-2 rounded-full font-medium transition ${activeCategory === c ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTIES GRID */}
      <section id="properties" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Featured Listings</h2>
            <p className="text-sm text-gray-600 mt-1">Curated properties verified and ready to tour.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => (
              <motion.article
                key={prop.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition group"
              >
                <div className="relative h-52">
                  <Image src={prop.img} alt={prop.title} fill className="object-cover group-hover:scale-105 transition duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute top-3 right-3 flex gap-2 z-10">
                    <button
                      onClick={() => toggleFavorite(prop.id)}
                      className={`p-2 rounded-full backdrop-blur transition ${favorites.has(prop.id) ? "bg-red-500 text-white" : "bg-white/80 text-gray-700 hover:bg-white"}`}
                    >
                      <Heart className="w-4 h-4" fill={favorites.has(prop.id) ? "currentColor" : "none"} />
                    </button>
                    <button className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-white transition backdrop-blur">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-gray-900">{prop.category}</div>

                  <div className="absolute bottom-3 left-3 right-3 bg-linear-to-t from-black/40 to-transparent p-3 rounded-lg">
                    <div className="text-white font-bold text-lg">{prop.price}</div>
                    <div className="text-white/90 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {prop.location}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{prop.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{prop.sqft} sq ft</p>

                  <div className="mt-4 flex justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{prop.beds}</span> Beds
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{prop.baths}</span> Baths
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2 flex-wrap">
                    {prop.features.slice(0, 2).map((f) => (
                      <span key={f} className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">{f}</span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProperty(prop)}
                    className="mt-4 w-full py-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition"
                  >
                    View Details
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTY DETAILS MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
            <div className="relative h-72">
              <Image src={selectedProperty.img} alt={selectedProperty.title} fill className="object-cover" />
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{selectedProperty.title}</h2>
                  <div className="flex items-center gap-2 mt-2 text-gray-600 text-xs sm:text-sm">
                    <MapPin className="w-4 h-4" /> {selectedProperty.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{selectedProperty.price}</div>
                  <div className="text-xs text-gray-500 mt-1">{selectedProperty.sqft} sq ft</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] bsm:grid-cols-[repeat(auto-fill,_minmax(166px,_1fr))] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-xl md:text-2xl font-bold text-blue-600">{selectedProperty.beds}</div>
                  <div className="text-xs text-gray-600">Bedrooms</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-xl md:text-2xl font-bold text-purple-600">{selectedProperty.baths}</div>
                  <div className="text-xs text-gray-600">Bathrooms</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-xl md:text-2xl font-bold text-green-600">{selectedProperty.sqft}</div>
                  <div className="text-xs text-gray-600">Area (sq ft)</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-xl md:text-2xl font-bold text-orange-600">{selectedProperty.category}</div>
                  <div className="text-xs text-gray-600">Type</div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-lg">Features</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProperty.features.map((f) => (
                    <span key={f} className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm">{f}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <button className="py-2 rounded-lg border border-gray-300 font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" /> Schedule Tour
                </button>
                <button className="py-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Contact Agent
                </button>
              </div>

              <button
                onClick={() => setSelectedProperty(null)}
                className="mt-4 w-full py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MARKET ANALYTICS */}
      <section id="market" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2">Market Insights</h2>
          <p className="text-sm text-gray-600 mb-8">Real-time data & trends in Lagos real estate.</p>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Price Trends */}
            <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="block sm:hidden">
              <h3 className="font-semibold text-lg mb-4">Price Trends</h3>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <AreaChart data={priceData}>
                    <defs>
                      <linearGradient id="colorLuxury" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="luxury" stackId="1" stroke="#2563eb" fill="url(#colorLuxury)" />
                    <Area type="monotone" dataKey="apartments" stackId="1" stroke="#9333ea" fill="#9333ea" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="houses" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">Luxury segment shows strongest growth. Average YoY appreciation: 12%.</p>
            </motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="hidden sm:block bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl shadow-md border border-gray-200">
              <h3 className="font-semibold text-lg mb-4">Price Trends</h3>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <AreaChart data={priceData}>
                    <defs>
                      <linearGradient id="colorLuxury" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="luxury" stackId="1" stroke="#2563eb" fill="url(#colorLuxury)" />
                    <Area type="monotone" dataKey="apartments" stackId="1" stroke="#9333ea" fill="#9333ea" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="houses" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">Luxury segment shows strongest growth. Average YoY appreciation: 12%.</p>
            </motion.div>

            {/* Price vs Demand */}
            <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="block sm:hidden">
              <h3 className="font-semibold text-lg mb-4">Price vs. Demand</h3>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <ScatterChart data={marketData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="price" name="Price (₦M)" />
                    <YAxis dataKey="demand" name="Demand %" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter name="Properties" data={marketData} fill="#2563eb" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">Budget properties show higher demand; luxury commands premium with lower volume.</p>
            </motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="hidden sm:block bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl shadow-md border border-gray-200">
              <h3 className="font-semibold text-lg mb-4">Price vs. Demand</h3>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <ScatterChart data={marketData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="price" name="Price (₦M)" />
                    <YAxis dataKey="demand" name="Demand %" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter name="Properties" data={marketData} fill="#2563eb" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">Budget properties show higher demand; luxury commands premium with lower volume.</p>
            </motion.div>
          </div>

          <div className="mt-8 grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
              <TrendingUp className="w-6 h-6 text-blue-600 mb-2" />
              <div className="text-sm font-semibold">Avg. Price Growth</div>
              <div className="text-2xl font-bold text-blue-600 mt-1">+12%</div>
              <div className="text-xs text-gray-500 mt-1">Year-over-year</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
              <Home className="w-6 h-6 text-purple-600 mb-2" />
              <div className="text-sm font-semibold">Avg. Days on Market</div>
              <div className="text-2xl font-bold text-purple-600 mt-1">28</div>
              <div className="text-xs text-gray-500 mt-1">Down from 45 last year</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
              <Users className="w-6 h-6 text-green-600 mb-2" />
              <div className="text-sm font-semibold">Active Buyers</div>
              <div className="text-2xl font-bold text-green-600 mt-1">2,400+</div>
              <div className="text-xs text-gray-500 mt-1">Verified accounts</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
              <MapPin className="w-6 h-6 text-orange-600 mb-2" />
              <div className="text-sm font-semibold">Most Active Zone</div>
              <div className="text-2xl font-bold text-orange-600 mt-1">VI</div>
              <div className="text-xs text-gray-500 mt-1">Victoria Island</div>
            </div>
          </div>
        </div>
      </section>

      {/* AGENTS */}
      <section id="agents" className="py-20 bg-linear-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2">Our Top Agents</h2>
          <p className="text-sm text-gray-600 mb-8">Expert guidance from seasoned real estate professionals.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {agentData.map((agent) => (
              <motion.div key={agent.name} whileHover={{ y: -6 }} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-slate-100">
                    <Image src={agent.avatar} alt={agent.name} width={80} height={80} className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                    <div className="text-xs text-gray-500">Real Estate Specialist</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{agent.sales}</div>
                    <div className="text-xs text-gray-600">Successful Sales</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{agent.listings}</div>
                    <div className="text-xs text-gray-600">Active Listings</div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 py-2 rounded-lg border border-gray-300 text-sm font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-1">
                    <Phone className="w-3 h-3" /> Call
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:shadow-lg transition flex items-center justify-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Ready to Make a Move?</h2>
            <p className="text-white/90 mb-8">Get expert advice. Schedule a property tour. Secure your investment today.</p>

            <form onSubmit={handleContact} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/60 text-white border border-white/30 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white"
                />
                <input
                  required
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/60 text-white border border-white/30 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <input
                required
                type="tel"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/60 text-white border border-white/30 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white"
              />
              <textarea
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Tell us about your dream property..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/60 text-white border border-white/30 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white resize-none"
              />

              <div className="flex items-center gap-4">
                <button type="submit" className="px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-white/90 transition shadow-lg">
                  Send Inquiry
                </button>
                {contactSuccess && (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-white font-semibold">
                    ✓ Message sent! W&rsquo;ll be in touch soon.
                  </motion.div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}