// components/Header.tsx
'use client'
// import { profile } from 'console';

// Example: Replace with your actual user profile logic
const profile = { role: 'admin' }; // Replace this with real authentication/user context
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold text-indigo-600">ChemTeacher</h2>
      <nav className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
        <Link href="/cart">Cart</Link>
        {profile?.role === 'admin' && (
  <a href="/admin" className="text-sm text-blue-500 underline">Admin</a>
)}
      </nav>
    </header>
  );
}