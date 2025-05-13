import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-purple-600"></div>
          <span className="text-xl font-bold">ServiceConnect</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          {/* <Link to="/services" className="text-sm font-medium hover:underline underline-offset-4">
            Services
          </Link>
          <Link to="/providers" className="text-sm font-medium hover:underline underline-offset-4">
            Providers
          </Link> */}
          <Link to="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
        <div className="hidden md:flex gap-2">
          <Link to="/login" className="btn btn-outline btn-sm">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary btn-sm">
            Sign Up
          </Link>
        </div>
        <button 
          className="md:hidden btn btn-outline btn-sm p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-950 p-4">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-600"></div>
                <span className="text-xl font-bold">ServiceConnect</span>
              </Link>
              <button 
                className="btn btn-outline btn-sm p-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <div className="flex flex-col gap-6 mt-8">
              <Link to="/" className="text-lg font-medium hover:text-purple-600" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              {/* <Link to="/services" className="text-lg font-medium hover:text-purple-600" onClick={() => setIsMobileMenuOpen(false)}>
                Services
              </Link>
              <Link to="/providers" className="text-lg font-medium hover:text-purple-600" onClick={() => setIsMobileMenuOpen(false)}>
                Providers
              </Link> */}
              <Link to="/about" className="text-lg font-medium hover:text-purple-600" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="text-lg font-medium hover:text-purple-600" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                <Link to="/login" className="btn btn-outline w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  )
}

export default Header