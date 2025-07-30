'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ENDPOINTS } from '@/api/endpoints';
import { apiFetch } from '@/api/client';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('desc');

  useEffect(() => {
    apiFetch(ENDPOINTS.PRODUCTS).then(setProducts).catch(()=>{});
  }, []);

  const filtered = products.filter(p=>p.name.toLowerCase().includes(filter.toLowerCase()));
  const sorted = filtered.sort((a,b)=>sort==='asc'?new Date(a.date)-new Date(b.date):new Date(b.date)-new Date(a.date));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Artikli</h1>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <ul className="mt-4 space-y-2">
        {sorted.map(p => (
          <li key={p.id} className="bg-white shadow p-3 flex justify-between rounded">
            <span>{p.name}</span>
            <Link className="text-blue-600" href={`/admin/products/${p.id}`}>Detalji</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
