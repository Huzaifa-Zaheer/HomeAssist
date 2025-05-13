import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, AlertCircle } from 'lucide-react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import OfferCard from "../components/OfferCard";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Mock offers data
const mockOffers = [
  {
    id: 1,
    providerName: "Alex Johnson",
    providerService: "Personal Chef",
    userName: "John Smith",
    status: "pending",
    date: "2023-11-15",
    time: "18:00",
    budget: 120,
    description: "Looking for a chef to prepare a romantic dinner for two. Italian cuisine preferred."
  },
  {
    id: 2,
    providerName: "Maria Garcia",
    providerService: "House Cleaning",
    userName: "Emily Johnson",
    status: "accepted",
    date: "2023-11-18",
    time: "14:00",
    budget: 80,
    description: "Need a thorough cleaning of a 2-bedroom apartment. Please bring eco-friendly products."
  },
  {
    id: 3,
    providerName: "James Wilson",
    providerService: "Security Guard",
    userName: "Michael Brown",
    status: "completed",
    date: "2023-11-10",
    time: "20:00",
    budget: 150,
    description: "Security needed for a small private event. Approximately 4 hours of service required."
  },
  {
    id: 4,
    providerName: "Sarah Chen",
    providerService: "Driver",
    userName: "David Lee",
    status: "rejected",
    date: "2023-11-12",
    time: "09:00",
    budget: 90,
    description: "Need a driver for a day trip to the countryside. Approximately 6 hours total."
  },
  {
    id: 5,
    providerName: "Alex Johnson",
    providerService: "Personal Chef",
    userName: "John Smith",
    status: "inProgress",
    date: "2023-11-14",
    time: "19:30",
    budget: 200,
    description: "Dinner party for 6 people. Need a chef who can prepare a variety of appetizers and main courses."
  }
];

export default function OfferManagement() {
  const [offers, setOffers] = useState(mockOffers);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isUserView, setIsUserView] = useState(true); // Toggle between user and provider view

  const handleAcceptOffer = (offerId) => {
    setOffers(
      offers.map(offer => 
        offer.id === offerId 
          ? { ...offer, status: "accepted" } 
          : offer
      )
    );
    // In a real app, you would send this to an API
    alert(`Offer #${offerId} accepted!`);
  };

  const handleCounterOffer = (offerId) => {
    // In a real app, this would open a counter offer form
    alert(`Opening counter offer form for offer #${offerId}`);
  };

  const handleCompleteOffer = (offerId) => {
    setOffers(
      offers.map(offer => 
        offer.id === offerId 
          ? { ...offer, status: "completed" } 
          : offer
      )
    );
    // In a real app, you would send this to an API
    alert(`Offer #${offerId} marked as complete!`);
  };

  // Filter offers based on status
  const filteredOffers = filterStatus === "all" 
    ? offers 
    : offers.filter(offer => offer.status === filterStatus);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
            <h1 className="text-3xl font-bold">Manage Your Offers</h1>
            <p className="text-gray-500">Track and respond to service offers</p>
          </motion.div>

          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex border rounded-md overflow-hidden">
              <button
                className={`px-4 py-2 ${
                  isUserView
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsUserView(true)}
              >
                As User
              </button>
              <button
                className={`px-4 py-2 ${
                  !isUserView
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsUserView(false)}
              >
                As Provider
              </button>
            </div>
            
            <div className="flex items-center">
              <label htmlFor="status-filter" className="mr-2 text-sm font-medium">Status:</label>
              <select
                id="status-filter"
                className="form-select w-auto"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Offers</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="grid gap-4 md:grid-cols-2"
          >
            {filteredOffers.length > 0 ? (
              filteredOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  isProvider={!isUserView}
                  onAccept={handleAcceptOffer}
                  onCounter={handleCounterOffer}
                  onComplete={handleCompleteOffer}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No offers found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  You don't have any {filterStatus !== "all" ? filterStatus : ""} offers at the moment.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}