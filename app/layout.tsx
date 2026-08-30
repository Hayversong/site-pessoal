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
  metadataBase: new URL(
    process.env.SITE_URL ?? 'https://hayth-portfolio.hayversoon.chatgpt.site',
  ),
  title: 'Hayverson | Desenvolvedor em formação',
  description:
    'Portfólio de Hayverson: projetos em Go e desenvolvimento web, decisões técnicas e aprendizados construídos na prática.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hayverson | Desenvolvedor em formação',
    description:
      'Projetos em Go e desenvolvimento web, com código e aprendizados documentados.',
    images: [{ url: '/og.png', width: 1731, height: 909 }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hayverson | Desenvolvedor em formação',
    description:
      'Projetos em Go e desenvolvimento web, com código e aprendizados documentados.',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
