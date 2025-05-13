import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Search, Filter, Star, Clock } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MapComponent from "../components/MapComponent";

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

// 📍 Karachi-based mock providers
const mockProviders = [
  {
    id: 1,
    name: "Ali the Electrician",
    service: "Electrical",
    rating: 4.8,
    reviews: 95,
    bio: "Experienced electrician for home and office needs.",
    location: "Karachi Block A",
    distance: "0.2 km away",
    availability: "Available today",
    image: "/placeholder.svg",
    lat: 24.9129,
    lng: 67.1217,
  },
  {
    id: 2,
    name: "Sara the Cleaner",
    service: "House Cleaning",
    rating: 4.7,
    reviews: 88,
    bio: "Efficient cleaning with eco-friendly supplies.",
    location: "Karachi Block B",
    distance: "0.3 km away",
    availability: "Available today",
    image: "/placeholder.svg",
    lat: 24.9126,
    lng: 67.1212,
  },
  {
    id: 3,
    name: "Noman Security",
    service: "Security Guard",
    rating: 4.9,
    reviews: 112,
    bio: "Professional security for residential & commercial properties.",
    location: "Karachi Block C",
    distance: "0.4 km away",
    availability: "Available tomorrow",
    image: "/placeholder.svg",
    lat: 24.913,
    lng: 67.121,
  },
  {
    id: 4,
    name: "Zara Driver",
    service: "Driver",
    rating: 4.6,
    reviews: 76,
    bio: "City-licensed driver with luxury and economy cars.",
    location: "Karachi Block D",
    distance: "0.5 km away",
    availability: "Available today",
    image: "/placeholder.svg",
    lat: 24.9125,
    lng: 67.1219,
  },
  {
    id: 5,
    name: "Hamza Chef",
    service: "Personal Chef",
    rating: 4.8,
    reviews: 134,
    bio: "Expert in Pakistani & Mediterranean cuisine.",
    location: "Karachi Block E",
    distance: "0.6 km away",
    availability: "Available this weekend",
    image: "/placeholder.svg",
    lat: 24.9131,
    lng: 67.1221,
  },
  {
    id: 6,
    name: "Lubna Cleaner",
    service: "House Cleaning",
    rating: 4.5,
    reviews: 65,
    bio: "Detail-oriented cleaner with fast service.",
    location: "Karachi Block F",
    distance: "0.4 km away",
    availability: "Available tomorrow",
    image: "/placeholder.svg",
    lat: 24.9124,
    lng: 67.1213,
  },
];

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("all");
  const [activeView, setActiveView] = useState("list");

  useEffect(() => {
    let filtered = mockProviders;

    if (searchTerm) {
      filtered = filtered.filter(
        (provider) =>
          provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedService !== "all") {
      filtered = filtered.filter(
        (provider) =>
          provider.service.toLowerCase() === selectedService.toLowerCase()
      );
    }

    if (selectedLocation) {
      filtered = filtered.sort((a, b) => {
        const distA = Math.sqrt(
          Math.pow(a.lat - selectedLocation.lat, 2) +
            Math.pow(a.lng - selectedLocation.lng, 2)
        );
        const distB = Math.sqrt(
          Math.pow(b.lat - selectedLocation.lat, 2) +
            Math.pow(b.lng - selectedLocation.lng, 2)
        );
        return distA - distB;
      });
    }

    console.log("✅ Filtered Providers:", filtered);
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
            <h1 className="text-3xl font-bold">Find Service Providers</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Discover trusted professionals in your area
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Left sidebar */}
            <div className="md:col-span-1 space-y-6">
              {/* Filters (Search, Service Type, etc.) - unchanged */}

              {/* Location Map */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: 0.2 }}
                className="rounded-xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
              >
                <h2 className="text-lg font-semibold mb-4">Your Location</h2>
                <div className="h-[300px] rounded-lg overflow-hidden">
                  <MapComponent
                    onLocationSelect={handleLocationSelect}
                    providers={filteredProviders}
                    showProviders={true}
                  />
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="mr-1 h-4 w-4 text-purple-600" />
                  {selectedLocation
                    ? "Location selected"
                    : "Select your location on the map"}
                </div>
              </motion.div>
            </div>

            {/* Main content (List or Map) */}
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <div className="flex border rounded-md overflow-hidden">
                  <button
                    className={`px-4 py-2 ${
                      activeView === "list"
                        ? "bg-purple-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveView("list")}
                  >
                    List View
                  </button>
                  <button
                    className={`px-4 py-2 ${
                      activeView === "map"
                        ? "bg-purple-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveView("map")}
                  >
                    Map View
                  </button>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredProviders.length} providers found
                </div>
              </div>

              {activeView === "list" ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-4"
                >
                  {filteredProviders.map((provider) => (
                    <motion.div
                      key={provider.id}
                      variants={fadeIn}
                      className="rounded-xl border bg-white overflow-hidden shadow-sm dark:border-gray-800 dark:bg-gray-950"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/3 relative">
                          <img
                            src={provider.image || "/placeholder.svg"}
                            alt={provider.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4 sm:w-2/3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold">
                                {provider.name}
                              </h3>
                              <p className="text-purple-600 dark:text-purple-400">
                                {provider.service}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="ml-1 text-sm font-medium">
                                {provider.rating}
                              </span>
                              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                ({provider.reviews})
                              </span>
                            </div>
                          </div>

                          <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {provider.bio}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <MapPin className="mr-1 h-4 w-4" />
                              {provider.location} • {provider.distance}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="mr-1 h-4 w-4" />
                              {provider.availability}
                            </div>
                          </div>

                          <div className="mt-4 flex gap-2">
                            <Link
                              to={`/providers/${provider.id}`}
                              className="btn btn-outline btn-sm"
                            >
                              View Profile
                            </Link>
                            <Link
                              to={`/book/${provider.id}`}
                              className="btn btn-primary btn-sm"
                            >
                              Book Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="h-[600px] rounded-xl overflow-hidden">
                  <MapComponent
                    onLocationSelect={handleLocationSelect}
                    providers={filteredProviders}
                    showProviders={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
