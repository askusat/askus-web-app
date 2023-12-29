// OfflinePage.tsx
import React from 'react';

const OfflinePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{`You're Offline`}</h1>
        <p className="text-gray-700">
          {`It seems you're not connected to the internet. Please check your connection and try again.`}
        </p>
      </div>
    </div>
  );
};

export default OfflinePage;
