'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';

export default function CartPage() {
  const { items, updateQty, remove } = useCart();

  const total = items.reduce((t,i)=>t+i.qty*i.price,0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-4 max-w-xl mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-4">Košarica</h1>
        {items.length === 0 && <p>Nema artikala.</p>}
        <ul className="space-y-2">
          {items.map(i => (
            <li key={i.id} className="bg-white shadow p-3 flex justify-between items-center rounded">
              <span>{i.name}</span>
              <input
                type="number"
                value={i.qty}
                onChange={e => updateQty(i.id, parseInt(e.target.value))}
                className="border w-16 p-1"
              />
              <button onClick={() => remove(i.id)} className="text-red-600">Ukloni</button>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-medium">Ukupno: {total} KM</p>
        <Link
          href="/checkout"
          className="bg-green-600 text-white p-2 mt-4 inline-block rounded w-full text-center"
        >
          Nastavi na plaćanje
        </Link>
      </main>
    </div>
  );
}
