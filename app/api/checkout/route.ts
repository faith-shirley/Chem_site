import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  const { items } = await req.json();

  const origin = req.headers.get('origin') || 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items, // already formatted in frontend
      mode: 'payment',
      success_url: `${origin}/api/checkout/success`,
      cancel_url: `${origin}/api/checkout/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}