'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ENDPOINTS } from '@/api/endpoints';
import { apiFetch } from '@/api/client';
import Header from '@/components/Header';

export default function Checkout() {
  const router = useRouter();
  const { items, clear } = useCart();
  const [data, setData] = useState({ name:'', surname:'', address:'', phone:'', email:'' });

  const submit = async (e) => {
  e.preventDefault();

  let newId = 1;
  try {
    const orders = await apiFetch(ENDPOINTS.ORDERS, { method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
     });
    if (Array.isArray(orders) && orders.length > 0) {
      const maxId = Math.max(...orders.map(order => order.id));
      newId = maxId + 1;
    }
  } catch (err) {
    console.error('Failed to fetch orders:', err);
  }

  const payload = {
    id: newId,
    created_at: new Date().toISOString(),
    status: "pending",
    status_date: new Date().toISOString(),
    customer: {
      first_name: data.name,
      last_name: data.surname,
      address: data.address,
      phone: data.phone,
      email: data.email
    },
    items: items.map(item => ({
      product_id: item.id,
      quantity: item.qty 
    }))
  };

  try {
    console.log("Payload:", payload);

    await apiFetch(ENDPOINTS.ORDERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    clear();
    router.push('/');
  } catch (err) {
    console.error('Order failed:', err);
    alert('Greška prilikom narudžbe.');
  }
};


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-4 max-w-xl mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-4">Narudžba</h1>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Ime"
            value={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Prezime"
            value={data.surname}
            onChange={e => setData({ ...data, surname: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Adresa"
            value={data.address}
            onChange={e => setData({ ...data, address: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Telefon"
            value={data.phone}
            onChange={e => setData({ ...data, phone: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Email"
            value={data.email}
            onChange={e => setData({ ...data, email: e.target.value })}
          />
          <button className="bg-green-600 text-white p-2 rounded">Pošalji</button>
        </form>
      </main>
    </div>
  );
}
