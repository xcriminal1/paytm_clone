// src/components/LandingPage.js
import React, { useState } from "react";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-50 h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">PayClone</h1>
          <nav
            className={`md:flex ${
              isMenuOpen ? "flex" : "hidden"
            } md:visible md:space-x-4 space-y-4 md:space-y-0 absolute md:static top-16 right-0 bg-blue-600 md:bg-transparent md:p-0 p-4 md:w-auto w-full transition-transform duration-300 ease-in-out`}
          >
            <a href="#features" className="hover:underline">
              Features
            </a>
            <a href="#download" className="hover:underline">
              Download
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </nav>
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              aria-label="Menu"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center bg-white">
        <div className="container mx-auto text-center px-4 py-8 md:py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Ultimate Payment Solution
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Seamlessly manage your transactions with our easy-to-use app.
          </p>
          <a
            href="#download"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-100 py-16">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">Fast Transactions</h4>
              <p>Experience lightning-fast payments with minimal delay.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">Secure</h4>
              <p>
                We prioritize your security with advanced encryption and fraud
                protection.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">User-Friendly</h4>
              <p>
                Our intuitive interface makes managing your payments a breeze.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Download Now</h3>
          <p className="text-lg md:text-xl mb-8">
            Available on Android and iOS
          </p>
          <div className="flex justify-center">
            <a
              href="#"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300 mb-4 md:mb-0 md:mr-4"
            >
              Download for Android
            </a>
            <a
              href="#"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Download for iOS
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center px-4">
          <p>&copy; 2024 PayClone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
