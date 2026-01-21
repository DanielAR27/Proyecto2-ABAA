import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import { FaCalendarAlt, FaMapMarkerAlt, FaEye, FaExclamationTriangle } from 'react-icons/fa';

const Home = () => {
  const { ferias } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Lógica de Filtrado Mejorada
  const filteredFerias = ferias.filter(feria => {
    // 1. Filtro de Texto (Busca en título o ubicación)
    const matchesText = 
      feria.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feria.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Filtro de Fecha (Solo si el usuario seleccionó una fecha)
    const matchesDate = searchDate ? feria.fecha === searchDate : true;

    // Tienen que cumplirse AMBOS (AND)
    return matchesText && matchesDate;
  });

  return (
    <div className="content-wrapper animate-fade-in">
      
      {/* Encabezado */}
      <div className="text-center mb-10 mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Ferias de Salud Animal
        </h1>
        <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">
          Encuentra la campaña de castración o vacunación más cercana en Cartago.
        </p>
      </div>

      {/* Barra de Búsqueda */}
      <div className="mb-12">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          searchDate={searchDate}
          setSearchDate={setSearchDate}
        />
      </div>

      {/* Resultados */}
      {filteredFerias.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFerias.map((feria) => (
            <div key={feria.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 group">
              
              {/* Imagen con Overlay de Estado */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={feria.imagen} 
                  alt={feria.titulo} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold text-white uppercase shadow-sm ${feria.cupos_disponibles > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                  {feria.cupos_disponibles > 0 ? 'Abierta' : 'Agotada'}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                   <p className="text-white text-xs font-bold bg-blue-600/80 inline-block px-2 py-1 rounded mb-1 backdrop-blur-sm">
                     {feria.tipo}
                   </p>
                </div>
              </div>

              {/* Info Card */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-gray-800 leading-snug mb-3 line-clamp-2">
                  {feria.titulo}
                </h3>
                
                <div className="space-y-2 text-sm text-gray-600 mb-6 flex-grow">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-aba-red" />
                    <span>{feria.fecha} • {feria.hora}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-aba-red mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{feria.ubicacion}</span>
                  </div>
                </div>

                {/* Botones */}
                <div className="mt-auto flex gap-3">
                  <Link 
                    to={`/feria/${feria.id}`}
                    className="flex-1 bg-gray-50 text-gray-700 border border-gray-200 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEye className="text-gray-500" /> Detalles
                  </Link>

                  {feria.cupos_disponibles > 0 ? (
                    <Link 
                      to="/reservar" 
                      className="flex-1 btn-primary text-center flex items-center justify-center shadow-md shadow-blue-500/20"
                    >
                      Reservar
                    </Link>
                  ) : (
                     <button disabled className="flex-1 bg-gray-100 text-gray-400 border border-gray-200 py-2.5 rounded-lg font-medium cursor-not-allowed">
                       Lleno
                     </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Estado Vacío */
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
          <FaExclamationTriangle className="text-4xl mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900">No encontramos resultados</h3>
          <p className="text-gray-500">Intenta buscar por otra ubicación o fecha.</p>
          <button 
            onClick={() => setSearchTerm("")}
            className="mt-4 text-aba-red font-medium hover:underline"
          >
            Ver todas las ferias
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;