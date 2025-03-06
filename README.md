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

# 🚀 Next.js Project

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

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template\&filter=next.js\&utm_source=create-next-app\&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

# 🛍️ Fernando E-commerce - Catálogo de Productos

Bienvenido al repositorio del **Catálogo de Productos**, una aplicación e-commerce construida con **Next.js**. Permite explorar productos con filtros, paginación y búsquedas en tiempo real, además de un sistema de detalle de productos.

🚀 **Desplegado en:**

- 🌐 **Web en Vercel:** [webapp-interc.vercel.app](https://webapp-interc.vercel.app/)
- 🔗 **API en Render:** [db-zzme.onrender.com/products](https://db-zzme.onrender.com/products)\
  📌 *La API en Render se mantiene activa mientras reciba tráfico. Si no se usa durante un tiempo, puede entrar en "modo suspendido" y demorar unos segundos o minutos en responder la primera solicitud.*

---

## 📖 **Índice**

- [🛠️ Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [📌 Características](#-características)
- [🚀 Instalación y Uso](#-instalación-y-uso)
- [⚡ Comandos Disponibles](#-comandos-disponibles)
- [🧪 Testing](#-testing)
- [🌎 Variables de Entorno](#-variables-de-entorno)
- [📦 Despliegue](#-despliegue)
- [📜 Convenciones de Commits](#-convenciones-de-commits)
- [📌 Consideraciones Finales](#-consideraciones-finales)

---

## 🛠️ **Tecnologías Utilizadas**

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS
- **Manejo de Estado:** Context API
- **Data Fetching:** React Query
- **Pruebas:** Jest, React Testing Library
- **Linter & Estilos:** ESLint, Conventional Commits
- **Backend Mockeado:** JSON Server (API en Render)

---

## 📌 **Características**

✅ **Listar productos** con carga SSR\
✅ **Filtros** por categoría y marca\
✅ **Búsqueda con debounce** (500ms)\
✅ **Paginación**\
✅ **Interfaz de producto** con metadata SEO\
✅ **Skeleton loaders** en carga\
✅ **Optimización de imágenes** con `next/image`\
✅ **Pruebas unitarias** con cobertura superior al 60%\
✅ **Validación ESLint y convenciones de commits**

---

## 🚀 **Instalación y Uso**

### 1️⃣ **Clonar el Repositorio**

```bash
git clone https://github.com/devluisfer/webapp-interc.git
cd webapp-interc
```

### 2️⃣ **Instalar Dependencias**

```bash
npm install
```

📌 **Requisitos:**

- Node.js `v20.12.1` o superior

### 3️⃣ **Configurar Variables de Entorno**

Crea un archivo `.env.local` en la raíz y agrega:

```ini
NEXT_PUBLIC_API_URL=https://db-zzme.onrender.com/products
```

📌 **Para desarrollo local:**

```ini
NEXT_PUBLIC_API_URL=http://localhost:3001/products
```

### 4️⃣ **Ejecutar el Servidor de Desarrollo**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

---

## ⚡ **Comandos Disponibles**

| Comando          | Descripción                                                                        |
| ---------------- | ---------------------------------------------------------------------------------- |
| `npm run dev`    | Ejecuta el entorno de desarrollo en [http://localhost:3000](http://localhost:3000) |
| `npm run build`  | Construye el proyecto para producción                                              |
| `npm run start`  | Inicia la aplicación en modo producción                                            |
| `npm run lint`   | Ejecuta ESLint para verificar el código                                            |
| `npm run test`   | Ejecuta las pruebas con Jest                                                       |
| `npm run server` | Levanta el JSON Server en `localhost:3001`                                         |

---

## 📦 **Despliegue**

### **Desplegar en Vercel**

```bash
vercel
```

📌 **Nota:** Asegúrate de configurar `NEXT_PUBLIC_API_URL` en las variables de entorno de Vercel.

### **Desplegar API en Render**

1. **Subir el JSON Server a un repositorio aparte**.
2. **Conectar el repo a Render y desplegar**.
3. La API estará accesible en `https://db-zzme.onrender.com/products`.

📌 **Nota:** Render suspende la API tras cierto tiempo de inactividad. La primera solicitud puede demorar unos segundos o minutos.

---

## 📜 **Convenciones de Commits**

Este proyecto sigue el estándar **Conventional Commits**:

```
feat: Agregar nueva funcionalidad
fix: Corregir error en X
docs: Actualizar documentación
test: Agregar o modificar pruebas
style: Cambios de formato (espacios, comas)
```

Ejemplo:

```bash
git commit -m "feat: agregar paginación a listado de productos"
```


