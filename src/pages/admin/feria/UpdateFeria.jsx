import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import FeriaForm from '../../../components/forms/FeriaForm';
import { useState, useEffect } from 'react';

const UpdateFeria = () => {
  const { id } = useParams();
  const { ferias, updateFeria } = useData();
  const navigate = useNavigate();
  
  const [feriaToEdit, setFeriaToEdit] = useState(null);

  useEffect(() => {
    const found = ferias.find(f => f.id === Number(id));
    if (found) setFeriaToEdit(found);
    else navigate('/admin');
  }, [id, ferias, navigate]);

  const handleUpdate = (data) => {
    // Se mantiene el ID original y se asegura la consistencia de datos
    const updatedFeria = { ...data, id: Number(id) };
    
    updateFeria(updatedFeria);
    
    // Redirigir al Admin con mensaje
    navigate('/admin', { 
      state: { successMessage: 'Se ha actualizado la feria correctamente.' } 
    });
  };

  if (!feriaToEdit) return <div className="p-10 text-center">Cargando...</div>;

  return (
    <div className="content-wrapper max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Feria</h1>
      <FeriaForm 
        initialData={feriaToEdit} 
        onSubmit={handleUpdate} 
        buttonLabel="Actualizar Cambios" 
      />
    </div>
  );
};

export default UpdateFeria;