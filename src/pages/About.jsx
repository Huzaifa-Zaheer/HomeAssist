import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold">About Us</h1>
            <p className="text-gray-500 md:text-lg">
              ServiceConnect is dedicated to connecting users with trusted service providers. 
              Our platform ensures quality, reliability, and convenience for all your service needs.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;