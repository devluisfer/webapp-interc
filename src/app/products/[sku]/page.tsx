import { notFound } from 'next/navigation';
import { getProductBySku } from '@/services/productService';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import '@/styles/globals.css';

// interface ProductPageProps {
//   params?: { sku?: string }; // Hacemos `params` opcional para evitar errores de acceso temprano
// }
type Params = Promise<{ sku: string }>

export default async function ProductPage(props: { params: Params }) {

  const params = await props.params;
  if (!params?.sku) {
    console.error("❌ Error: SKU no encontrado en los parámetros.");
    return notFound();
  }

  try {
    const product = await getProductBySku(params.sku);

    if (!product) {
      return notFound();
    }

    return (
      <div className="container mx-auto p-4 mt-5">
        <Breadcrumb category={product.category} productName={product.name} />

        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-700">{product.brand}</p>
        <p className="text-xl text-green-600">${product.price}</p>

        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="mx-auto my-4"
          priority
        />
      </div>
    );
  } catch (error) {
    console.error("❌ Error obteniendo el producto:", error);
    return notFound();
  }
}
