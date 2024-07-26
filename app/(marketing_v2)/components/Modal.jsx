import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      
      {/* Modal */}
      <div className=" fixed inset-0 md:inset-0 flex items-center justify-center  z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-[320px]m md: max-w-4xl  md: w-full relative">
          <button 
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
