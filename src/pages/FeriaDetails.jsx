import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaPaw, FaExternalLinkAlt } from 'react-icons/fa';

const FeriaDetails = () => {
  const { id } = useParams(); 
  const { ferias } = useData();
  const navigate = useNavigate();

  const feria = ferias.find(f => f.id === Number(id));

  if (!feria) {
    return (
      <div className="content-wrapper text-center py-20">
        <FaExclamationTriangle className="text-5xl text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Feria no encontrada</h2>
        <button onClick={() => navigate('/')} className="text-blue-600 hover:underline mt-4">Volver al Inicio</button>
      </div>
    );
  }

  const isAbierta = feria.cupos_disponibles > 0;

  // Lógica de colores para los cupos (Semáforo)
  const getCuposColor = () => {
    if (feria.cupos_disponibles === 0) return "text-red-600 bg-red-50 border-red-100";
    if (feria.cupos_disponibles <= 10) return "text-yellow-600 bg-yellow-50 border-yellow-100";
    return "text-green-600 bg-green-50 border-green-100";
  };

  return (
    <div className="content-wrapper max-w-5xl mx-auto animate-fade-in pb-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-aba-red mb-6 font-medium group">
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Volver
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header Imagen */}
        <div className="relative h-64 md:h-96">
          <img src={feria.imagen} alt={feria.titulo} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end">
            <div className="p-6 md:p-10 text-white w-full">
              <span className="bg-blue-600/90 px-3 py-1 rounded-full text-xs font-bold uppercase mr-2">{feria.tipo}</span>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-2">{feria.titulo}</h1>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 md:p-10 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">Información</h3>
              <p className="text-gray-600 text-lg">Detalles completos sobre la campaña de {feria.tipo.toLowerCase()} en {feria.ubicacion}.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Requisitos</h3>
              <ul className="grid gap-3">
                {feria.requisitos && feria.requisitos.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg"><FaCheckCircle className="text-green-500 mt-1" />{req}</li>
                ))}
              </ul>
            </div>

            {/* --- NUEVA SECCIÓN: MAPA EMBEBIDO --- */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-aba-red" /> Ubicación del Evento
              </h3>
              
              <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 relative group h-64">
                {/* iframe de Google Maps (Modo Embed Gratuito) */}
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  title="Mapa de ubicación"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(feria.ubicacion)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full"
                ></iframe>
                
                {/* Overlay para dar click y abrir en App externa */}
                <a 
                  href={feria.mapa_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none group-hover:pointer-events-auto"
                >
                  <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-bold shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all flex items-center gap-2">
                    <FaExternalLinkAlt /> Abrir en Google Maps
                  </span>
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">{feria.ubicacion}</p>
            </div>

          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-lg sticky top-24">
              <h3 className="font-bold text-gray-900 mb-6">Detalles Logísticos</h3>
              <div className="space-y-4">
                <div className="flex gap-4"><FaCalendarAlt className="text-aba-red text-xl" /><div><p className="text-xs font-bold text-gray-500">FECHA</p><p className="font-bold">{feria.fecha}</p></div></div>
                <div className="flex gap-4"><FaClock className="text-aba-red text-xl" /><div><p className="text-xs font-bold text-gray-500">HORA</p><p className="font-bold">{feria.hora}</p></div></div>
                {/* Se eliminó la sección de ubicación de aquí como pediste */}
              </div>
              
              <div className="mt-8 pt-6 border-t">
                {isAbierta ? (
                  <Link to="/reservar" className="btn-primary w-full text-center block text-lg py-3 shadow-lg">Reservar Cupo</Link>
                ) : (
                  <button disabled className="bg-gray-100 text-gray-400 w-full py-3 rounded-lg font-bold">Agotado</button>
                )}
                
                {/* --- CONTADOR DE CUPOS ARREGLADO Y CON COLORES --- */}
                <div className="mt-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-gray-500 font-medium">Disponibilidad</span>
                    <span className={`font-bold text-xl ${getCuposColor().split(' ')[0]}`}>
                      {feria.cupos_disponibles} <span className="text-xs text-gray-400 font-normal">/ {feria.cupos_totales}</span>
                    </span>
                  </div>

                  {/* Barra Visual */}
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        feria.cupos_disponibles === 0 ? 'bg-red-500' : 
                        feria.cupos_disponibles <= 10 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(feria.cupos_disponibles / feria.cupos_totales) * 100}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-xs text-center text-gray-400 mt-2">
                    ¡Reserva pronto antes de que se agoten!
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeriaDetails;