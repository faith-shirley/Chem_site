// components/Header.tsx
'use client'
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
      </nav>
    </header>
  );
}