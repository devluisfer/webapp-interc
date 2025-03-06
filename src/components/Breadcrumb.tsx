'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFilter } from '@/context/FilterContext';

interface BreadcrumbProps {
  category?: string;
  productName?: string;
}

export default function Breadcrumb({ category, productName }: BreadcrumbProps) {
  const router = useRouter();
const { resetFilters } = useFilter();
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    resetFilters();
    router.push('/');
  };
  return (
    <nav className="text-gray-600 text-sm mb-4">
      <ul className="flex space-x-2">
        <li>
          <Link href="/" className="hover:underline" onClick={handleHomeClick}>Inicio</Link>
          <span className="mx-2">/</span>
        </li>

        {category && (
          <li>
            <Link href={`/category/${category.toLowerCase()}`} className="hover:underline capitalize">
              {category}
            </Link>
            <span className="mx-2">/</span>
          </li>
        )}

        {productName && (
          <li className="text-gray-900 font-semibold">{productName}</li>
        )}
      </ul>
    </nav>
  );
}
