// ✅ Makes this file a module (fixes the "await only at top-level" error)
export {}

import { NextRequest, NextResponse } from 'next/server'

// This assumes your callback receives a POST with JSON body
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Use a more specific name than 'status' to avoid global clashes
    const momoStatus = body.status
    const transactionId = body.financialTransactionId || 'N/A'
    const payer = body.payer?.partyId || 'Unknown'
    const amount = body.amount || 'Unknown'

    console.log('📥 MoMo Callback Received:')
    console.log('Status:', momoStatus)
    console.log('Transaction ID:', transactionId)
    console.log('Payer:', payer)
    console.log('Amount:', amount)

    // You can update your DB or take action here...

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('❌ MoMo Callback Error:', error)
    return NextResponse.json({ error: 'Failed to process MoMo callback' }, { status: 500 })
  }
}