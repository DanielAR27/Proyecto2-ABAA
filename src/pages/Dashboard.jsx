import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Link, useLocation } from 'react-router-dom';
import { exportToCSV } from '../utils/exportUtils';
import Modal from '../components/ui/Modal';
import Alert from '../components/ui/Alert';
import { FaPlus, FaTrash, FaEdit, FaSearch, FaCalendarAlt, FaPaw, FaHandsHelping, FaFilter, FaFileDownload} from 'react-icons/fa';

const Dashboard = () => {
  const { ferias, citas, voluntarios, deleteFeria, deleteCita, deleteVoluntario } = useData();
  const location = useLocation(); // Hook para leer el estado de la navegación
  
  // --- ESTADOS DE UI ---
  const [activeTab, setActiveTab] = useState('ferias'); // 'ferias' | 'citas' | 'voluntarios'

  // --- EFECTO PARA DETECTAR MENSAJES DE OTRAS PÁGINAS ---
  useEffect(() => {
    if (location.state?.successMessage) {
      setAlert({ type: 'success', message: location.state.successMessage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Se limpia el estado del navegador para que no salga el mensaje si se recarga
      window.history.replaceState({}, document.title);
      // Ocultar a los 5 segundos
      setTimeout(() => setAlert(null), 5000);
    }
  }, [location]);

  // Estados de Filtros (Se reinician al cambiar de tab)
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');      // Solo para Ferias
  const [filterCupos, setFilterCupos] = useState('');    // Solo para Ferias (Min cupos)
  const [filterArea, setFilterArea] = useState('');      // Solo para Voluntarios

  // Estados del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [alert, setAlert] = useState(null);

  // --- LÓGICA DE FILTRADO AVANZADO ---
  const getFilteredData = () => {
    const term = searchTerm.toLowerCase();

    if (activeTab === 'ferias') {
      return ferias.filter(f => {
        const matchText = f.titulo.toLowerCase().includes(term) || f.ubicacion.toLowerCase().includes(term);
        const matchDate = filterDate ? f.fecha === filterDate : true;
        const matchCupos = filterCupos ? f.cupos_disponibles >= parseInt(filterCupos) : true;
        return matchText && matchDate && matchCupos;
      });
    } 
    
    else if (activeTab === 'citas') {
      // Búsqueda inteligente: Revisa mascota, dueño O teléfono al mismo tiempo
      return citas.filter(c => 
        c.nombre_mascota.toLowerCase().includes(term) || 
        c.nombre_dueno.toLowerCase().includes(term) ||
        c.telefono.includes(term)
      );
    } 
    
    else { // Voluntarios
      return voluntarios.filter(v => {
        const matchText = v.nombre.toLowerCase().includes(term) || v.email.toLowerCase().includes(term) || v.telefono.includes(term);
        const matchArea = filterArea ? v.area_interes === filterArea : true;
        return matchText && matchArea;
      });
    }
  };

  const dataToShow = getFilteredData();

  // --- MANEJO DE TAB CHANGE ---
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reiniciar filtros al cambiar de pestaña para evitar confusiones
    setSearchTerm('');
    setFilterDate('');
    setFilterCupos('');
    setFilterArea('');
  };

  // --- LÓGICA DE ELIMINACIÓN ---
  const handleDeleteClick = (id, type) => {
    setItemToDelete({ id, type });
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    const { id, type } = itemToDelete;
    
    if (type === 'feria') deleteFeria(id);
    else if (type === 'cita') deleteCita(id);
    else if (type === 'voluntario') deleteVoluntario(id);

    setIsModalOpen(false);
    setItemToDelete(null);
    setAlert({ type: 'success', message: 'Elemento eliminado correctamente.' });
    setTimeout(() => setAlert(null), 5000);
  };

  // --- LÓGICA DE EXPORTACIÓN ---
  const handleExport = () => {
    if (activeTab === 'citas') {
      exportToCSV(citas, 'citas');
    } else if (activeTab === 'voluntarios') {
      exportToCSV(voluntarios, 'voluntarios');
    }
  };

  return (
    <div className="content-wrapper animate-fade-in pb-12">
      
      {/* 1. Encabezado y Estadísticas (Igual que antes) */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Panel Administrativo</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-red-50 p-4 rounded-full text-aba-red"><FaCalendarAlt size={24} /></div>
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase">Ferias Activas</p>
              <p className="text-3xl font-extrabold text-gray-800">{ferias.length}</p>
            </div>
          </div>
          <div className="stat-card bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-blue-50 p-4 rounded-full text-blue-600"><FaPaw size={24} /></div>
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase">Citas Totales</p>
              <p className="text-3xl font-extrabold text-gray-800">{citas.length}</p>
            </div>
          </div>
          <div className="stat-card bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-yellow-50 p-4 rounded-full text-yellow-600"><FaHandsHelping size={24} /></div>
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase">Voluntarios</p>
              <p className="text-3xl font-extrabold text-gray-800">{voluntarios.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ALERTA */}
      <Alert type={alert?.type} message={alert?.message} onClose={() => setAlert(null)} />

      {/* 2. BARRA DE CONTROL AVANZADA */}
      <div className="flex flex-col gap-6 mb-6">
        
        {/* A. TABS (Navegación) */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['ferias', 'citas', 'voluntarios'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-aba-red text-aba-red'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* B. TOOLBAR (Filtros y Acciones) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
          
          {/* Zona de Filtros (Izquierda) */}
          <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
            
            {/* Buscador de Texto (Siempre visible, placeholder dinámico) */}
            <div className="relative w-full md:w-66">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="text" 
                placeholder={
                  activeTab === 'ferias' ? 'Buscar evento...' : 
                  activeTab === 'citas' ? 'Mascota, dueño o teléfono...' : 
                  'Nombre, email o teléfono...'
                }
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-aba-red text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtros Específicos para FERIAS */}
            {activeTab === 'ferias' && (
              <>
                <input 
                  type="date" 
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-aba-red"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  title="Filtrar por fecha"
                />
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="Min. Cupos" 
                    className="w-28 pl-3 pr-2 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-aba-red"
                    value={filterCupos}
                    onChange={(e) => setFilterCupos(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Filtros Específicos para VOLUNTARIOS */}
            {activeTab === 'voluntarios' && (
              <div className="relative">
                 <FaFilter className="absolute left-3 top-3 text-gray-400 text-xs" />
                 <select 
                    className="pl-8 pr-8 py-2 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-aba-red appearance-none"
                    value={filterArea}
                    onChange={(e) => setFilterArea(e.target.value)}
                 >
                   <option value="">Todas las áreas</option>
                   <option value="Logística">Logística</option>
                   <option value="Transporte">Transporte</option>
                   <option value="Redes Sociales">Redes Sociales</option>
                   <option value="Hogar Temporal">Hogar Temporal</option>
                   <option value="Administrativo">Administrativo</option>
                 </select>
              </div>
            )}
          </div>

          {/* Zona de Acciones (Derecha) */}
          <div className="w-full lg:w-auto flex justify-end">
            {activeTab === 'ferias' && (
              <Link 
                to="/admin/ferias/crear" 
                className="btn-primary flex items-center gap-2 px-4 py-2 text-sm shadow-md"
              >
                <FaPlus /> Nueva Feria
              </Link>
            )}
            {/* Botón de Exportar CSV */}
            {(activeTab === 'citas' || activeTab === 'voluntarios') && (
               <button 
                 onClick={handleExport}
                 className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-all active:scale-95"
               >
                 <FaFileDownload className="text-gray-500" /> Exportar CSV
               </button>
            )}
          </div>

        </div>
      </div>

      {/* 3. TABLA DE DATOS (Misma estructura, filtrado mejorado) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {activeTab === 'ferias' ? 'Evento' : activeTab === 'citas' ? 'Paciente' : 'Voluntario'}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {activeTab === 'ferias' ? 'Estado' : 'Contacto'}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {dataToShow.length > 0 ? (
                dataToShow.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    
                    {/* COLUMNA 1 */}
                    <td className="px-6 py-4">
                      {activeTab === 'ferias' && (
                        <div className="flex items-center gap-3">
                          <img src={item.imagen} alt="" className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                          <div>
                             <span className="font-bold text-gray-800 block">{item.titulo}</span>
                             <span className="text-gray-500 text-xs">{item.fecha} • {item.hora}</span>
                          </div>
                        </div>
                      )}
                      {activeTab === 'citas' && (
                        <div>
                          <p className="font-bold text-gray-800 text-base">{item.nombre_mascota}</p>
                          <p className="text-gray-500">{item.especie} • {item.edad}</p>
                        </div>
                      )}
                      {activeTab === 'voluntarios' && (
                         <div>
                           <p className="font-bold text-gray-800 text-base">{item.nombre}</p>
                           <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded mt-1">
                             {item.area_interes}
                           </span>
                         </div>
                      )}
                    </td>

                    {/* COLUMNA 2 */}
                    <td className="px-6 py-4">
                      {activeTab === 'ferias' && (
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                             <span className={`w-2 h-2 rounded-full ${item.cupos_disponibles > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                             <span className="font-medium text-gray-700">{item.cupos_disponibles} libres</span>
                          </div>
                          <span className="text-xs text-gray-400">de {item.cupos_totales} totales</span>
                        </div>
                      )}
                      {activeTab === 'citas' && (
                        <div>
                          <p className="text-gray-800 font-medium">{item.nombre_dueno}</p>
                          <p className="text-gray-500">{item.telefono}</p>
                        </div>
                      )}
                      {activeTab === 'voluntarios' && (
                        <div>
                          <p className="text-gray-800">{item.email}</p>
                          <p className="text-gray-500">{item.telefono}</p>
                        </div>
                      )}
                    </td>

                    {/* COLUMNA 3 */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {activeTab === 'ferias' && (
                          <Link to={`/admin/ferias/editar/${item.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <FaEdit size={16} />
                          </Link>
                        )}
                        <button 
                          onClick={() => handleDeleteClick(item.id, activeTab === 'ferias' ? 'feria' : activeTab === 'citas' ? 'cita' : 'voluntario')}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                       <FaSearch className="text-3xl opacity-20" />
                       <p>No se encontraron resultados con esos filtros.</p>
                       <button onClick={() => { setSearchTerm(''); setFilterDate(''); setFilterCupos(''); setFilterArea(''); }} className="text-aba-red text-sm font-bold hover:underline">
                         Limpiar Filtros
                       </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirmar Eliminación">
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            ¿Estás seguro de que quieres eliminar este elemento? <br/>
            <span className="text-sm text-red-500 font-bold">Esta acción no se puede deshacer.</span>
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancelar</button>
            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md">Sí, Eliminar</button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Dashboard;