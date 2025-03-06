This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 🛍️ Fernando E-commerce - Catálogo de Productos

Bienvenido al repositorio del **Catálogo de Productos**, una aplicación e-commerce construida con **Next.js 14**. Permite explorar productos con filtros, paginación y búsquedas en tiempo real, además de un sistema de detalle de productos.

🚀 **Desplegado en:**
- [🌐 Web en Vercel](https://webapp-interc.vercel.app/)
- [🔗 API en Render](https://db-zzme.onrender.com/products)  
  📌 *La API en Render se mantiene activa mientras reciba tráfico, de lo contrario, puede entrar en "modo suspendido" y demorar unos segundos en responder la primera petición.*

---

## 📖 **Índice**
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📌 Características](#-características)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Instalación y Uso](#-instalación-y-uso)
- [⚡ Comandos Disponibles](#-comandos-disponibles)
- [🧪 Testing](#-testing)
- [🌎 Variables de Entorno](#-variables-de-entorno)
- [📦 Despliegue](#-despliegue)
- [📜 Convenciones de Commits](#-convenciones-de-commits)

---

## 🛠️ **Tecnologías Utilizadas**
- **Frontend:** Next.js 15, TypeScript, TailwindCSS
- **Estado Global:** Context API
- **Manejo de Datos:** React Query
- **Pruebas:** Jest, React Testing Library
- **Linter & Estilos:** ESLint, Conventional Commits
- **Backend Mockeado:** JSON Server (API en Render)

---

## 📌 **Características**
✅ **Listar productos** con carga SSR  
✅ **Filtros** por categoría y marca  
✅ **Búsqueda con debounce** (500ms)  
✅ **Paginación**  
✅ **Interfaz de producto** con metadata SEO  
✅ **Skeleton loaders** en carga  
✅ **Optimización de imágenes** con `next/image`  
✅ **Pruebas unitarias** con cobertura superior al 60%  
✅ **Validación ESLint y convenciones de commits**  

---


---

## 🚀 **Instalación y Uso**
### 1️⃣ **Clonar el Repositorio**
```bash
git clone https://github.com/devluisfer/webapp-interc
cd tu-repo

Instalar Dependencias
    npm install
        node -v : 20.12.1

Configurar Variables de Entorno
    - Crea un archivo .env.local en la raíz y agrega
        - NEXT_PUBLIC_API_URL=https://db-zzme.onrender.com/products

Ejecutar el Servidor de Desarrollo
    npm run dev

Testing
    npm run test

Cobertura de Pruebas
    Cobertura superior al 60%
    Pruebas unitarias en componentes, hooks y API
    Verificación de la interfaz y flujo de usuario
    Pruebas de integración con datos simulados

Desplegar en Vercel
    vercel