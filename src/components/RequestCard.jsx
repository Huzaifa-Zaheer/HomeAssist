import { motion } from "framer-motion";
import { Calendar, Clock, DollarSign, MapPin } from 'lucide-react';

export function RequestCard({ request, onAccept, onCounter }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-white p-4 shadow-sm"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{request.userName}</h3>
          <p className="text-sm text-gray-500">{request.userEmail}</p>
        </div>
        <div className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {request.status}
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm">
          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
          <span>{request.date} at {request.time}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <MapPin className="mr-2 h-4 w-4 text-gray-500" />
          <span>{request.location}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
          <span>${request.budget}</span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium mb-1">Job Description</h4>
        <p className="text-sm text-gray-600">{request.description}</p>
      </div>
      
      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => onAccept(request.id)} 
          className="btn btn-primary btn-sm flex-1"
        >
          Accept Offer
        </button>
        <button 
          onClick={() => onCounter(request.id)} 
          className="btn btn-outline btn-sm flex-1"
        >
          Counter Offer
        </button>
      </div>
    </motion.div>
  );
}

export default RequestCard;