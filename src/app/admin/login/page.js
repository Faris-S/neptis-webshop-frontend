'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENDPOINTS } from '@/api/endpoints';
import { apiFetch } from '@/api/client';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = async e => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('grant_type', 'password');
      formData.append('username', username);
      formData.append('password', password);
      formData.append('scope', '');
      formData.append('client_id', '');
      formData.append('client_secret', '');

      const response = await apiFetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const token = response.access_token;
      if (!token) {
        setError('No token received');
        return;
      }

      localStorage.setItem('loggedIn', '1');
      localStorage.setItem('token', token);
      router.push('/admin');
    } catch (e) {
      setError('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <form onSubmit={submit} className="flex flex-col gap-3 w-72 bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-2 text-center">Admin Login</h1>
        <input
          className="border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
