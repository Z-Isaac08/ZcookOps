import { Locale, locales } from '@/lib/i18n';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://znote.isaacncho.tech'),
  title: 'ZNote',
  description: 'Cybersecurity playbooks and writeups',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export async function generateStaticParams() {
  return locales.map(locale => ({ lang: locale }));
}

import { Header } from '@/components/Header';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = (await params) as { lang: Locale };

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header lang={lang} />
        {children}
      </body>
    </html>
  );
}
