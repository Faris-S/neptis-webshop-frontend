'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../layout';
import { ENDPOINTS } from '@/api/endpoints';
import { apiFetch } from '@/api/client';

export default function AddProduct({ children }) {
  const router = useRouter();
  const [data, setData] = useState({ name: '', description: '', price: 0, quantity: 0, image:'' });

  const submit = async e => {
  e.preventDefault();

  const formData = new FormData();
  const res = await fetch(ENDPOINTS.PRODUCTS);
  const products = await res.json();
  const maxId = products.reduce((max, p) => p.id > max ? p.id : max, 0);
  formData.append('id', (maxId + 1).toString());
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('price', data.price.toString());
  formData.append('image', data.image);

  try {
    await fetch(ENDPOINTS.PRODUCTS, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },

      body: formData,
    });

    router.push('/admin');
  } catch (err) {
    console.error('Upload failed:', err);
    alert('Greška prilikom slanja artikla.');
  }
};

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Novi Artikal</h1>
      <form onSubmit={submit} className="flex flex-col gap-3 max-w-md">
        <label className="font-medium">Naziv</label>
        <input
          className="border p-2 rounded"
          placeholder="Banana"
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
        />
        <label className="font-medium">Slika</label>
        <input
  className="border p-2 rounded"
  type="file"
  accept="image/*"
  onChange={e => setData({ ...data, image: e.target.files[0] })}
/>
        <label className="font-medium">Opis</label>
        <textarea
          className="border p-2 rounded"
          placeholder="Opis proizvoda"
          value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })}
        />
        <label className="font-medium">Cijena</label>
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Cijena"
          value={data.price}
          onChange={e => setData({ ...data, price: e.target.value })}
        />
        <button className="bg-blue-600 text-white p-2 rounded">Sačuvaj</button>
      </form>
      {children}
    </div>
  );
}
