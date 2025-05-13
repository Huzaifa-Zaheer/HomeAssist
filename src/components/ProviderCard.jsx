import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Star, Clock } from 'lucide-react';

export function ProviderCard({ provider }) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="rounded-xl border bg-white overflow-hidden shadow-sm"
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
              <h3 className="text-xl font-bold">{provider.name}</h3>
              <p className="text-purple-600">{provider.service}</p>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium">{provider.rating}</span>
              <span className="ml-1 text-xs text-gray-500">
                ({provider.reviews})
              </span>
            </div>
          </div>

          <p className="mt-2 text-gray-600 line-clamp-2">{provider.bio}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="mr-1 h-4 w-4" />
              {provider.location} • {provider.distance}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-4 w-4" />
              {provider.availability}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Link to={`/providers/${provider.id}`} className="btn btn-outline btn-sm">
              View Profile
            </Link>
            <Link to={`/book/${provider.id}`} className="btn btn-primary btn-sm">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProviderCard;