import { motion } from "framer-motion";
import { CheckCircle, XCircle } from 'lucide-react';
import CNICUploader from './CNICUploader';

export function ProfileCompletion({ profile }) {
  // Calculate completion percentage
  const totalItems = Object.keys(profile).length;
  const completedItems = Object.values(profile).filter(Boolean).length;
  const percentage = Math.round((completedItems / totalItems) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-white p-4 shadow-sm"
    >
      <h2 className="text-lg font-bold mb-2">Profile Completion</h2>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-purple-600 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Your profile is {percentage}% complete. A complete profile helps you get more clients.
      </p>
      
      <div className="space-y-2">
        {Object.entries(profile).map(([key, value]) => (
          <div key={key} className="flex items-center">
            {value ? (
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
            )}
            <span className="text-sm">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </span>
          </div>
        ))}
        {/* Show CNICUploader if CNIC is missing */}
        {profile.cnicNumber ? null : (
          <div className="mt-4">
            <CNICUploader />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ProfileCompletion;