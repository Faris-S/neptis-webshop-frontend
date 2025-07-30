'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { items } = useCart();
  const count = items.reduce((t, i) => t + i.qty, 0);
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">Neptis Webshop Frontend</Link>
      <Link href="/cart" className="relative">
        Cart
        {count > 0 && (
          <span className="ml-1 text-sm bg-red-500 rounded-full px-2">
            {count}
          </span>
        )}
      </Link>
    </header>
  );
}
