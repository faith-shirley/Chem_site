'use client';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // For now, hardcoded
    setProducts([
      {
        id: '1',
        title: 'Acids & Bases eBook',
        description: 'PDF format - 40 pages',
        price: 10,
      },
      {
        id: '2',
        title: 'Organic Chemistry Video',
        description: 'HD video - 45 mins',
        price: 20,
      },
    ]);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold text-xl">{product.title}</h2>
            <p>{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
