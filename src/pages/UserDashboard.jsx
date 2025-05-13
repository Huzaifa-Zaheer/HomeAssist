import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Filter } from 'lucide-react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import MapComponent from "../components/MapComponent";
import ProviderCard from "../components/ProviderCard";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Mock data for service providers
const mockProviders = [
  {
    id: 1,
    name: "Alex Johnson",
    service: "Personal Chef",
    rating: 4.8,
    reviews: 124,
    bio: "Professional chef with 10+ years of experience in fine dining. Specializes in Italian and French cuisine.",
    location: "Downtown",
    distance: "1.2 miles away",
    availability: "Available today",
    image: "/placeholder.svg",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    name: "Maria Garcia",
    service: "House Cleaning",
    rating: 4.9,
    reviews: 89,
    bio: "Detailed-oriented cleaning professional with eco-friendly products and techniques.",
    location: "Midtown",
    distance: "0.8 miles away",
    availability: "Available tomorrow",
    image: "/placeholder.svg",
    lat: 40.7168,
    lng: -73.9973,
  },
  {
    id: 3,
    name: "James Wilson",
    service: "Security Guard",
    rating: 4.7,
    reviews: 56,
    bio: "Former military personnel with extensive training in security protocols and emergency response.",
    location: "Uptown",
    distance: "2.1 miles away",
    availability: "Available this weekend",
    image: "/placeholder.svg",
    lat: 40.7218,
    lng: -74.0103,
  },
  {
    id: 4,
    name: "Sarah Chen",
    service: "Driver",
    rating: 4.9,
    reviews: 112,
    bio: "Professional driver with clean record and knowledge of all city routes. Luxury vehicles available.",
    location: "East Side",
    distance: "1.5 miles away",
    availability: "Available today",
    image: "/placeholder.svg",
    lat: 40.7158,
    lng: -73.9923,
  },
];

export default function UserDashboard() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("all");
  const [activeView, setActiveView] = useState("list");
  const [userName, setUserName] = useState("John");

  // Filter providers based on search term, selected service, and location
  useEffect(() => {
    let filtered = mockProviders;

    if (searchTerm) {
      filtered = filtered.filter(
        (provider) =>
          provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.bio.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedService !== "all") {
      filtered = filtered.filter((provider) => provider.service.toLowerCase() === selectedService.toLowerCase());
    }

    if (selectedLocation) {
      // In a real app, you would filter based on proximity to the selected location
      filtered = filtered.sort((a, b) => {
        const distA = Math.sqrt(Math.pow(a.lat - selectedLocation.lat, 2) + Math.pow(a.lng - selectedLocation.lng, 2));
        const distB = Math.sqrt(Math.pow(b.lat - selectedLocation.lat, 2) + Math.pow(b.lng - selectedLocation.lng, 2));
        return distA - distB;
      });
    }

    setFilteredProviders(filtered);
  }, [searchTerm, selectedService, selectedLocation]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
            <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
            <p className="text-gray-500">Find and connect with service providers in your area</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 space-y-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <h2 className="text-lg font-semibold mb-4">Search Filters</h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="search" className="form-label">Search</label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <input
                        id="search"
                        placeholder="Search providers..."
                        className="form-input pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service-type" className="form-label">Service Type</label>
                    <select
                      id="service-type"
                      className="form-select"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option value="all">All Services</option>
                      <option value="personal chef">Personal Chef</option>
                      <option value="house cleaning">House Cleaning</option>
                      <option value="security guard">Security Guard</option>
                      <option value="driver">Driver</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Availability</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="available-today"
                          className="form-checkbox"
                        />
                        <label htmlFor="available-today" className="ml-2 text-sm text-gray-700">
                          Available Today
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="available-tomorrow"
                          className="form-checkbox"
                        />
                        <label htmlFor="available-tomorrow" className="ml-2 text-sm text-gray-700">
                          Available Tomorrow
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="available-weekend"
                          className="form-checkbox"
                        />
                        <label htmlFor="available-weekend" className="ml-2 text-sm text-gray-700">
                          Available This Weekend
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Rating</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="rating-4plus"
                          className="form-checkbox"
                        />
                        <label htmlFor="rating-4plus" className="ml-2 text-sm text-gray-700">
                          4+ Stars
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="rating-3plus"
                          className="form-checkbox"
                        />
                        <label htmlFor="rating-3plus" className="ml-2 text-sm text-gray-700">
                          3+ Stars
                        </label>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-primary w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: 0.2 }}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <h2 className="text-lg font-semibold mb-4">Your Location</h2>
                <div className="h-[300px] rounded-lg overflow-hidden">
                  <MapComponent onLocationSelect={handleLocationSelect} providers={filteredProviders} />
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1 h-4 w-4 text-purple-600" />
                  {selectedLocation ? "Location selected" : "Select your location on the map"}
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-2">
              <div className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex border rounded-md overflow-hidden">
                    <button
                      className={`px-4 py-2 ${
                        activeView === "list"
                          ? "bg-purple-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveView("list")}
                    >
                      List View
                    </button>
                    <button
                      className={`px-4 py-2 ${
                        activeView === "map"
                          ? "bg-purple-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveView("map")}
                    >
                      Map View
                    </button>
                  </div>

                  <div className="text-sm text-gray-500">
                    {filteredProviders.length} providers found
                  </div>
                </div>

                {activeView === "list" && (
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid gap-4">
                    {filteredProviders.map((provider) => (
                      <ProviderCard key={provider.id} provider={provider} />
                    ))}
                  </motion.div>
                )}

                {activeView === "map" && (
                  <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
                    <div className="h-[600px]">
                      <MapComponent
                        onLocationSelect={handleLocationSelect}
                        providers={filteredProviders}
                        showProviders={true}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}