'use client';

import { Inter } from 'next/font/google';
import { RecoilRoot } from 'recoil';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <html lang='en'>
        <body
          className={`${inter.className} m-12 pr-10 pl-10 bg-background-main`}
        >
          {children}
        </body>
      </html>
    </RecoilRoot>
  );
}
