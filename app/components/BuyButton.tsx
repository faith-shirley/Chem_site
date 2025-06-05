'use client'

import { useState } from 'react'

export default function BuyButton({ product }: { product: any }) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product }),
    })

    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      alert('Payment failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      {loading ? 'Redirecting...' : 'Buy Now'}
    </button>
  )
}
