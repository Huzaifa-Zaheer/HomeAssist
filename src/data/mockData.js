// Mock data for the application

// Services
export const services = [
  {
    id: 1,
    name: "Home Cleaning",
    description: "Professional home cleaning services",
    icon: "🧹",
    image: "/placeholder.svg?height=200&width=300",
    category: "Home",
  },
  {
    id: 2,
    name: "Plumbing",
    description: "Expert plumbing repair and installation",
    icon: "🔧",
    image: "/placeholder.svg?height=200&width=300",
    category: "Home",
  },
  {
    id: 3,
    name: "Electrical Work",
    description: "Licensed electricians for all your needs",
    icon: "⚡",
    image: "/placeholder.svg?height=200&width=300",
    category: "Home",
  },
  {
    id: 4,
    name: "Lawn Care",
    description: "Complete lawn maintenance services",
    icon: "🌱",
    image: "/placeholder.svg?height=200&width=300",
    category: "Outdoor",
  },
  {
    id: 5,
    name: "Moving Assistance",
    description: "Reliable moving and packing services",
    icon: "📦",
    image: "/placeholder.svg?height=200&width=300",
    category: "Logistics",
  },
  {
    id: 6,
    name: "Handyman",
    description: "General repairs and home maintenance",
    icon: "🔨",
    image: "/placeholder.svg?height=200&width=300",
    category: "Home",
  },
]

// Service Providers
export const providers = [
  {
    id: 101,
    name: "John's Cleaning",
    service: "Home Cleaning",
    rating: 4.8,
    reviews: 124,
    price: "$25/hr",
    location: "Downtown",
    distance: "1.2 miles",
    image: "/placeholder.svg?height=100&width=100",
    description: "Professional cleaning service with 10+ years of experience",
    availability: ["Mon-Fri: 8am-6pm", "Sat: 9am-3pm"],
  },
  {
    id: 102,
    name: "Quick Fix Plumbing",
    service: "Plumbing",
    rating: 4.7,
    reviews: 89,
    price: "$40/hr",
    location: "Westside",
    distance: "2.5 miles",
    image: "/placeholder.svg?height=100&width=100",
    description: "Licensed plumbers specializing in repairs and installations",
    availability: ["Mon-Sat: 7am-7pm", "Emergency: 24/7"],
  },
  {
    id: 103,
    name: "ElectriPro",
    service: "Electrical Work",
    rating: 4.9,
    reviews: 156,
    price: "$45/hr",
    location: "Eastside",
    distance: "3.1 miles",
    image: "/placeholder.svg?height=100&width=100",
    description: "Certified electricians for residential and commercial projects",
    availability: ["Mon-Fri: 8am-5pm", "Emergency: 24/7"],
  },
  {
    id: 104,
    name: "Green Thumb Lawn Care",
    service: "Lawn Care",
    rating: 4.6,
    reviews: 78,
    price: "$30/hr",
    location: "Northside",
    distance: "4.2 miles",
    image: "/placeholder.svg?height=100&width=100",
    description: "Complete lawn maintenance including mowing, trimming, and landscaping",
    availability: ["Mon-Fri: 7am-6pm", "Sat: 8am-2pm"],
  },
]

// Incoming Requests (for user dashboard)
export const incomingRequests = [
  {
    id: 201,
    provider: "John's Cleaning",
    service: "Home Cleaning",
    date: "2023-06-15",
    time: "10:00 AM",
    status: "Pending",
    price: "$75",
    providerId: 101,
  },
  {
    id: 202,
    provider: "Quick Fix Plumbing",
    service: "Plumbing",
    date: "2023-06-16",
    time: "2:00 PM",
    status: "Confirmed",
    price: "$120",
    providerId: 102,
  },
]

// Active Bookings (for user dashboard)
export const activeBookings = [
  {
    id: 301,
    provider: "ElectriPro",
    service: "Electrical Work",
    date: "2023-06-20",
    time: "9:00 AM",
    status: "Scheduled",
    price: "$135",
    providerId: 103,
  },
  {
    id: 302,
    provider: "Green Thumb Lawn Care",
    service: "Lawn Care",
    date: "2023-06-18",
    time: "11:00 AM",
    status: "In Progress",
    price: "$90",
    providerId: 104,
  },
]

// Provider Jobs (for provider dashboard)
export const providerJobs = [
  {
    id: 401,
    client: "Sarah Johnson",
    service: "Home Cleaning",
    date: "2023-06-17",
    time: "1:00 PM",
    status: "Scheduled",
    price: "$75",
    address: "123 Main St",
  },
  {
    id: 402,
    client: "Michael Brown",
    service: "Home Cleaning",
    date: "2023-06-19",
    time: "10:00 AM",
    status: "Pending",
    price: "$100",
    address: "456 Oak Ave",
  },
  {
    id: 403,
    client: "Emily Davis",
    service: "Home Cleaning",
    date: "2023-06-21",
    time: "3:00 PM",
    status: "Confirmed",
    price: "$85",
    address: "789 Pine Rd",
  },
]

// Offers (for offers page)
export const offers = [
  {
    id: 501,
    provider: "John's Cleaning",
    service: "Home Cleaning",
    originalPrice: "$100",
    offerPrice: "$75",
    discount: "25%",
    validUntil: "2023-06-30",
    description: "Spring cleaning special! Book now and save 25% on our comprehensive home cleaning service.",
    providerId: 101,
  },
  {
    id: 502,
    provider: "Quick Fix Plumbing",
    service: "Plumbing",
    originalPrice: "$150",
    offerPrice: "$120",
    discount: "20%",
    validUntil: "2023-06-25",
    description: "Drain cleaning and inspection special. Limited time offer for new customers.",
    providerId: 102,
  },
  {
    id: 503,
    provider: "ElectriPro",
    service: "Electrical Work",
    originalPrice: "$200",
    offerPrice: "$160",
    discount: "20%",
    validUntil: "2023-07-05",
    description: "Home electrical safety inspection and minor repairs package.",
    providerId: 103,
  },
]
