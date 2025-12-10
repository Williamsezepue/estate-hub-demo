import '@/app/globals.css';
import { Metadata } from 'next';
import {  poppins } from '@/app/lib/fonts';
import ScrollToHash from '@/app/components/smooth';
import { Suspense } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import { WebsiteProvider } from './components/provider';

export const metadata: Metadata = {
  title: 'Estate Hub — Real Estate Marketing Demo',
  description: 'A polished real estate marketing template designed for showcasing properties, attracting leads, and driving inquiries. Designed by Ezepue Williams',
};
 
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`flex flex-col`}>
      <body className={`${poppins.className} antialiased flex flex-1`}>
        <WebsiteProvider>
          <Suspense fallback={null}>
            <ScrollToHash />
          </Suspense>
          <div className='flex h-screen w-full flex-col overflow-hidden bg-slate-50'>
            <div id='scrollableParent' className='flex flex-col justify-between w-full relative overflow-x-hidden overflow-y-auto'>
              <Header />
                <div className='flex flex-1 flex-col min-h-max'>
                  <div className='flex min-h-screen justify-center'>
                    {children}
                  </div>
                </div>
              <Footer/>
            </div>
          </div>
        </WebsiteProvider>
      </body>
    </html>
  );
}