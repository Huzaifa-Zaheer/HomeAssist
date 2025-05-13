import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Calendar, Clock, Filter, User } from 'lucide-react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import RequestCard from "../components/RequestCard";
import ProfileCompletion from "../components/ProfileCompletion";
import CounterOfferModal from '../components/CounterOfferModal';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Mock profile completion data
const mockProfileData = {
  personalInfo: true,
  contactInfo: true,
  serviceDetails: true,
  profilePicture: false,
  identityVerification: true,
  bankingInfo: false,
  availability: true,
};

// Mock service requests
const mockRequests = [
  {
    id: 1,
    userName: "John Smith",
    userEmail: "john@example.com",
    status: "Pending",
    date: "2023-11-15",
    time: "18:00",
    location: "123 Main St, Downtown",
    budget: 120,
    description: "Looking for a chef to prepare a romantic dinner for two. Italian cuisine preferred."
  },
  {
    id: 2,
    userName: "Emily Johnson",
    userEmail: "emily@example.com",
    status: "Pending",
    date: "2023-11-18",
    time: "19:30",
    location: "456 Park Ave, Midtown",
    budget: 200,
    description: "Birthday dinner for 4 people. Would like a 3-course meal with dessert."
  },
  {
    id: 3,
    userName: "Michael Brown",
    userEmail: "michael@example.com",
    status: "Pending",
    date: "2023-11-20",
    time: "12:00",
    location: "789 Broadway, Uptown",
    budget: 150,
    description: "Lunch for a business meeting. Need a professional chef who can prepare a variety of options."
  }
];

export default function ProviderDashboard() {
  const [requests, setRequests] = useState(mockRequests);
  const [providerName, setProviderName] = useState("Alex Johnson");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleAcceptRequest = (requestId) => {
    setRequests(
      requests.map(request => 
        request.id === requestId 
          ? { ...request, status: "Accepted" } 
          : request
      )
    );
    // In a real app, you would send this to an API
    alert(`Request #${requestId} accepted!`);
  };

  const handleCounterOffer = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleSubmitCounterOffer = (counterOffer) => {
    const negotiation = {
      timestamp: new Date().toISOString(),
      type: "counter",
      amount: counterOffer.amount,
      message: counterOffer.message
    };

    updateRequestStatus(selectedRequest.id, "Negotiating", negotiation);
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  // Filter requests based on status
  const filteredRequests = filterStatus === "all" 
    ? requests 
    : requests.filter(request => request.status.toLowerCase() === filterStatus.toLowerCase());

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
            <h1 className="text-3xl font-bold">Welcome back, {providerName}!</h1>
            <p className="text-gray-500">Manage your service requests and profile</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 space-y-6">
              <ProfileCompletion profile={mockProfileData} />

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: 0.2 }}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{requests.length}</div>
                    <div className="text-sm text-gray-500">New Requests</div>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {requests.filter(r => r.status === "Accepted").length}
                    </div>
                    <div className="text-sm text-gray-500">Accepted</div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">4.8</div>
                    <div className="text-sm text-gray-500">Rating</div>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">$1,240</div>
                    <div className="text-sm text-gray-500">This Month</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: 0.3 }}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <h2 className="text-lg font-semibold mb-4">Upcoming Schedule</h2>
                
                <div className="space-y-3">
                  <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Dinner for Two</div>
                      <div className="text-sm text-gray-500">Today, 7:00 PM</div>
                      <div className="text-sm text-gray-500">123 Main St</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Business Lunch</div>
                      <div className="text-sm text-gray-500">Tomorrow, 12:30 PM</div>
                      <div className="text-sm text-gray-500">456 Office Blvd</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-2">
              <div className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Service Requests</h2>
                  
                  <div className="flex items-center">
                    <select
                      className="form-select w-auto"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Requests</option>
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                {filteredRequests.length > 0 ? (
                  <div className="space-y-4">
                    {filteredRequests.map((request) => (
                      <RequestCard
                        key={request.id}
                        request={request}
                        onAccept={handleAcceptRequest}
                        onCounter={handleCounterOffer}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No requests found</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      You don't have any {filterStatus !== "all" ? filterStatus.toLowerCase() : ""} requests at the moment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <CounterOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        request={selectedRequest}
        onSubmit={handleSubmitCounterOffer}
      />
      <Footer />
    </div>
  );
}