// components/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/" className="text-white">ABR Foods</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-gray-400">Home</Link>
            </li>
            <li>
              <Link href="/foods" className="hover:text-gray-400">Foods</Link>
            </li>
            <li>
              <Link href="/chefs" className="hover:text-gray-400">Chefs</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
