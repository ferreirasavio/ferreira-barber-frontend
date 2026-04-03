type CardProps = {
  children?: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
