import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-5xl font-bold text-purple-600">404</h1>
          <p className="mt-4 text-gray-500 md:text-lg">
            Oops! The page you are looking for does not exist.
          </p>
          <Link to="/" className="btn btn-primary mt-6">
            Go Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;