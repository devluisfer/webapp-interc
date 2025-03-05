import { notFound } from 'next/navigation';
import { getProductBySku } from '@/services/productService';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';

export default async function ProductPage({ params }: { params: { sku: string } }) {
  try {
    const product = await getProductBySku(params.sku);

    if (!product) {
      return notFound();
    }

    return (
      <div className="container mx-auto p-4">
        {/* Breadcrumb */}
        <Breadcrumb category={product.category} productName={product.name} />

        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-700">{product.brand}</p>
        <p className="text-xl text-green-600">${product.price}</p>

        <div className="flex justify-center my-4">
          <Image src={product.image} alt={product.name} width={400} height={400} className="w-1/2 object-cover rounded-lg" priority />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw new Error("Error al cargar el producto");
  }
}
