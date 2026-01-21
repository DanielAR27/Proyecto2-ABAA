import { useState, useEffect } from 'react';
import { FaSave, FaArrowLeft, FaExclamationCircle, FaTimes } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const FeriaForm = ({ initialData, onSubmit, buttonLabel = "Guardar", isLoading }) => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState(''); // Estado para errores de validación local
  
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    mapa_url: '',
    cupos_totales: 50,
    tipo: 'Castración',
    imagen: '',
    requisitosRaw: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        requisitosRaw: initialData.requisitos ? initialData.requisitos.join('\n') : ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError(''); // Limpiar error si el usuario escribe
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nuevosCuposTotales = parseInt(formData.cupos_totales);

    // --- VALIDACIÓN 1: NO NEGATIVOS ---
    if (nuevosCuposTotales < 0) {
      setFormError("Los cupos totales no pueden ser negativos.");
      return;
    }

    // --- VALIDACIÓN 2: LÓGICA DE ACTUALIZACIÓN ---
    let cuposDisponiblesFinales = nuevosCuposTotales; // Por defecto (Creación)

    if (initialData) {
      // Si se está editando, se tiene que respetar a los que ya se inscribieron.
      // Fórmula: Reservados = Totales_Viejos - Disponibles_Viejos
      const reservadosActuales = initialData.cupos_totales - initialData.cupos_disponibles;

      if (nuevosCuposTotales < reservadosActuales) {
        setFormError(`No puedes reducir el total a ${nuevosCuposTotales}. Ya hay ${reservadosActuales} cupos reservados.`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Se recalcula los disponibles basados en el nuevo total
      // Nuevos_Disponibles = Nuevo_Total - Ya_Reservados
      cuposDisponiblesFinales = nuevosCuposTotales - reservadosActuales;
    }

    const finalData = {
      ...formData,
      cupos_totales: nuevosCuposTotales,
      cupos_disponibles: cuposDisponiblesFinales, // Se envía el valor corregido
      requisitos: formData.requisitosRaw.split('\n').filter(line => line.trim() !== '')
    };
    
    delete finalData.requisitosRaw;
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      
      {/* Botón Volver */}
      <button 
        type="button" 
        onClick={() => navigate(-1)}
        className="text-gray-500 hover:text-aba-red flex items-center gap-2 mb-2"
      >
        <FaArrowLeft /> Cancelar
      </button>

      {/* Alerta de Error de Validación con botón de cierre */}
      {formError && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-3 border border-red-200 relative mb-6">
          <FaExclamationCircle className="mt-0.5 shrink-0" />
          <span className="font-medium text-sm pr-4">{formError}</span>
          <button 
            type="button" 
            onClick={() => setFormError('')}
            className="absolute top-3 right-3 text-red-500 hover:text-red-800 transition-colors"
          >
            <FaTimes size={14} /> {/* Asegúrate de importar FaTimes arriba */}
          </button>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Información de la Campaña</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* ... (Inputs de Título, Tipo, Fecha, Hora IGUALES) ... */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input type="text" name="titulo" required value={formData.titulo} onChange={handleChange} className="input-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Evento</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange} className="input-primary bg-white">
              <option value="Castración">Castración</option>
              <option value="Vacunación">Vacunación</option>
              <option value="Adopción">Adopción</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha (AAAA-MM-DD) *</label>
            <input type="date" name="fecha" required value={formData.fecha} onChange={handleChange} className="input-primary" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora *</label>
            <input type="text" name="hora" required value={formData.hora} onChange={handleChange} className="input-primary" placeholder="08:00 AM" />
          </div>

          {/* INPUT CORREGIDO: Cupos Totales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cupos Totales *</label>
            <input 
              type="number" 
              name="cupos_totales" 
              required 
              min="0" // Evita negativos en UI
              value={formData.cupos_totales} 
              onChange={handleChange} 
              className="input-primary" 
            />
            {initialData && (
              <p className="text-xs text-gray-500 mt-1">
                Reservados actualmente: <strong>{initialData.cupos_totales - initialData.cupos_disponibles}</strong>. 
                El total no puede ser menor a este número.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ... (Resto del form: Ubicación y Multimedia IGUAL) ... */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Ubicación y Multimedia</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lugar (Texto) *</label>
            <input type="text" name="ubicacion" required value={formData.ubicacion} onChange={handleChange} className="input-primary" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link Mapa (Google Maps) *</label>
            <input type="url" name="mapa_url" required value={formData.mapa_url} onChange={handleChange} className="input-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen URL</label>
            <input type="url" name="imagen" value={formData.imagen} onChange={handleChange} className="input-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos (Uno por línea)</label>
            <textarea 
              name="requisitosRaw" 
              rows="5" 
              value={formData.requisitosRaw} 
              onChange={handleChange} 
              className="input-primary font-mono text-sm"
            />
          </div>
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 flex justify-center items-center gap-2 text-lg">
        <FaSave /> {isLoading ? 'Guardando...' : buttonLabel}
      </button>
    </form>
  );
};

export default FeriaForm;