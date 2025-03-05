import Link from 'next/link';
import Image from 'next/image';
import '@/styles/globals.css';
interface ProductProps {
    id: number;
    sku: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    image: string;
}

export default function ProductCard({ id, sku, name, brand, category, price, image }: ProductProps) {
    const imageUrl = image.startsWith('/') ? image : `/${image}`;
    return (
        <div className="border rounded-lg p-4 shadow-md">

            <Image
                src={imageUrl}
                alt={name}
                width={200}
                height={200}
                className="w-full h-80 object-cover rounded"
                priority
            />

            <h2 className="text-lg font-bold mt-2">{name}</h2>
            <p className="text-gray-600">{brand} - {category}</p>
            <p className="text-green-600 font-semibold">${price.toFixed(2)}</p>
            <Link href={`/products/${sku}`} className="text-blue-500 mt-2 block bg-sky-100">
                Ver detalles
            </Link>
        </div>
    );
}
