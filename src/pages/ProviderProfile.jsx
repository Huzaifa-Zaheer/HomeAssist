import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Calendar, DollarSign, ThumbsUp } from 'lucide-react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import OfferModal from "../components/OfferModal";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Mock data for a provider
const mockProvider = {
  id: 1,
  name: "Alex Johnson",
  service: "Personal Chef",
  rating: 4.8,
  reviews: 124,
  bio: "Professional chef with 10+ years of experience in fine dining. Specializes in Italian and French cuisine. I've worked in several Michelin-starred restaurants across Europe before starting my personal chef service. I can create custom menus for any dietary requirement and special occasion.",
  location: "Downtown",
  distance: "1.2 miles away",
  availability: "Available today",
  image: "/placeholder.svg",
  yearsExperience: 10,
  hourlyRate: 75,
  languages: ["English", "French", "Italian"],
  specialties: ["Italian Cuisine", "French Cuisine", "Pastry", "Vegan Options"],
  availabilitySchedule: {
    monday: "9:00 AM - 6:00 PM",
    tuesday: "9:00 AM - 6:00 PM",
    wednesday: "9:00 AM - 6:00 PM",
    thursday: "9:00 AM - 6:00 PM",
    friday: "9:00 AM - 6:00 PM",
    saturday: "10:00 AM - 4:00 PM",
    sunday: "Unavailable"
  }
};

// Mock reviews
const mockReviews = [
  {
    id: 1,
    userName: "Sarah M.",
    rating: 5,
    date: "October 15, 2023",
    comment: "Alex prepared an amazing anniversary dinner for my husband and me. The food was restaurant quality, and he left the kitchen spotless. Highly recommend!"
  },
  {
    id: 2,
    userName: "Michael T.",
    rating: 4,
    date: "September 28, 2023",
    comment: "Great experience with Alex. He was professional and the food was delicious. Would book again for special occasions."
  },
  {
    id: 3,
    userName: "Jennifer L.",
    rating: 5,
    date: "September 10, 2023",
    comment: "Alex catered my daughter's graduation party and everyone was impressed. He accommodated all dietary restrictions and the presentation was beautiful."
  }
];

export default function ProviderProfile() {
  const { id } = useParams();
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  
  // In a real app, you would fetch the provider data based on the ID
  const provider = mockProvider;
  const reviews = mockReviews;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6">
          {/* Provider Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="rounded-xl overflow-hidden bg-white shadow-sm mb-8"
          >
            <div className="h-48 bg-purple-600 relative">
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                <h1 className="text-3xl font-bold">{provider.name}</h1>
                <p className="text-lg">{provider.service}</p>
              </div>
            </div>
            
            <div className="p-6 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={provider.image || "/placeholder.svg"}
                  alt={provider.name}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
                
                <div className="mt-4 flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-lg font-medium">{provider.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">
                    ({provider.reviews} reviews)
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{provider.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{provider.yearsExperience} years of experience</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="mr-2 h-4 w-4" />
                    <span>${provider.hourlyRate}/hour</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOfferModalOpen(true)}
                  className="btn btn-primary w-full mt-6"
                >
                  Send Offer
                </button>
              </div>
              
              <div className="md:w-2/3">
                <h2 className="text-xl font-bold mb-4">About</h2>
                <p className="text-gray-600 mb-6">{provider.bio}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.languages.map((language, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Availability</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.entries(provider.availabilitySchedule).map(([day, hours]) => (
                      <div 
                        key={day}
                        className="p-2 border rounded-md text-sm"
                      >
                        <span className="font-medium capitalize">{day}: </span>
                        <span className="text-gray-600">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Reviews Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="rounded-xl bg-white p-6 shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{review.userName}</h3>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      
      <OfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        providerId={provider.id}
        providerName={provider.name}
      />
    </div>
  );
}