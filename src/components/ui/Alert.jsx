import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const Alert = ({ type = 'success', message, onClose }) => {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 border animate-fade-in relative
      ${isSuccess ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}
    >
      <div className="mt-0.5 text-lg">
        {isSuccess ? <FaCheckCircle /> : <FaExclamationCircle />}
      </div>
      <div className="flex-1 pr-4"> {/* Padding derecho para que el texto no toque la X */}
        <h4 className="font-bold text-sm mb-1">{isSuccess ? '¡Éxito!' : 'Atención'}</h4>
        <p className="text-sm opacity-90">{message}</p>
      </div>
      
      {/* Botón de Cerrar (X) */}
      {onClose && (
        <button 
          onClick={onClose}
          className={`absolute top-3 right-3 p-1 rounded-full transition-colors
            ${isSuccess ? 'hover:bg-green-100 text-green-600' : 'hover:bg-red-100 text-red-600'}`}
        >
          <FaTimes size={14} />
        </button>
      )}
    </div>
  );
};

export default Alert;