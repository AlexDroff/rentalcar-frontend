import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const {
    name,
    email,
    bookingDate,
    bookingStartDate,
    bookingEndDate,
    comment,
    carId,
  } = body;

  if (!name || !email || !carId) {
    return NextResponse.json(
      { error: 'Missing required booking fields' },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: 'RentalCar <onboarding@resend.dev>',
      to: process.env.EMAIL_TO as string,
      subject: 'New Car Booking',
      html: `
        <h2>New booking request</h2>
        <p><b>Car ID:</b> ${carId}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Rental period:</b> ${bookingDate || 'Not specified'}</p>
        <p><b>Start date:</b> ${bookingStartDate || 'Not specified'}</p>
        <p><b>End date:</b> ${bookingEndDate || 'Not specified'}</p>
        <p><b>Comment:</b> ${comment}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);

    return NextResponse.json(
      { error: 'Failed to send booking email' },
      { status: 500 }
    );
  }
}
