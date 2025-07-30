'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '../../layout';
import { ENDPOINTS } from '@/api/endpoints';
import { apiFetch } from '@/api/client';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    apiFetch(`${ENDPOINTS.PRODUCTS}${id}`).then(setProduct).catch(()=>{});
  }, [id]);

  const remove = async () => {
    await apiFetch(`${ENDPOINTS.PRODUCTS}${id}`, { 
      method: 'DELETE',
      body: JSON.stringify({ product_id: id }),
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem('token')}` }
    });
    router.push('/admin');
  };

  if (!product) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
      <p className="mb-2">{product.description}</p>
      <p className="mb-1 font-medium">Cijena: {product.price} KM</p>
      <div className="flex gap-2">
        <Link
          href={`/admin/products/${id}/edit`}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Edit
        </Link>
        <button
          onClick={remove}
          className="bg-red-600 text-white px-3 py-2 rounded"
        >
          Delete
        </button>
      </div>
      </div>
  );
}
