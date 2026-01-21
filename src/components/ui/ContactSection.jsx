import { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaGlobe } from 'react-icons/fa';

const ContactSection = () => {
  // Estado para capturar lo que el usuario escribe
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Validar que haya mensaje
    if (!formData.nombre || !formData.mensaje) {
      alert("Por favor completa al menos tu nombre y el mensaje.");
      return;
    }

    // 2. Construir el cuerpo del correo
    const subject = encodeURIComponent(`Consulta Web de ${formData.nombre}`);
    const body = encodeURIComponent(
      `Hola, soy ${formData.nombre}.\n\n` +
      `Mi correo de contacto es: ${formData.email}\n\n` +
      `MENSAJE:\n${formData.mensaje}`
    );

    // 3. Abrir el cliente de correo predeterminado
    window.location.href = `mailto:info@abaanimal.org?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 my-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">
        Contáctanos
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Info Directa */}
        <div className="space-y-4">
          <p className="text-gray-600">
            ¿Tienes dudas sobre las campañas o cómo ayudar? Escríbenos o visítanos en nuestras redes.
          </p>
          
          <div className="flex items-center gap-3 text-gray-700 hover:text-aba-red transition-colors">
            <FaWhatsapp className="text-aba-red text-xl" />
            <a href="https://wa.me/50688490592" target="_blank" rel="noopener noreferrer" className="font-medium">
              (506) 8849-0592
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-aba-red text-xl" />
            <a href="mailto:info@abaanimal.org" className="hover:underline">
              info@abaanimal.org
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FaGlobe className="text-aba-red text-xl" />
            <a href="https://www.abaanimal.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              www.abaanimal.org
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FaFacebook className="text-aba-red text-xl" />
            <a href="https://www.facebook.com/AsociacionABAA/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Síguenos en Facebook
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-aba-red text-xl" />
            <span>Cartago, Costa Rica</span>
          </div>
        </div>

        {/* Formulario Funcional (Mailto) */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="nombre"
            placeholder="Tu Nombre" 
            className="input-primary"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input 
            type="email" 
            name="email"
            placeholder="Tu Correo" 
            className="input-primary"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea 
            name="mensaje"
            rows="3" 
            placeholder="Escribe tu consulta aquí..." 
            className="input-primary"
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>
          
          <button type="submit" className="btn-primary w-full shadow-md hover:shadow-lg transition-all">
            Redactar Correo
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;