import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Home</Link>
        <Link href="/cart" className="text-lg">
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
