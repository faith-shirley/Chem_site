// app/products/page.tsx
'use client'
import Link from 'next/link';

export default function ProductsPage() {
  const products = [
    { id: '1', title: 'Acids & Bases eBook', price: 'Free (demo)' },
    { id: '2', title: 'Organic Chemistry Video', price: '$5.00' },
  ];

  return (
    <main className="p-8">
      <h2 className="text-3xl font-bold mb-6">Available Resources</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {products.map((product) => (
          <div key={product.id} className="p-6 bg-white shadow rounded">
            <h3 className="text-xl font-semibold">{product.title}</h3>
            <p className="text-gray-600">{product.price}</p>
            <Link href={`/products/${product.id}`}>
              <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">View</button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}