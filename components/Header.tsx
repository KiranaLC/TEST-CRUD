"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [userData, setUserData] = useState("");
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setUserData(query);
    router.push(`/?search=${query}`, undefined);
  };

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full shadow-md z-50">
      <div>
        <h1 className="lg:text-lg font-bold text-sm">CRUD Operation</h1>
      </div>
      <div className="flex items-center lg:w-[40%]">
        <input
          type="text"
          placeholder="Search..."
          value={userData}
          onChange={handleSearchChange}
          className="px-4 py-2 mr-4 rounded-lg bg-gray-800 text-white focus:outline-none w-full"
        />
      </div>
      <div className="relative">
        <button
          className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center"
          aria-label="Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
