'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';

type Product = {
  title: string;
  description: string;
  price: number;
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        setProduct(data);
      }

      setLoading(false);
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const addToCart = () => {
    if (!product) return;

    // Get current cart or start with empty array
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Add new product to cart
    const updatedCart = [...existingCart, product];

    // Save cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    alert('Product added to cart!');
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="mb-4">{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
      
      <button
        onClick={addToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>

      <a
        href="/cart"
        className="block mt-4 text-blue-500 underline hover:text-blue-700"
      >
        View Cart
      </a>
    </div>
  );

}
