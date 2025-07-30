'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '../layout';
import { ENDPOINTS } from '@/api/endpoints';
import { apiFetch } from '@/api/client';

export default function Orders({ children }) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = () => {
    apiFetch(ENDPOINTS.ORDERS, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(setOrders)
      .catch(() => {
        alert('Greška prilikom dohvaćanja narudžbi.');
      });
  };

  const fetchProducts = () => {
    apiFetch(ENDPOINTS.PRODUCTS)
      .then(setProducts)
      .catch(() => {
        alert('Greška prilikom dohvaćanja artikala.');
      });
  };

  const updateStatus = async (id, newStatus) => {
    setUpdating(id);

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${ENDPOINTS.ORDERS}${id}?status=${encodeURIComponent(newStatus)}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Greška: ${res.status} - ${msg}`);
      }

      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Ažuriranje statusa nije uspjelo.');
    } finally {
      setUpdating(null);
    }
  };

  const sorted = [...orders].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const getProductName = (product_id) => {
    const found = products.find(p => p.id === product_id);
    return found ? found.name : `Artikal #${product_id}`;
  };

  return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Narudžbe</h1>
        <ul className="space-y-3">
          {sorted.map((order) => (
            <li
              key={order.id}
              className="bg-white border shadow-sm p-4 rounded flex flex-col gap-2"
            >
              <div className="flex justify-between flex-wrap gap-4">
                <div>
                  <div className="text-sm text-gray-600">Narudžba broj:</div>
                  <div>{order.id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Datum:</div>
                  <div>{new Date(order.created_at).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Status:</div>
                  <div className="capitalize">{order.status}</div>
                </div>
              </div>

              <div className="flex gap-4 mt-2">
                <button
                  disabled={updating === order.id}
                  onClick={() => updateStatus(order.id, 'done')}
                  className="text-green-600 hover:underline disabled:opacity-50"
                >
                  Označi kao završeno
                </button>
                <button
                  disabled={updating === order.id}
                  onClick={() => updateStatus(order.id, 'rejected')}
                  className="text-red-600 hover:underline disabled:opacity-50"
                >
                  Označi kao odbijeno
                </button>
              </div>

              {order.items?.length > 0 && (
                <div className="mt-4 border-t pt-3">
                  <h3 className="text-sm font-semibold mb-2">Artikli:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {getProductName(item.product_id)} — {item.quantity} kom.
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
        {children}
      </div>
  );
}
