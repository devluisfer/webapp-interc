'use client';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800">
      <h1 className="text-3xl font-bold">¡Ups! Algo salió mal</h1>
      <p className="text-lg">{error.message || "Ocurrió un error inesperado."}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
