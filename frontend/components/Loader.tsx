// components/Loader.tsx
import { Loader2Icon } from 'lucide-react';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <Loader2Icon className="w-10 h-10 animate-spin" />
    </div>
  );
};

export default Loader;
