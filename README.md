# Estrategia de Transformación Digital para la Gestión de Eventos de Salud y Voluntariado en la Asociación ABA Animal en Cartago

**Instituto Tecnológico de Costa Rica (TEC)**  
**Carrera:** Ingeniería en Computación

---

## Equipo de Desarrollo

**Estudiantes:**
- Daniel Alemán Ruiz - 2023051957
- José Julián Brenes Garro - 2022272865
- Luis Ángel Meza Chavarría - 2023800023

## Profesor Encargado
- Esteban Arias Méndez
- Curso: Computación y Sociedad (IC-7900)
- Ciclo: Verano 2025-2026

---

## Descripción de la Problemática

La Asociación Benévolo Ambiental (ABA) Animal en Cartago realiza una labor vital en el control de la población animal y la salud pública mediante campañas de castración y vacunación. Sin embargo, la gestión de estos eventos se realiza actualmente mediante procesos manuales y descentralizados (hojas de cálculo, mensajes de WhatsApp y redes sociales).

### Problemas Críticos Identificados

Esta falta de digitalización conlleva varios problemas críticos:

- **Saturación de canales de comunicación:** El personal pierde tiempo valioso respondiendo preguntas repetitivas sobre fechas y cupos.

- **Dificultad en el control de aforo:** Riesgo de overbooking (sobreventa) en las campañas debido a la falta de actualización en tiempo real.

- **Gestión ineficiente de voluntarios:** No existe una base de datos centralizada para perfilar y convocar colaboradores según sus habilidades.

- **Pérdida de datos:** La información de los pacientes y dueños queda dispersa, dificultando el seguimiento y la generación de reportes.

---

##  Solución Propuesta

Para abordar estos desafíos, se ha desarrollado un **Prototipo de Plataforma Web Integral (POC)** que centraliza la gestión operativa de la asociación. Esta solución tecnológica permite:

### Funcionalidades Principales

- **Visualización Pública:** Un portal donde la comunidad puede consultar las próximas ferias, ver el estado de los cupos en tiempo real (Semáforo de Disponibilidad) y conocer los requisitos.

- **Reservas en Línea:** Un sistema de agendamiento que permite a los usuarios reservar su espacio, descontando automáticamente el cupo del inventario total del evento.

- **Gestión de Voluntariado:** Un módulo de captación de talento que clasifica a los voluntarios por áreas de interés (Logística, Transporte, Redes Sociales, etc.).

- **Panel Administrativo:** Un dashboard unificado para que los encargados de ABA Animal puedan crear eventos, visualizar métricas, administrar citas y exportar la data a formatos compatibles (CSV) para su análisis en Excel.

---

## Arquitectura del Sistema

El proyecto está construido bajo una arquitectura de **Single Page Application (SPA)** utilizando React como librería principal. Para garantizar la agilidad en el desarrollo y una experiencia de usuario fluida sin necesidad de un backend complejo en esta etapa, se implementó un patrón de gestión de estado global mediante **Context API**.

La persistencia de datos se maneja a través del **LocalStorage** del navegador, simulando una base de datos persistente que permite realizar operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) completas. El diseño de interfaz utiliza **Tailwind CSS** para garantizar un diseño responsivo y moderno, optimizado para dispositivos móviles y de escritorio.

```
PROYECTO2-ABAA/
├── public/
├── src/
│   ├── assets/              
│   │   └── abaa_logo.png    (Logo de ABA animal)
│   │
│   ├── components/ 
│   │   ├── forms/          (Formularios reciclables)
│   │   │   ├── BookingForm.jsx         (Formulario de Citas)
│   │   │   ├── FeriaForm.jsx           (Formulario para crear/editar Ferias - Admin)
│   │   │   └── VolunteerForm.jsx       (Formulario de Voluntarios)
│   │   |
│   │   ├── layout/          (Estructura base de la página)
│   │   │   └── Navbar.jsx              (Navegación responsive con menú hamburguesa) 
│   │   │
│   │   ├── ui/              (Componentes "atómicos" y reutilizables)
│   │   │   ├── Alert.jsx               (Componente para alertas)         
│   │   │   ├── ContactSection.jsx      (Componente de Información de Contacto)
│   │   │   ├── Modal.jsx               (Componente para oscurecer y dar información)
│   │   │   └── SearchBar.jsx           (Componente de barra de búsqueda para Home)
│   │   │
│   ├── context/   (Estado Global para simular Backend)
│   │   └── DataContext.jsx  (Carga los JSONs y expone funciones) 
│   │   │
│   ├── data/                ("Base de datos" simulada)
│   │   ├── ferias.json
│   │   ├── citas.json
│   │   └── voluntarios.json
│   │
│   ├── pages/      (Vistas principales de las rutas)
│   │   ├── admin/           (Vistas administrativas)
│   │   |   └── feria/
│   │   |   |   ├── CreateFeria.jsx     (Crear una Feria / Evento)
│   │   |   |   └── UpdateFeria.jsx     (Actualizar una Feria / Evento)
│   │   ├── About.jsx        (Página "Sobre Nosotros")
│   │   ├── Booking.jsx      (Página de reserva) 
│   │   ├── Dashboard.jsx    (Panel Admin: Tablas y gestión) 
│   │   ├── FeriaDetails.jsx (Página de Información de una Feria / Evento) 
│   │   ├── Home.jsx         (Catálogo de eventos) 
│   │   └── Volunteer.jsx    (Página de registro de voluntarios) 
│   │
│   ├── utils/        (Utilidades)
│   │   └── exportUtils.js   (Exportación de archivos CSV)
│   ├── App.jsx              (Configuración de Rutas) 
│   ├── index.css            (Tailwind directives y estilos globales)
│   └── main.jsx             (Punto de entrada)
│
├── index.html               (Información básica para la página web)
├── README.md                (Documentación Oficial del Prototipo)
└── vite.config.js           (Configuraciones básicas e instalación de plugings)
```
---

## Tecnologías Utilizadas

- **Frontend:** React (Vite)
- **Estilos:** Tailwind CSS
- **Enrutamiento:** React Router DOM
- **Iconografía:** React Icons (FontAwesome)
- **Gestión de Estado:** React Context API
- **Utilidades:** Exportación a CSV con codificación UTF-8 (BOM)

---

## Instalación y Ejecución

Para ejecutar este proyecto en un entorno local, asegúrate de tener instalado **Node.js** y sigue estos pasos:

### 1. Clonar el repositorio

```bash
git clone https://github.com/DanielAR27/Proyecto2-ABAA
cd PROYECTO2-ABAAA
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

### 4. Abrir en el navegador

El proyecto estará disponible en `http://localhost:3000`

---

## Funcionalidades Destacadas

- **Control de Aforo en Tiempo Real:** El sistema impide reservas una vez que los cupos llegan a cero, mostrando alertas visuales.

- **Dashboard Administrativo:** Filtrado avanzado por fechas, cupos mínimos y búsqueda inteligente de pacientes/dueños.

- **Sistema de Alertas y Feedback:** Mensajes de confirmación tipo "Ticket" y modales de seguridad para acciones destructivas.

- **Exportación de Datos:** Generación de reportes CSV compatibles con Excel para el manejo administrativo de citas y voluntarios.

- **Persistencia Local:** El sistema recuerda los cambios (nuevas citas, ferias creadas) incluso si se recarga la página.

---

## Despliegue

También está disponible en Vercel:

**URL del proyecto:** [Pendiente de configuración]

---

## Licencia

- Este proyecto fue desarrollado con fines académicos como parte del curso Computación y Sociedad de Ingeniería en Computación del Instituto Tecnológico de Costa Rica.

- Su uso está estrictamente relacionado con el tipo de licencia MIT.