import '@/styles/globals.css';
export default function Loading() {
    return (
      <div className="text-center mt-10">
        <div className="animate-spin rounded-full h-24 w-24 border-8 border-gray-900 border-t-transparent"></div>
        <p className="text-gray-600 text-lg">Cargando producto...</p>
      </div>
    );
  }
  