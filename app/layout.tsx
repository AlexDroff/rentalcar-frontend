import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Header } from '@/components/Header/Header';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-main',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'RentalCar',
    template: '%s | RentalCar',
  },
  description: 'Find and rent premium cars online',
  keywords: ['car rental', 'rent car', 'vehicles'],
  authors: [{ name: 'RentalCar Team' }],
  metadataBase: new URL('https://rentalcar-frontend-six.vercel.app/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${manrope.className}`}>
        <Header />
        <Toaster position="top-right" />
        <main>{children}</main>
      </body>
    </html>
  );
}
