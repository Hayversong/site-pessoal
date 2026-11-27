import type { Metadata } from 'next';
import { Geist, Geist_Mono, Pixelify_Sans, Silkscreen } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const pixelifySans = Pixelify_Sans({
  variable: '--font-pixelify',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const silkscreen = Silkscreen({
  variable: '--font-silkscreen',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://hayversong.vercel.app');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Hayverson Monteiro | Fullstack com foco em Frontend',
  description:
    'Portfólio de Hayverson Monteiro, desenvolvedor fullstack com foco em frontend: projetos em React, TypeScript e Next.js, com backend em Go e Python.',
  icons: {
    icon: '/favicon.svg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hayverson Monteiro | Fullstack com foco em Frontend',
    description:
      'Projetos em React, TypeScript e Next.js, com demos, código e decisões técnicas documentadas.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
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
    <html
      suppressHydrationWarning
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${pixelifySans.variable} ${silkscreen.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('hayversong-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}try{if(sessionStorage.getItem('warp-arrival')){sessionStorage.removeItem('warp-arrival');document.documentElement.dataset.warp='arriving'}}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
