import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="text-gray-500 md:text-lg">
              Have questions or need assistance? Reach out to us at:
            </p>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Email:</strong> support@serviceconnect.com
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +1 (123) 456-7890
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> 123 ServiceConnect Lane, City, Country
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;