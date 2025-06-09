import { NextRequest, NextResponse } from 'next/server';
import { collections } from '@/lib/momoClient';
// Define PartyIdType enum since it's not exported from 'mtn-momo'
enum PartyIdType {
  MSISDN = 'MSISDN',
  EMAIL = 'EMAIL',
  PARTY_CODE = 'PARTY_CODE',
}

export async function POST(req: NextRequest) {
  const { amount, msisdn, externalId } = await req.json();

  try {
    const transactionId = await collections.requestToPay({
      amount: amount.toString(),
      currency: 'UGX',
      payer: { partyIdType: PartyIdType.MSISDN, partyId: msisdn },
      payerMessage: 'Payment for Chemistry Book',
      payeeNote: 'Thanks for your purchase',
    });

    return NextResponse.json({ id: transactionId });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
