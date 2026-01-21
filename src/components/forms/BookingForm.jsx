import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle, FaPaw, FaUser, FaPhone } from 'react-icons/fa';

/**
 * Componente BookingForm
 * * Se encarga de renderizar los campos necesarios para registrar una cita.
 * Gestiona la visualización dinámica de la información de la feria seleccionada.
 */
const BookingForm = ({ ferias, onSubmit, isLoading }) => {
  
  // Se inicializa el estado del formulario con los campos requeridos por el JSON de citas
  const [formData, setFormData] = useState({
    id_feria: '',
    nombre_dueno: '',
    telefono: '',
    nombre_mascota: '',
    especie: 'Perro', // Valor por defecto
    peso: '',
    edad: ''
  });

  // Estado derivado: Almacena el objeto completo de la feria seleccionada para mostrar sus detalles
  const [selectedFeriaInfo, setSelectedFeriaInfo] = useState(null);

  // Se ejecuta cada vez que cambia el ID de la feria en el formulario
  useEffect(() => {
    if (formData.id_feria) {
      // Se busca la feria correspondiente en el array de props
      const found = ferias.find(f => f.id === parseInt(formData.id_feria));
      setSelectedFeriaInfo(found || null);
    } else {
      setSelectedFeriaInfo(null);
    }
  }, [formData.id_feria, ferias]);

  // Manejador genérico para cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in space-y-8">
      
      {/* --- SECCIÓN 1: SELECCIÓN DEL EVENTO --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
          <FaCalendarAlt className="text-aba-red" /> Selección de Evento
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Feria o Campaña *</label>
            <select 
              name="id_feria" 
              value={formData.id_feria} 
              onChange={handleChange}
              required
              className="input-primary bg-white"
            >
              <option value="">-- Selecciona una ubicación --</option>
              {ferias.map(f => (
                <option key={f.id} value={f.id} disabled={f.cupos_disponibles <= 0}>
                  {f.fecha} - {f.titulo} {f.cupos_disponibles <= 0 ? '(AGOTADO)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Tarjeta de Información Automática (Feedback Visual) */}
          {selectedFeriaInfo && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
              <FaInfoCircle className="text-blue-600 mt-1 shrink-0" />
              <div className="text-sm">
                <p className="font-bold text-blue-800 mb-1">Detalles del Evento Seleccionado:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• <strong>Tipo:</strong> {selectedFeriaInfo.tipo}</li>
                  <li>• <strong>Ubicación:</strong> {selectedFeriaInfo.ubicacion}</li>
                  <li>• <strong>Horario:</strong> {selectedFeriaInfo.hora}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- SECCIÓN 2: DATOS DEL RESPONSABLE --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
          <FaUser className="text-aba-red" /> Datos del Dueño
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
            <input 
              type="text" name="nombre_dueno" required
              value={formData.nombre_dueno} onChange={handleChange}
              className="input-primary" placeholder="Ej: María Rodríguez" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono de Contacto *</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400"><FaPhone /></span>
              <input 
                type="tel" name="telefono" required
                value={formData.telefono} onChange={handleChange}
                className="input-primary pl-9" placeholder="8888-8888" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN 3: DATOS DEL PACIENTE --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
          <FaPaw className="text-aba-red" /> Datos de la Mascota
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Mascota *</label>
            <input 
              type="text" name="nombre_mascota" required
              value={formData.nombre_mascota} onChange={handleChange}
              className="input-primary" placeholder="Ej: Firulais" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Especie *</label>
            <select 
              name="especie" value={formData.especie} onChange={handleChange}
              className="input-primary bg-white"
            >
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Edad Aproximada *</label>
            <input 
              type="text" name="edad" required
              value={formData.edad} onChange={handleChange}
              className="input-primary" placeholder="Ej: 2 años" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg) *</label>
            <input 
              type="text" name="peso" required
              value={formData.peso} onChange={handleChange}
              className="input-primary" placeholder="Ej: 15 kg" 
            />
          </div>
        </div>
      </div>

      {/* Botón de Envío */}
      <button 
        type="submit" 
        disabled={isLoading}
        className="btn-primary w-full py-3.5 text-lg font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1"
      >
        {isLoading ? 'Procesando...' : 'Confirmar Reserva'}
      </button>

    </form>
  );
};

export default BookingForm;