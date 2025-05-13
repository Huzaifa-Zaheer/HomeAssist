import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Upload, User, Briefcase } from 'lucide-react'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

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

// You may want to configure this for your app's domain
const actionCodeSettings = {
  url: window.location.origin + "/login",
  handleCodeInApp: false,
}

export default function Signup() {
  const [activeTab, setActiveTab] = useState("user")
  const [idCardPreview, setIdCardPreview] = useState(null)

  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("user")
  const [serviceType, setServiceType] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleIdCardUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setIdCardPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError("")
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, { displayName: name })

      // choose collection based on role:
      const col = role === "provider" ? "providers" : "users"
      await setDoc(doc(db, col, user.uid), {
        displayName: name,
        email: user.email,
        role, // "user" or "provider"
        ...(role === "provider" && { serviceType }),
        createdAt: serverTimestamp(),
      })

      await sendEmailVerification(user, actionCodeSettings)
      navigate("/verify-email")
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }

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
                <h1 className="text-3xl font-bold">Create an Account</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Sign up to connect with service providers or offer your services.
                </p>
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
                    onClick={() => {
                      setActiveTab("user")
                      setRole("user")
                    }}
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
                    onClick={() => {
                      setActiveTab("provider")
                      setRole("provider")
                    }}
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>Provider</span>
                  </button>
                </div>

                <form className="space-y-4" onSubmit={handleSignUp}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      id={activeTab === "user" ? "name" : "provider-name"}
                      placeholder="John Doe"
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      id={activeTab === "user" ? "email" : "provider-email"}
                      type="email"
                      placeholder="john@example.com"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {activeTab === "provider" && (
                    <div className="space-y-2">
                      <label htmlFor="service-type" className="form-label">Service Type</label>
                      <select
                        id="service-type"
                        className="form-select"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        required
                      >
                        <option value="">Select a service type</option>
                        <option value="chef">Personal Chef</option>
                        <option value="cleaning">House Cleaning</option>
                        <option value="security">Security Guard</option>
                        <option value="driver">Driver</option>
                      </select>
                    </div>
                  )}
                  <div className="space-y-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      id={activeTab === "user" ? "password" : "provider-password"}
                      type="password"
                      className="form-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                    <input
                      id={activeTab === "user" ? "confirm-password" : "provider-confirm-password"}
                      type="password"
                      className="form-input"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {activeTab === "provider" && (
                    <div className="space-y-2">
                      <label className="form-label">ID Card Verification</label>
                      <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700 px-6 py-10">
                        <div className="space-y-2 text-center">
                          {idCardPreview ? (
                            <div className="space-y-4">
                              <img
                                src={idCardPreview || "/placeholder.svg"}
                                alt="ID Card Preview"
                                className="mx-auto h-32 w-auto object-cover rounded-md"
                              />
                              <button 
                                type="button" 
                                className="btn btn-outline btn-sm"
                                onClick={() => setIdCardPreview(null)}
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                <label
                                  htmlFor="id-card-upload"
                                  className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                                >
                                  <span>Upload ID Card</span>
                                  <input
                                    id="id-card-upload"
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleIdCardUpload}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="hidden"
                  >
                    <option value="user">User</option>
                    <option value="provider">Provider</option>
                  </select>
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <button className="btn btn-primary w-full" type="submit">
                    {activeTab === "user" ? "Create Account" : "Create Provider Account"}
                  </button>
                </form>
              </div>
            </motion.div>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-purple-600 hover:underline dark:text-purple-400">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}