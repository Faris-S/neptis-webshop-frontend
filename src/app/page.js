'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ENDPOINTS, API_BASE_URL } from '@/api/endpoints';
import { apiFetch } from '@/api/client';
import Header from '@/components/Header';

export default function ShopHome() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('desc');

  useEffect(() => { apiFetch(ENDPOINTS.PRODUCTS).then(setProducts).catch(()=>{}); }, []);

  const filtered = products.filter(p=>p.name.toLowerCase().includes(filter.toLowerCase()));
  const sorted = filtered.sort((a,b)=>sort==='asc'?new Date(a.date)-new Date(b.date):new Date(b.date)-new Date(a.date));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-4 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <input
            className="border p-2 flex-1"
            placeholder="Search products..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {sorted.map(p => (
            <li key={p.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
              <img src={API_BASE_URL + "/uploads/" + p.image_url} alt={p.name} className="w-full h-40 object-cover rounded" />
              <p className="font-semibold mt-2 text-center">{p.name}</p>
              <p className="text-sm text-gray-600">{p.price} KM</p>
              <Link
                href={`/product/${p.id}`}
                className="mt-3 text-blue-600 hover:underline"
              >
                Detalji
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
