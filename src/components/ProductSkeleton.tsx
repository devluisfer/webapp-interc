export default function ProductSkeleton() {
    return (
      <div className="border rounded-lg p-4 shadow-md animate-pulse">
        <div className="w-full h-40 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 w-3/4 mt-2 rounded"></div>
        <div className="h-4 bg-gray-300 w-1/2 mt-2 rounded"></div>
      </div>
    );
  }
  