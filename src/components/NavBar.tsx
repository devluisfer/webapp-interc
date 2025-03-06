'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 fixed top-0 left-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image src="/images/logo.jpg" alt="Logo" width={120} height={40} className="cursor-pointer rounded-full max-w-15" />
        </Link>
        <div className="space-x-6">
          <Link href="/about" className="hover:underline">Sobre Nosotros</Link>
          <Link href="/contact" className="hover:underline">Contacto</Link>
          <Link href="/help" className="hover:underline">Ayuda</Link>
        </div>
      </div>
    </nav>
  );
}
