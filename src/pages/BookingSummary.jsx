import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Calendar, Clock, DollarSign, MapPin, CheckCircle, User } from 'lucide-react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import RatingForm from "../components/RatingForm";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Mock booking data
const mockBooking = {
  id: 123,
  providerName: "Alex Johnson",
  providerService: "Personal Chef",
  status: "Completed", // Confirmed, In Progress, Completed
  date: "November 15, 2023",
  time: "6:00 PM",
  location: "123 Main St, Downtown",
  budget: 120,
  description: "Romantic dinner for two. Italian cuisine.",
  notes: "Please bring your own cooking utensils. Kitchen is fully equipped with stove, oven, and refrigerator.",
  timeline: [
    {
      status: "Offer Sent",
      date: "November 10, 2023",
      time: "2:30 PM"
    },
    {
      status: "Offer Accepted",
      date: "November 10, 2023",
      time: "4:15 PM"
    },
    {
      status: "Payment Processed",
      date: "November 11, 2023",
      time: "10:00 AM"
    },
    {
      status: "Service Completed",
      date: "November 15, 2023",
      time: "8:30 PM"
    }
  ]
};

export default function BookingSummary() {
  const { id } = useParams();
  const [booking, setBooking] = useState(mockBooking);
  const [showRatingForm, setShowRatingForm] = useState(false);
  
  // In a real app, you would fetch the booking data based on the ID
  
  const handleRatingSubmit = (ratingData) => {
    console.log("Rating submitted:", ratingData);
    // In a real app, you would send this to an API
    alert("Thank you for your rating!");
    setShowRatingForm(false);
  };

  // Status badge color
  const statusColors = {
    "Confirmed": "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    "Completed": "bg-green-100 text-green-800",
    "Cancelled": "bg-red-100 text-red-800"
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Booking Summary</h1>
                <p className="text-gray-500">Booking #{booking.id}</p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
                {booking.status}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="md:col-span-2 rounded-xl border bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-6">Service Details</h2>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Service Provider</p>
                  <p className="font-medium">{booking.providerName}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Service Type</p>
                  <p className="font-medium">{booking.providerService}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Date</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <p>{booking.date}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Time</p>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <p>{booking.time}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Location</p>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <p>{booking.location}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Budget</p>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                    <p>${booking.budget}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-gray-600">{booking.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Additional Notes</h3>
                  <p className="text-gray-600">{booking.notes}</p>
                </div>
              </div>
              
              {booking.status === "Completed" && !showRatingForm && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowRatingForm(true)}
                    className="btn btn-primary"
                  >
                    Rate This Service
                  </button>
                </div>
              )}
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="md:col-span-1 space-y-6"
            >
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Booking Timeline</h2>
                
                <div className="relative pl-6 space-y-6">
                  <div className="absolute top-0 bottom-0 left-2 w-0.5 bg-gray-200"></div>
                  
                  {booking.timeline.map((event, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-6 mt-1.5 h-4 w-4 rounded-full bg-purple-600"></div>
                      <div>
                        <h3 className="font-medium">{event.status}</h3>
                        <p className="text-sm text-gray-500">
                          {event.date} at {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Actions</h2>
                
                <div className="space-y-3">
                  <Link to="/messages" className="btn btn-outline w-full">
                    Message Provider
                  </Link>
                  
                  {booking.status === "Confirmed" && (
                    <button className="btn btn-outline w-full text-red-600 border-red-600 hover:bg-red-50">
                      Cancel Booking
                    </button>
                  )}
                  
                  <Link to="/offers" className="btn btn-outline w-full">
                    View All Bookings
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
          
          {showRatingForm && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-6"
            >
              <RatingForm 
                bookingId={booking.id} 
                providerName={booking.providerName} 
                onSubmit={handleRatingForm}
              />
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}