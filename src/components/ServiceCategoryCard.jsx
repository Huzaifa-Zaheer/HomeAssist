import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react'
import { Link } from "react-router-dom"

export function ServiceCategoryCard({ category }) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
    >
      <Link to={`/categories/${category.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {category.title}</span>
      </Link>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
            <img
              src={category.icon || "/placeholder.svg"}
              alt={category.title}
              className="h-6 w-6"
            />
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-500" />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold">{category.title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
          <p className="mt-4 text-sm font-medium text-purple-600 dark:text-purple-400">
            {category.providers} providers available
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceCategoryCard