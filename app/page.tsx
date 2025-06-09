import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-200 to-purple-100 text-gray-800">
      <section className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Chemistry Resources</h1>
        <p className="mb-6">Buy video lessons, books, and more from your favorite chemistry teacher!</p>
        <div className="space-x-4">
          <Link href="/products">
            <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Explore Resources</button>
          </Link>
          <Link href="/login">
            <button className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition">Login</button>
          </Link>
        </div>
      </section>
    </main>
  );
}