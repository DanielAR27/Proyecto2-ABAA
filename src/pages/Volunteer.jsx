import { useState } from 'react';
import { useData } from '../context/DataContext';
import VolunteerForm from '../components/forms/VolunteerForm';
import Alert from '../components/ui/Alert';
import { useNavigate, Link } from 'react-router-dom';
import { FaCheckCircle, FaHeart, FaArrowLeft, FaUser } from 'react-icons/fa';

/**
 * Página Volunteer (Voluntariado)
 * * Controlador principal para el registro de nuevos colaboradores.
 * * Maneja el estado de carga y muestra la confirmación visual (Badge).
 */
const Volunteer = () => {
  const { addVoluntario } = useData();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState(null); // Para mostrar en la credencial

  const handleVolunteerSubmit = (formData) => {
    setIsLoading(true);
    
    // Se simula un pequeño retraso para mejorar la UX
    setTimeout(() => {
      try {
        const voluntarioFinal = {
          ...formData,
          // Se pueden agregar campos automáticos si fuera necesario
        };

        addVoluntario(voluntarioFinal);
        setNewVolunteer(voluntarioFinal);

        setStatus({ type: 'success', message: 'Registro completado' });
        window.scrollTo(0, 0);

      } catch (error) {
        setStatus({ type: 'error', message: 'Error al registrar voluntario.' });
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  // --- VISTA DE ÉXITO (CREDENCIAL DE BIENVENIDA) ---
  if (status.type === 'success' && newVolunteer) {
    return (
      <div className="content-wrapper max-w-lg mx-auto py-10 animate-fade-in">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 relative">
          
          {/* Cabecera Azul */}
          <div className="bg-blue-600 p-8 text-center text-white relative overflow-hidden">
            <FaCheckCircle className="text-5xl mx-auto mb-3 relative z-10" />
            <h2 className="text-3xl font-bold relative z-10">¡Bienvenido al Equipo!</h2>
            <p className="opacity-90 relative z-10">Gracias por unirte a ABA Animal</p>
          </div>

          {/* Cuerpo de la Credencial */}
          <div className="p-10 space-y-6">
            <div className="text-center">
               <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-md -mt-16 relative z-20">
                 <FaUser className="text-4xl text-gray-400" />
               </div>
               <h3 className="text-2xl font-extrabold text-gray-800">{newVolunteer.nombre}</h3>
               <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold uppercase mt-2">
                 Voluntario Oficial
               </span>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-3">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 text-sm">Área de Apoyo</span>
                <span className="font-bold text-gray-800">{newVolunteer.area_interes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Disponibilidad</span>
                <span className="font-bold text-gray-800 text-right text-sm">{newVolunteer.disponibilidad}</span>
              </div>
            </div>

            <div className="pt-2 text-center space-y-4">
              <p className="text-gray-500 text-sm">
                Te contactaremos pronto al <strong>{newVolunteer.telefono}</strong> para coordinar tu primera actividad.
              </p>
              <Link 
                to="/" 
                className="btn-primary w-full text-center block py-3 rounded-xl"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA NORMAL (FORMULARIO) ---
  return (
    <div className="content-wrapper max-w-3xl mx-auto py-8">
      
      {/* Botón Volver */}
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 text-gray-500 hover:text-aba-red mb-6 font-medium group transition-colors"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
      </button>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Únete al Voluntariado</h1>
        <p className="text-gray-500 mt-2 text-lg">Tu tiempo y apoyo hacen la diferencia en Cartago.</p>
      </div>

      <Alert type={status.type} message={status.message} />
      
      <VolunteerForm onSubmit={handleVolunteerSubmit} isLoading={isLoading} />
    </div>
  );
};

export default Volunteer;