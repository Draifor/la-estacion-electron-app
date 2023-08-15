import Spinner from './Spinner';

export default function Loading(): React.ReactNode {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Spinner className="w-16 h-16 text-blue-600" />
      <p className="mt-4 text-xl font-medium text-gray-100">Cargando...</p>
    </div>
  );
}
