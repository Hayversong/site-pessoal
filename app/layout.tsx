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
  title: 'Hayversong | Desenvolvedor em formação',
  description:
    'Portfólio de Hayversong: projetos em Go e desenvolvimento web, decisões técnicas e aprendizados construídos na prática.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hayversong | Desenvolvedor em formação',
    description:
      'Projetos em Go e desenvolvimento web, com código e aprendizados documentados.',
    images: [{ url: '/og.png', width: 1731, height: 909 }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hayversong | Desenvolvedor em formação',
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
