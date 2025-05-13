import { motion } from "framer-motion";
import { Calendar, Clock, DollarSign, User } from 'lucide-react';

export function OfferCard({ offer, isProvider, onAccept, onCounter, onComplete }) {
  // Status badge color
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
    inProgress: "bg-purple-100 text-purple-800"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-white p-4 shadow-sm"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">
            {isProvider ? offer.userName : offer.providerName}
          </h3>
          <p className="text-sm text-gray-500">
            {isProvider ? "Client" : offer.providerService}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[offer.status]}`}>
          {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm">
          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
          <span>{offer.date} at {offer.time}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <User className="mr-2 h-4 w-4 text-gray-500" />
          <span>{isProvider ? "From: " : "To: "}{isProvider ? offer.userName : offer.providerName}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
          <span>${offer.budget}</span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium mb-1">Job Description</h4>
        <p className="text-sm text-gray-600">{offer.description}</p>
      </div>
      
      {offer.status === "pending" && (
        <div className="mt-4 flex gap-2">
          {!isProvider && (
            <button 
              onClick={() => onAccept(offer.id)} 
              className="btn btn-primary btn-sm flex-1"
            >
              Accept
            </button>
          )}
          <button 
            onClick={() => onCounter(offer.id)} 
            className="btn btn-outline btn-sm flex-1"
          >
            Counter
          </button>
        </div>
      )}
      
      {offer.status === "accepted" && (
        <div className="mt-4 flex gap-2">
          <button 
            onClick={() => onComplete(offer.id)} 
            className="btn btn-primary btn-sm flex-1"
          >
            Mark as Complete
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default OfferCard;