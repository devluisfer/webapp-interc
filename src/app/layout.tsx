import ClientProviders from '@/components/ClientProviders';
import Layout from '@/components/Layout';

export const metadata = {
  title: "Catálogo de Productos | Fernando E-commerce",
  description: "Encuentra los mejores productos en nuestro catálogo online.",
  openGraph: {
    title: "Catálogo de Productos | Fernando E-commerce",
    description: "Explora nuestra variedad de productos con las mejores ofertas.",
    type: "website",
    url: "https://tu-ecommerce.vercel.app",
    images: [
      {
        url: "https://tu-ecommerce.vercel.app/images/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Catálogo de Productos",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ClientProviders>
        <Layout>{children}</Layout>
        </ClientProviders>
      </body>
    </html>
  );
}
