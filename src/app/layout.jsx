import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'Ипотечный брокер — подбор ЖК и сопровождение сделки',
  description:
    'Ипотечный брокер: помощь с подбором жилых комплексов, одобрением ипотеки и сопровождением сделки в комфортном формате.',
  openGraph: {
    title: 'Ипотечный брокер — консультация и подбор ЖК',
    description: 'Подбор недвижимости и ипотечных программ с прозрачным сопровождением.',
    url: 'https://example.com',
    siteName: 'Свой Дом',
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
