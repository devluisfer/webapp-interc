import { notFound } from 'next/navigation';
import { getProductBySku } from '@/services/productService';
import Image from 'next/image';

export default async function ProductPage({ params }: { params: { sku: string } }) {
  const product = await getProductBySku(params.sku);

  if (!product) {
    return notFound(); // Redirige a not-found.tsx si el producto no existe
  }

  // Asegurar que la imagen tenga "/" al inicio
  const imageUrl = product.image.startsWith('/') ? product.image : `/${product.image}`;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-700">{product.brand}</p>
      <p className="text-xl text-green-600">${product.price}</p>

      <div className="flex justify-center my-4">
        <Image
          src={imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="w-1/2 object-cover rounded-lg"
          priority
        />
      </div>
    </div>
  );
}
