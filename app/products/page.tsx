'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabaseClient';

type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
};

export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('products').select('*');

      if (!error && data) {
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>

            <Link
              href={`/products/${product.slug}`}
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}