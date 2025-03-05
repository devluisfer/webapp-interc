import '@/styles/globals.css';
export default function Loading() {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 backdrop-blur-md z-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-24 w-24 border-8 border-gray-900 border-t-transparent"></div>
          <p className="mt-4 text-lg font-semibold text-gray-900 animate-pulse">Cargando productos...</p>
        </div>
      </div>
    );
  }
  