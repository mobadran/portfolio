import { IoMdClose } from 'react-icons/io';

const Modal = ({ message, onClose }: { message: React.ReactNode; onClose: () => void }) => {
  return (
    <div className={`animate-overlay-fade-in fixed inset-0 z-50 flex items-center justify-center`} onClick={onClose}>
      <div
        className="animate-modal-in relative w-full max-w-sm rounded-2xl bg-gray-900 p-10 pb-5 text-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {message}
        <button
          className="absolute top-4 left-4 text-white hover:text-gray-300 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          <IoMdClose className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
