import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:3000'),
  title: 'Hayverson site pessoal',
  description:
    'Meu espaço pessoal para compartilhar projetos, aprendizados e novas experiências com programação.',
  openGraph: {
    title: 'Hayverson — Portfólio pessoal',
    description: 'Projetos, aprendizados e novas experiências com programação.',
    images: [{ url: '/og.png', width: 1792, height: 939 }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hayverson — Portfólio pessoal',
    description: 'Projetos, aprendizados e novas experiências com programação.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
