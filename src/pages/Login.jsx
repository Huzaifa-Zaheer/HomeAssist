import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, User, Briefcase } from 'lucide-react'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

import Header from "../components/Header"
import Footer from "../components/Footer"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function Login() {
  const [activeTab, setActiveTab] = useState("user")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Login triggered");
    console.log("Active tab:", activeTab);
  
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", user.uid);
  
      if (activeTab === "provider") {
        const providerSnap = await getDoc(doc(db, "providers", user.uid));
        console.log("ProviderSnap exists:", providerSnap.exists());
        if (providerSnap.exists()) {
          return navigate("/provider-dashboard");
        } else {
          setError("No provider profile found.");
          await auth.signOut();
        }
      } else {
        const userSnap = await getDoc(doc(db, "users", user.uid));
        console.log("UserSnap exists:", userSnap.exists());
        if (userSnap.exists()) {
          return navigate("/dashboard");
        } else {
          setError("No user profile found.");
          await auth.signOut();
        }
      }
  
    } catch (err) {
      console.error("Login error:", err.code);
      setError("Login failed: " + err.message);
    }
  };
  
  

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Home
              </Link>
              <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-gray-500 dark:text-gray-400">Log in to your account to continue.</p>
              </motion.div>
            </div>

            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
              <div className="w-full">
                <div className="grid w-full grid-cols-2 mb-6">
                  <button
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-l-md ${
                      activeTab === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveTab("user")}
                  >
                    <User className="h-4 w-4" />
                    <span>User</span>
                  </button>
                  <button
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-r-md ${
                      activeTab === "provider"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveTab("provider")}
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>Provider</span>
                  </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {error && <p className="text-red-500">{error}</p>}
                  <div className="space-y-2">
                    <label htmlFor={activeTab === "user" ? "email" : "provider-email"} className="form-label">
                      Email
                    </label>
                    <input
                      id={activeTab === "user" ? "email" : "provider-email"}
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor={activeTab === "user" ? "password" : "provider-password"} className="form-label">
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <input
                      id={activeTab === "user" ? "password" : "provider-password"}
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                      className="form-input"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    Log In
                  </button>
                </form>
              </div>
            </motion.div>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-purple-600 hover:underline dark:text-purple-400">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}