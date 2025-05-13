import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-purple-600"></div>
              <span className="text-xl font-bold">ServiceConnect</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connecting users with trusted service providers since 2023.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">For Users</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
                >
                  Browse Services
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
                >
                  User Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
                >
                  Safety Tips
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">For Providers</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
                >
                  Join as Provider
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
                >
                  Provider Guidelines
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} ServiceConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer