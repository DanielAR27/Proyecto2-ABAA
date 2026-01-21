import ContactSection from '../components/ui/ContactSection';

const About = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Encabezado Hero */}
      <div className="bg-aba-red text-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Sobre ABA Animal</h1>
        <p className="opacity-90">Bienestar animal en la provincia de Cartago</p>
      </div>

      {/* Bloque de Historia / Misión */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-aba-red mb-4">Nuestra Misión</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Somos una organización sin fines de lucro dedicada a mejorar la calidad de vida de los animales en Cartago. 
          A través de campañas de castración, vacunación y educación, buscamos controlar la sobrepoblación y fomentar 
          la tenencia responsable.
        </p>
        <p className="text-gray-600 leading-relaxed">
          No contamos con un albergue físico, por lo que dependemos de nuestra red de hogares temporales y del 
          apoyo incondicional de nuestros voluntarios.
        </p>
      </div>

      {/* Componente de Contacto Reutilizado */}
      <ContactSection />
    </div>
  );
};

export default About;