'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const checkout = async () => {
    const stripe = await stripePromise;

    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(cart),
    });

    const data = await res.json();
    await stripe?.redirectToCheckout({ sessionId: data.sessionId });
  };

  if (cart.length === 0) return <p className="text-center py-10">Your cart is empty</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center bg-white p-4 shadow rounded">
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-semibold">Total: ${totalAmount}</p>
        <button
          onClick={checkout}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

// This code defines a CartPage component that displays the user's shopping cart.
// It retrieves the cart items from local storage, allows users to remove items, and calculates the total amount.
// It also integrates with Stripe for checkout functionality, redirecting users to the Stripe checkout page when they click the "Checkout" button.