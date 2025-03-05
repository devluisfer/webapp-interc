import Link from 'next/link';
import '@/styles/globals.css';
export default function NotFoundPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg">El producto que buscas no fue encontrado.</p>
        <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Volver al inicio</Link>
      </div>
    );
  }
  