import { getProducts } from '@/services/productService';
import ProductList from '@/components/ProductList';

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const decodedCategory = decodeURIComponent(params.category);
  const formattedCategory = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1); // 🔥 Asegurar Capitalized
  console.log("🟡 Cargando categoría en page.tsx:", formattedCategory);

  const initialData = await getProducts({ category: formattedCategory });

  console.log("🔵 Datos iniciales en page.tsx:", initialData);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold capitalize">{formattedCategory}</h1>

      {initialData.products.length === 0 ? (
        <p className="text-center text-gray-600">No hay productos en esta categoría.</p>
      ) : (
        <ProductList initialProducts={initialData.products} category={formattedCategory} />
      )}
    </main>
  );
}
