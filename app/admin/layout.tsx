import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import React from 'react'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Get the session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  // If no session or user, redirect
  const user = session?.user
  if (!user) {
    redirect('/')
  }

  // Fetch profile with role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // If error or profile doesn't exist or not admin, redirect
  if (profileError || !profile || profile.role !== 'admin') {
    redirect('/')
  }

  // Render the admin layout if user is authorized
  return (
    <div className="p-6">
      <nav className="mb-4 flex gap-4 text-blue-600 underline">
        <a href="/admin">Dashboard</a>
        <a href="/admin/new-product">Add Product</a>
      </nav>
      <main>{children}</main>
    </div>
  )
}