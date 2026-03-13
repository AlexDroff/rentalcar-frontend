import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Header } from '@/components/Header/Header';
import './globals.css';

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
        <main>{children}</main>
      </body>
    </html>
  );
}
