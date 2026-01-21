import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHandsHelping, FaClock, FaCommentDots } from 'react-icons/fa';

/**
 * Componente VolunteerForm
 * * Renderiza el formulario de registro para nuevos voluntarios.
 * * Captura información de contacto, preferencias y disponibilidad según la estructura del JSON.
 */
const VolunteerForm = ({ onSubmit, isLoading }) => {
  
  // Se inicializa el estado con los campos vacíos correspondientes a voluntarios.json
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    area_interes: 'Logística', // Valor por defecto
    disponibilidad: '',
    experiencia_previa: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in space-y-8">
      
      {/* --- SECCIÓN 1: DATOS PERSONALES --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
          <FaUser className="text-aba-red" /> Información Personal
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
            <input 
              type="text" name="nombre" required
              value={formData.nombre} onChange={handleChange}
              className="input-primary" placeholder="Ej: Ana Guevara" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico *</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400"><FaEnvelope /></span>
                <input 
                  type="email" name="email" required
                  value={formData.email} onChange={handleChange}
                  className="input-primary pl-9" placeholder="ana@example.com" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono / WhatsApp *</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400"><FaPhone /></span>
                <input 
                  type="tel" name="telefono" required
                  value={formData.telefono} onChange={handleChange}
                  className="input-primary pl-9" placeholder="6060-1234" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN 2: PERFIL DE COLABORACIÓN --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
          <FaHandsHelping className="text-aba-red" /> ¿Cómo quieres ayudar?
        </h3>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Área de Interés *</label>
            <select 
              name="area_interes" 
              value={formData.area_interes} 
              onChange={handleChange}
              className="input-primary bg-white"
            >
              <option value="Logística">Logística y Orden (Ayuda en eventos)</option>
              <option value="Transporte">Transporte (Mover insumos o animales)</option>
              <option value="Redes Sociales">Fotografía y Redes Sociales</option>
              <option value="Hogar Temporal">Hogar Temporal</option>
              <option value="Administrativo">Apoyo Administrativo</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Selecciona el área donde te sientas más cómodo.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilidad de Tiempo *</label>
            <div className="relative">
               <span className="absolute left-3 top-3 text-gray-400"><FaClock /></span>
               <input 
                type="text" name="disponibilidad" required
                value={formData.disponibilidad} onChange={handleChange}
                className="input-primary pl-9" placeholder="Ej: Fines de semana, Lunes por la tarde..." 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experiencia Previa (Opcional)</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400"><FaCommentDots /></span>
              <textarea 
                name="experiencia_previa" rows="3"
                value={formData.experiencia_previa} onChange={handleChange}
                className="input-primary pl-9 pt-2" 
                placeholder="Cuéntanos si has participado en otras ONGs o tienes habilidades especiales..." 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botón de Envío */}
      <button 
        type="submit" 
        disabled={isLoading}
        className="btn-primary w-full py-3.5 text-lg font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1"
      >
        {isLoading ? 'Enviando Registro...' : 'Quiero ser Voluntario'}
      </button>

    </form>
  );
};

export default VolunteerForm;