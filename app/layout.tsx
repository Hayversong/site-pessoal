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

const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://hayth-portfolio.hayversoon.chatgpt.site');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Hayverson Monteiro | Fullstack com foco em Frontend',
  description:
    'Portfólio de Hayverson Monteiro, desenvolvedor fullstack com foco em frontend: projetos em React, TypeScript e Next.js, com backend em Go e Python.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hayverson Monteiro | Fullstack com foco em Frontend',
    description:
      'Projetos em React, TypeScript e Next.js, com demos, código e decisões técnicas documentadas.',
    images: [{ url: '/og.png', width: 1731, height: 909 }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hayverson Monteiro | Fullstack com foco em Frontend',
    description:
      'Projetos em React, TypeScript e Next.js, com demos, código e decisões técnicas documentadas.',
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('hayversong-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
