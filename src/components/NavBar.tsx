'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFilter } from '@/context/FilterContext';

export default function Navbar() {

    const router = useRouter();
    const { resetFilters } = useFilter(); //Obtener la función para resetear los filtros
  
    const handleLogoClick = () => {
        resetFilters (); // Restablecer filtros
      router.push('/'); // Redirigir a la página principal
    };
  return (
    <nav className="bg-blue-600 text-white p-4 fixed top-0 left-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
      <button onClick={handleLogoClick} className="flex items-center">
      <Link href="/">
          <Image src="/images/logo.jpg" alt="Logo" width={120} height={40} className="cursor-pointer rounded-full max-w-15" />
        </Link>
      </button>

        <div className="space-x-6">
          <Link href="/about" className="hover:underline">Sobre Nosotros</Link>
          <Link href="/contact" className="hover:underline">Contacto</Link>
          <Link href="/help" className="hover:underline">Ayuda</Link>
        </div>
      </div>
    </nav>
  );
}
