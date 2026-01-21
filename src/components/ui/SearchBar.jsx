import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm, searchDate, setSearchDate }) => {
  return (
    <div className="bg-white rounded-full shadow-md border border-gray-200 p-2 flex flex-col md:flex-row items-center gap-2 max-w-2xl mx-auto">
      
      {/* Sección 1: Texto / Ubicación */}
      <div className="flex-1 w-full relative flex items-center px-4 md:border-r border-gray-200">
        <FaMapMarkerAlt className="text-gray-400 mr-3 shrink-0" />
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
            ¿Dónde?
          </label>
          <input
            type="text"
            className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent truncate"
            placeholder="Buscar ubicación o feria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Sección 2: Calendario / Fecha */}
      <div className="w-full md:w-48 relative flex items-center px-4">
        <FaCalendarAlt className="text-gray-400 mr-3 shrink-0" />
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
            ¿Cuándo?
          </label>
          <input
            type="date"
            className="w-full text-sm text-gray-600 outline-none bg-transparent cursor-pointer"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
      </div>

      {/* Botón Decorativo (Lupa) */}
      <div className="bg-aba-red hover:bg-red-700 text-white p-3 rounded-full transition-colors shadow-sm hidden md:block">
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBar;