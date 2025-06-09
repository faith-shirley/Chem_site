'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RWDsB2LTkmdavH1kTyIqfkrOzAYJHcDt8bkUInpCAkNbUZFbUrZVXxmQUXRWXRvV9ITcPpeuIAuFxu7xv2mlCsk00eaTXS3ah'); 

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    setTotal(cart.reduce((sum: number, item: any) => sum + item.price, 0));
  }, []);

 const handleCheckout = async () => {
  const stripe = await stripePromise;

  const lineItems = cartItems.map((item: any) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.title,
        description: item.description,
      },
      unit_amount: item.price * 100, // cents
    },
    quantity: 1,
  }));

  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: lineItems }),
  });

  const session = await response.json();

  if (session?.id) {
    stripe?.redirectToCheckout({ sessionId: session.id });
  } else {
    alert('Failed to create Stripe session.');
  }
};

  if (cartItems.length === 0) {
    return <div className="p-6 text-center">🛒 Your cart is empty.</div>;
  }

  function handleMoMoPayment(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.map((item, index) => (
        <div key={index} className="mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p>{item.description}</p>
          <p className="text-sm text-gray-600">${item.price}</p>
        </div>
      ))}
      <div className="mt-4 text-lg font-bold">
        Total: ${total.toFixed(2)}
      </div>

      <button
        onClick={handleCheckout}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Proceed to Checkout
      </button>

      <button onClick={handleMoMoPayment}
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Pay with Mobile Money
      </button>

    </div>
  );
}