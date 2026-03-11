import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'RentalCar',
    template: '%s | RentalCar',
  },
  description: 'Find and rent premium cars online',
  keywords: ['car rental', 'rent car', 'vehicles'],
  authors: [{ name: 'RentalCar Team' }],
  metadataBase: new URL('https://rentalcar.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />

        <main className="container">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
