import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import About from './pages/About'; // La página que creamos antes

// Componentes temporales para evitar errores 404 mientras desarrollamos
import Home from './pages/Home';
import Booking from './pages/Booking';
import Volunteer from './pages/Volunteer';
import FeriaDetails from './pages/FeriaDetails';
import Dashboard from './pages/Dashboard';
import CreateFeria from './pages/admin/feria/CreateFeria'
import UpdateFeria from './pages/admin/feria/UpdateFeria'

function App() {
  return (
    <div className="main-container"> {/* Clase del index.css */}
      
      {/* El Navbar se coloca fuera de Routes para que sea persistente */}
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Ruta Dinámica: Detalle de Feria (El :id es la variable) */}
          <Route path="/feria/:id" element={<FeriaDetails />} />
          <Route path="/reservar" element={<Booking />} />
          <Route path="/voluntariado" element={<Volunteer/>} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/ferias/crear" element={<CreateFeria />} />
          <Route path="/admin/ferias/editar/:id" element={<UpdateFeria />} />
        </Routes>
      </main>

      {/* Footer temporal */}
      <footer className="bg-slate-900 text-white py-6 text-center mt-auto">
        <p>© 2026 ABA Animal Cartago - Proyecto Universitario</p>
      </footer>
    </div>
  );
}

export default App;