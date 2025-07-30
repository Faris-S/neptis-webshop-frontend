'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '../../../layout';
import { ENDPOINTS } from '@/api/endpoints';
import { apiFetch } from '@/api/client';

export default function EditProduct({ children }) {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState({ name: '', description: '', price: 0, quantity: 0, image:'' });

  useEffect(() => {
    apiFetch(`${ENDPOINTS.PRODUCTS}${id}`).then(setData).catch(()=>{});
  }, [id]);

  const submit = async e => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('price', data.price.toString());

  if (data.image instanceof File) {
    formData.append('image', data.image);
  }

  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${ENDPOINTS.PRODUCTS}${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    router.push(`/admin/products/${id}`);
  } catch (err) {
    console.error('Product update failed:', err);
    alert('Greška prilikom ažuriranja proizvoda.');
  }
};

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Edit Artikal</h1>
      <form onSubmit={submit} className="flex flex-col gap-3 max-w-md">
        <label className="font-medium">Sva polja moraju biti unesena</label>
        <label className="font-medium">Naziv</label>
        <input
          className="border p-2 rounded"
          placeholder="Naziv"
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
        />
        <label className="font-medium">Slika</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setData({ ...data, image: e.target.files[0] })}
        />
        <label className="font-medium">Opis</label>
        <textarea
          className="border p-2 rounded"
          placeholder="Opis"
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
        <button className="bg-blue-600 text-white p-2 rounded">Save</button>
      </form>
      {children}
    </div>
  );
}
