import { motion } from "framer-motion"
import { User, Briefcase } from 'lucide-react'

export function UserTypeSelector({ userType, setUserType }) {
  return (
    <div className="flex justify-center">
      <div className="relative flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <button
          className={`relative z-10 px-6 py-3 rounded-md flex items-center gap-2 transition-colors duration-200 ${
            userType === "user" ? "text-white" : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setUserType("user")}
        >
          <User className="h-5 w-5" />
          <span>For Users</span>
        </button>
        <button
          className={`relative z-10 px-6 py-3 rounded-md flex items-center gap-2 transition-colors duration-200 ${
            userType === "provider" ? "text-white" : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setUserType("provider")}
        >
          <Briefcase className="h-5 w-5" />
          <span>For Providers</span>
        </button>
        <motion.div
          className="absolute inset-0 z-0 m-1"
          initial={false}
          animate={{
            x: userType === "user" ? 0 : "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="w-1/2 h-full bg-purple-600 rounded-md" />
        </motion.div>
      </div>
    </div>
  )
}

export default UserTypeSelector