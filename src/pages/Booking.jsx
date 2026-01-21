import { useState } from 'react';
import { useData } from '../context/DataContext';
import BookingForm from '../components/forms/BookingForm';
import Alert from '../components/ui/Alert';
import { useNavigate, Link } from 'react-router-dom';
import { FaCheckCircle, FaTicketAlt, FaPaw, FaCalendarCheck, FaMapMarkerAlt } from 'react-icons/fa';

const Booking = () => {
  const { ferias, addCita } = useData();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  // Se guarda temporalmente los datos de la última cita para mostrarlos en el ticket
  const [lastBooking, setLastBooking] = useState(null); 

  const activeFerias = ferias.filter(f => f.estado === 'abierta' && f.cupos_disponibles > 0);

  const handleBookingSubmit = (formData) => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const nuevaCita = {
          id_feria: parseInt(formData.id_feria),
          nombre_dueno: formData.nombre_dueno,
          telefono: formData.telefono,
          nombre_mascota: formData.nombre_mascota,
          especie: formData.especie,
          peso: formData.peso,
          edad: formData.edad,
          fecha_registro: new Date().toISOString()
        };

        addCita(nuevaCita);
        
        // Guardar info para el ticket de éxito
        const feriaInfo = ferias.find(f => f.id === nuevaCita.id_feria);
        setLastBooking({ ...nuevaCita, feriaTitulo: feriaInfo?.titulo, feriaFecha: feriaInfo?.fecha });

        setStatus({ type: 'success', message: 'Reserva confirmada' });
        window.scrollTo(0, 0);

      } catch (error) {
        setStatus({ type: 'error', message: 'Error al procesar la solicitud.' });
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  // --- VISTA DE ÉXITO (TICKET DIGITAL) ---
  if (status.type === 'success' && lastBooking) {
    return (
      <div className="content-wrapper max-w-lg mx-auto py-10 animate-fade-in">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 relative">
          {/* Cabecera Verde */}
          <div className="bg-green-500 p-6 text-center text-white">
            <FaCheckCircle className="text-6xl mx-auto mb-3 shadow-sm" />
            <h2 className="text-2xl font-bold">¡Cita Confirmada!</h2>
            <p className="opacity-90">Tu espacio ha sido reservado</p>
          </div>

          {/* Cuerpo del Ticket */}
          <div className="p-8 space-y-6 relative">
            {/* Decoración de círculos laterales (efecto ticket) */}
            <div className="absolute top-0 left-0 w-6 h-6 bg-gray-50 rounded-br-full -mt-3 -ml-3"></div>
            <div className="absolute top-0 right-0 w-6 h-6 bg-gray-50 rounded-bl-full -mt-3 -mr-3"></div>

            <div className="text-center border-b border-dashed border-gray-300 pb-6">
              <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">Paciente</p>
              <h3 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
                <FaPaw className="text-aba-red text-2xl" /> {lastBooking.nombre_mascota}
              </h3>
              <p className="text-gray-600 mt-1">{lastBooking.especie} • {lastBooking.nombre_dueno}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><FaTicketAlt /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Evento</p>
                  <p className="font-bold text-gray-800 leading-tight">{lastBooking.feriaTitulo}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><FaCalendarCheck /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Fecha</p>
                  <p className="font-bold text-gray-800">{lastBooking.feriaFecha}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                to="/" 
                className="btn-primary w-full text-center block py-3 rounded-xl shadow-lg shadow-blue-500/30"
              >
                Volver al Inicio
              </Link>
              <p className="text-xs text-center text-gray-400 mt-4">
                Por favor guarda una captura de pantalla de este comprobante.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA NORMAL (FORMULARIO) ---
  return (
    <div className="content-wrapper max-w-3xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Agendar Cita</h1>
        <p className="text-gray-500 mt-2 text-lg">Asegura la atención de tu mascota.</p>
      </div>

      <Alert type={status.type} message={status.message} />
      <BookingForm ferias={activeFerias} onSubmit={handleBookingSubmit} isLoading={isLoading} />
    </div>
  );
};

export default Booking;