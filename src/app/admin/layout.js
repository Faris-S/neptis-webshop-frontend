'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('loggedIn');
    router.push('/admin/login');
  };


  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link href="/admin" className={pathname === '/admin' ? 'underline' : ''}>Početna</Link>
        <Link href="/admin/add-product" className={pathname.includes('add-product') ? 'underline' : ''}>Unos artikala</Link>
        <Link href="/admin/orders" className={pathname.includes('orders') ? 'underline' : ''}>Narudžbe</Link>
        <button onClick={logout} className="ml-auto">Logout</button>
      </nav>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
