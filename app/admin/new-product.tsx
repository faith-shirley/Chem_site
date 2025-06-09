'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabaseClient';

const supabase = createClient();

export default function NewProduct() {
  const [form, setForm] = useState({ title: '', description: '', price: '' });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const slug = form.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    const { error } = await supabase.from('products').insert([
      { ...form, slug, price: parseFloat(form.price) },
    ]);

    if (!error) {
      alert('Product added!');
      setForm({ title: '', description: '', price: '' });
    } else {
      alert('Failed to add product');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        className="border w-full p-2"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        className="border w-full p-2"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <input
        className="border w-full p-2"
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
        Add Product
      </button>
    </form>
  );
}