import ClientProviders from '@/components/ClientProviders';

export const metadata = {
  title: "Catálogo de Productos | Mi E-commerce",
  description: "Encuentra los mejores productos en nuestro catálogo online.",
  openGraph: {
    title: "Catálogo de Productos | Mi E-commerce",
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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
