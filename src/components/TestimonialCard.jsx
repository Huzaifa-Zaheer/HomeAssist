import { motion } from "framer-motion"
import { Quote } from 'lucide-react'

export function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950"
    >
      <Quote className="h-8 w-8 text-purple-200 dark:text-purple-900/40 absolute top-4 right-4" />
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar || "/placeholder.svg"}
          alt={testimonial.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold">{testimonial.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">{testimonial.content}</p>
    </motion.div>
  )
}

export default TestimonialCard