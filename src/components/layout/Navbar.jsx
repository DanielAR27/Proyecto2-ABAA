import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaTimes, FaPaw } from 'react-icons/fa';
import logoImg from '../../assets/abaa_logo.png'
/**
 * Componente de Navegación Principal
 * Gestiona la responsividad y el estado activo de las rutas.
 */
const Navbar = () => {
  // Estado para controlar la visibilidad del menú en móvil
  const [isOpen, setIsOpen] = useState(false);

  // Lista de enlaces para facilitar el mantenimiento
  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Agendar Cita', path: '/reservar' },
    { name: 'Voluntariado', path: '/voluntariado' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Admin', path: '/admin' },
  ];

  // Función para cerrar el menú al hacer clic en un enlace (UX móvil)
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-slate-800 shadow-lg sticky top-0 z-50">
      <div className="content-wrapper py-3"> {/* Reutiliza el wrapper del index.css */}
        <div className="flex items-center justify-between h-10">
          
          {/* --- LOGOTIPO (IZQUIERDA) --- */}
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
            <div className="bg-white p-1.5 rounded-full group-hover:scale-105 transition-transform">
               <img src={logoImg} alt="ABA Animal" className="h-8 w-8" /> 
            </div>
            <span className="text-white font-bold text-lg tracking-wide group-hover:text-gray-200 transition-colors">
              ABA <span className="text-aba-red">Animal</span>
            </span>
          </Link>

          {/* --- MENÚ DE ESCRITORIO (DERECHA) --- */}
          <div className="hidden md:flex items-center space-x-4">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-gray-900 text-aba-red shadow-inner' // Estilo Activo
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white' // Estilo Inactivo + Hover
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* --- BOTÓN HAMBURGUESA (MÓVIL) --- */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MENÚ DESPLEGABLE (MÓVIL) --- */}
      {/* Se renderiza condicionalmente basado en el estado isOpen */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700">
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium
                  ${isActive 
                    ? 'bg-gray-800 text-aba-red' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;