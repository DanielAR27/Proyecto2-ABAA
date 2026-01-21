import { useData } from '../../../context/DataContext';
import FeriaForm from '../../../components/forms/FeriaForm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from '../../../components/ui/Alert';

const CreateFeria = () => {
  const { addFeria } = useData();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleCreate = (data) => {
    try {
      // Cupos iniciales: Disponibles = Totales (Nadie ha reservado aún)
      const dataConCupos = { ...data, cupos_disponibles: data.cupos_totales, estado: 'abierta' };
      
      addFeria(dataConCupos);
      
      // Redirigir al Admin con mensaje en el estado
      navigate('/admin', { 
        state: { successMessage: 'Se ha creado la feria correctamente.' } 
      });

    } catch (err) {
      setError('Error al crear la feria');
    }
  };

  return (
    <div className="content-wrapper max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Nueva Feria</h1>
      {error && <Alert type="error" message={error} />}
      <FeriaForm onSubmit={handleCreate} buttonLabel="Crear Feria" />
    </div>
  );
};

export default CreateFeria;