'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ENDPOINTS, API_BASE_URL} from '@/api/endpoints';
import { apiFetch } from '@/api/client';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { add } = useCart();

  useEffect(() => {
    apiFetch(`${ENDPOINTS.PRODUCTS}/${id}`).then(setProduct).catch(()=>{});
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-4 max-w-xl mx-auto w-full">
        <img
          src={API_BASE_URL + "/uploads/" + product.image_url}
          alt={product.name}
          className="w-full h-60 object-cover rounded"
        />
        <h1 className="text-2xl font-semibold mt-4">{product.name}</h1>
        <p className="mt-2 text-gray-700">{product.description}</p>
        <p className="mt-2 font-medium">Cijena: {product.price} KM</p>
        <button
          onClick={() => add(product)}
          style={{ cursor: 'pointer' }}
          className="bg-blue-600 text-white p-2 mt-4 rounded w-full"
        >
          Dodaj u košaricu
        </button>
      </main>
    </div>
  );
}
