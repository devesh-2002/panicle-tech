import React, { useState } from 'react';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-white text-center font-bold text-lg hover:text-gray-100 transition duration-300">
              <img
                src="https://panicle.tech/static/media/paniclelogowithtext%202.ceade7b6.png"
                alt="Logo"
                className="h-20 w-25"
              />
              
            </div>
            <div>
            <a href="/" className="text-white">Home</a>
            </div>
            <div>
            <a href="/employee-list" className="text-white">Employee List</a>
            </div>
            <div>
            <a href="/employee-form" className="text-white">Employee Form</a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              className="text-white hover:text-gray-100 transition duration-300 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-100">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <a href="/" className="text-gray-800">Home</a>
            </li>
            <li>
              <a href="/employee-list" className="text-gray-800">Employee List</a>
            </li>
            <li>
              <a href="/employee-form" className="text-gray-800">Employee Form</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
