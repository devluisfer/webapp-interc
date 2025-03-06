'use client';

import { ReactNode } from 'react';
import Navbar from './NavBar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="mt-16 p-4 container mx-auto mt-5">{children}</main>
    </>
  );
}
