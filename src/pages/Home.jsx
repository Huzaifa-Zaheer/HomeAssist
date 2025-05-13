import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle } from 'lucide-react'

import Header from "../components/Header"
import Footer from "../components/Footer"
import UserTypeSelector from "../components/UserTypeSelector"
import ServiceCategoryCard from "../components/ServiceCategoryCard"
import TestimonialCard from "../components/TestimonialCard"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const categories = [
  {
    id: 1,
    title: "Personal Chef",
    description: "Hire professional chefs to cook delicious meals at your home",
    icon: "/placeholder.svg",
    providers: 48,
  },
  {
    id: 2,
    title: "House Cleaning",
    description: "Professional cleaning services for your home or office",
    icon: "/placeholder.svg",
    providers: 124,
  },
  {
    id: 3,
    title: "Security Guard",
    description: "Trained security personnel for events or property protection",
    icon: "/placeholder.svg",
    providers: 37,
  },
  {
    id: 4,
    title: "Driver",
    description: "Professional drivers for personal or business transportation",
    icon: "/placeholder.svg",
    providers: 85,
  },
]

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    content:
      "Finding a reliable house cleaner used to be such a hassle. With ServiceConnect, I found the perfect match in minutes!",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Event Planner",
    content:
      "As an event planner, I need reliable staff on short notice. This platform has been a game-changer for my business.",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Personal Chef",
    content:
      "Since joining as a service provider, I've doubled my client base. The platform makes it easy to showcase my skills.",
    avatar: "/placeholder.svg",
  },
]

const userSteps = [
  {
    id: 1,
    title: "Create an account",
    description: "Sign up as a user in minutes",
    icon: CheckCircle,
  },
  {
    id: 2,
    title: "Find what you need",
    description: "Browse through verified service providers near you",
    icon: CheckCircle,
  },
  {
    id: 3,
    title: "Book services",
    description: "Schedule appointments with your preferred providers",
    icon: CheckCircle,
  },
  {
    id: 4,
    title: "Enjoy quality service",
    description: "Receive professional service and leave reviews",
    icon: CheckCircle,
  },
]

const providerSteps = [
  {
    id: 1,
    title: "Create an account",
    description: "Sign up as a service provider in minutes",
    icon: CheckCircle,
  },
  {
    id: 2,
    title: "List your services",
    description: "Showcase your skills and services to potential clients",
    icon: CheckCircle,
  },
  {
    id: 3,
    title: "Receive bookings",
    description: "Get notified when users book your services",
    icon: CheckCircle,
  },
  {
    id: 4,
    title: "Grow your business",
    description: "Build your reputation and expand your client base",
    icon: CheckCircle,
  },
]

export default function Home() {
  const [userType, setUserType] = useState("user")

  const steps = userType === "user" ? userSteps : providerSteps

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div className="flex flex-col gap-4" initial="hidden" animate="visible" variants={fadeIn}>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Connect with Trusted Service Providers
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Find verified professionals for all your needs - from personal chefs to security guards, all in one
                place.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/signup" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
                <Link to="/about" className="btn btn-outline btn-lg">
                  Learn More
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto w-full max-w-[500px] lg:max-w-none"
            >
              <img
                src="/placeholder.svg"
                alt="Service providers illustration"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 right-10 w-20 h-20 rounded-full bg-purple-200 dark:bg-purple-900/20 -z-10"
          animate={{
            y: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-blue-200 dark:bg-blue-900/20 -z-10"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900/20 px-3 py-1 text-sm text-purple-700 dark:text-purple-300">
              Simple Process
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform makes it easy to connect with service providers in just a few simple steps.
            </p>
          </motion.div>

          <div className="mt-16">
            <UserTypeSelector userType={userType} setUserType={setUserType} />

            <motion.div
              className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  className="flex flex-col items-center text-center space-y-4"
                  variants={fadeIn}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                    <step.icon className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900/20 px-3 py-1 text-sm text-purple-700 dark:text-purple-300">
              Services
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Browse Service Categories</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover a wide range of professional services available on our platform.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <ServiceCategoryCard key={category.id} category={category} />
            ))}
          </motion.div>

          <motion.div
            className="mt-12 flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Link to="/categories" className="btn btn-outline btn-lg group">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900/20 px-3 py-1 text-sm text-purple-700 dark:text-purple-300">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Hear from users and service providers who have found success on our platform.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-purple-600 dark:bg-purple-900">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
            <p className="max-w-[700px] text-purple-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of users and service providers on our platform today.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
              <Link to="/signup" className="btn btn-lg bg-white text-purple-600 hover:bg-gray-100">
                Sign Up Now
              </Link>
              <Link to="/login" className="btn btn-lg bg-transparent border border-white text-white hover:bg-white/10">
                Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}