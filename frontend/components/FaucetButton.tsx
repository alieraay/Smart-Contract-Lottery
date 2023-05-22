import { useState } from 'react';

function FunnyImageModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn-shape text-white bg-slate-600 p-3 mr-5" onClick={openModal}>
        FAUCET
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-5 rounded-md funny-image-container">
            <img src="/meme.jpeg" alt="Funny Image" className="funny-image" />
            <button className="text-white bg-red-500 px-3 py-1 rounded-md mt-3" onClick={closeModal}>
              Kapat
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .funny-image-container {
          animation: explode 1s forwards;
        }

        .funny-image {
          opacity: 100;
        }

        @keyframes explode {
          0% {
            transform: scale(10);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default FunnyImageModal;
