import { createContext, useState, useEffect, useContext } from 'react';
import feriasData from '../data/ferias.json';
import citasData from '../data/citas.json';
import voluntariosData from '../data/voluntarios.json'; 

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // --- ESTADOS CON PERSISTENCIA ---
  const [ferias, setFerias] = useState(() => {
    const saved = localStorage.getItem('aba_ferias');
    return saved ? JSON.parse(saved) : feriasData;
  });

  const [citas, setCitas] = useState(() => {
    const saved = localStorage.getItem('aba_citas');
    return saved ? JSON.parse(saved) : citasData;
  });

  const [voluntarios, setVoluntarios] = useState(() => {
    const saved = localStorage.getItem('aba_voluntarios');
    return saved ? JSON.parse(saved) : voluntariosData;
  });

  // --- EFECTOS (Guardar en LocalStorage cada vez que algo cambia) ---
  useEffect(() => { localStorage.setItem('aba_ferias', JSON.stringify(ferias)); }, [ferias]);
  useEffect(() => { localStorage.setItem('aba_citas', JSON.stringify(citas)); }, [citas]);
  useEffect(() => { localStorage.setItem('aba_voluntarios', JSON.stringify(voluntarios)); }, [voluntarios]);

  // --- FUNCIONES DE LÓGICA  ---

  const addFeria = (nuevaFeria) => {
    const feriaConId = { ...nuevaFeria, id: Date.now() };
    setFerias([...ferias, feriaConId]);
  };

  const updateFeria = (feriaActualizada) => {
    setFerias(ferias.map(f => f.id === feriaActualizada.id ? feriaActualizada : f));
  };

  // *** Agrega Cita Y Descuenta Cupo ***
  const addCita = (nuevaCita) => {
    // 1. Guarda la cita
    const citaConId = { ...nuevaCita, id: Date.now(), estado: 'confirmada' };
    setCitas([...citas, citaConId]);

    // 2. ACTUALIZA LA FERIA (Resta un cupo)
    const feriasActualizadas = ferias.map(feria => {
      if (feria.id === nuevaCita.id_feria) {
        return {
          ...feria,
          cupos_disponibles: Math.max(0, feria.cupos_disponibles - 1), // Evitar negativos
          cupos_reservados: (feria.cupos_reservados || 0) + 1
        };
      }
      return feria;
    });

    setFerias(feriasActualizadas); // Esto disparará el useEffect y guardará en localStorage
  };

  const addVoluntario = (nuevoVoluntario) => {
    const volConId = { ...nuevoVoluntario, id: Date.now() };
    setVoluntarios([...voluntarios, volConId]);
  };

  // --- FUNCIONES DE ELIMINACIÓN ---
  const deleteFeria = (id) => {
    setFerias(prev => prev.filter(item => item.id !== id));
  };

  // --- FUNCIÓN DE ELIMINAR CITA (CON DEVOLUCIÓN DE CUPO) ---
  const deleteCita = (idCita) => {
    // Primero se encuentra la cita para saber a qué feria pertenece
    const citaAEliminar = citas.find(c => c.id === idCita);

    // Si por alguna razón no existe, no se hace nada
    if (!citaAEliminar) return;

    // Elimina la cita de la lista
    setCitas(prev => prev.filter(c => c.id !== idCita));

    // "Devuelve" el cupo a la feria correspondiente
    setFerias(prevFerias => prevFerias.map(feria => {
      // Si el ID de la feria coincide con el id_feria de la cita...
      if (feria.id === citaAEliminar.id_feria) {
        return {
          ...feria,
          cupos_disponibles: feria.cupos_disponibles + 1 // Se suma uno al cupo
        };
      }
      return feria;
    }));
  };

  const deleteVoluntario = (id) => {
    setVoluntarios(prev => prev.filter(item => item.id !== id));
  };

  // Función para borrar todo y reiniciar la demo (Útil para desarrollo)
  const resetDemo = () => {
    localStorage.clear();
    window.location.reload();
  };

  const value = {
    ferias,
    citas,
    voluntarios,
    addFeria,
    updateFeria,
    addCita,
    addVoluntario,
    deleteFeria,
    deleteCita,
    deleteVoluntario,
    resetDemo
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};