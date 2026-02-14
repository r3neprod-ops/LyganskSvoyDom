import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'СвойДом Луганск — подбор ЖК и ипотечное сопровождение',
  description: 'Ипотечный брокер в Луганске: подбор ЖК, помощь с одобрением ипотеки и сопровождение сделки.',
  openGraph: {
    title: 'СвойДом Луганск',
    description: 'Подбор жилья и сопровождение ипотеки в лаконичном премиальном формате.',
    url: 'https://example.com',
    siteName: 'СвойДом Луганск',
    locale: 'ru_RU',
    type: 'website'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
