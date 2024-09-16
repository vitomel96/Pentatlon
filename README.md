Hero Simulation App

Este proyecto es una aplicación de simulación de héroes desarrollada con Vue.js usando Vite. Permite seleccionar y simular héroes, mostrando sus atributos como fuerza, agilidad, resistencia y carisma. La aplicación maneja rutas, carga imágenes locales de héroes y carga automáticamente 4 héroes por defecto si no encuentra datos en la API.

Requisitos:

Node.js (versión 16 o superior)
npm o yarn para manejar las dependencias
Vue CLI o Vite (ya configurado en este proyecto)

Instalación:

1. Clona este repositorio

git clone git@github.com:vitomel96/Pentatlon.git

2. Instala las dependencias

npm install 

o 

yarn install

3. Configuración del entorno
El proyecto usa Vite para manejar las variables de entorno. Crea un archivo .env en la raíz del proyecto para definir las variables necesarias:

bash
Copiar código
VITE_API_URL=https://tu-api.com/heroes
VITE_API_KEY=tu-api-key
Estas variables estarán disponibles en toda la aplicación y se acceden a través de import.meta.env.VITE_API_URL y import.meta.env.VITE_API_KEY.

4. Ejecutar el proyecto en modo de desarrollo
Para iniciar el servidor de desarrollo con Vite, usa el siguiente comando:

bash
Copiar código
npm run dev
 o
yarn dev
El servidor estará disponible en http://localhost:5173/ por defecto.

5. Compilación para producción
Para construir la aplicación para producción, ejecuta:

bash
Copiar código
npm run build
o
yarn build
Esto generará los archivos en la carpeta dist/, listos para ser desplegados en un servidor de producción.

Funcionalidades principales:

1. Selección de héroes: Permite seleccionar héroes de una lista y simular sus atributos.

2. Simulación de pruebas: Basada en atributos como fuerza, agilidad, resistencia y carisma.

3. Carga de héroes por defecto: Si no se encuentran héroes en la API, se cargan 4 héroes por defecto.

4. 

Rutas de la aplicación
/ - Muestra la lista de héroes (HeroList).
/simulator - Inicia la simulación con los héroes seleccionados (Simulator).