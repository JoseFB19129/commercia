# Commercia - InnovApp Solutions 🚀

## 1. Información del Proyecto
**Commercia** es una solución de comercio digital diseñada para promover la relación comercial entre empresarios y visitantes, permitiendo la búsqueda organizada de servicios y productos por sector y ubicación.

* **Materia:** Nuevas tecnologías de desarrollo.
* **Institución:** Fundación Universitaria Konrad Lorenz.
* **Docente:** Cecilia Ávila.

## 2. Equipo de Trabajo (InnovApp Solutions)
A continuación, se relacionan los integrantes del equipo y sus usuarios de GitHub (Requisito de entrega):

| Nombre Completo | Usuario GitHub | Rol Principal |
| :--- | :--- | :--- |
| **Sara Sofía Valdés García** | [Tu_Usuario_Aquí] | Desarrolladora Backend & Admin |
| **Pablo Tomás Forero Salazar** | [Usuario_de_Pablo] | Desarrollador Fullstack |
| **José Francisco Bernal Castillo** | [Usuario_de_Jose] | Desarrollador Fullstack |

## 3. Tecnologías Utilizadas 🛠️
Este proyecto fue construido utilizando el stack de tecnologías solicitado para la materia:
* **Entorno de ejecución:** Node.js
* **Framework Web:** Express.js
* **Base de Datos:** MongoDB (Motor NoSQL)
* **Seguridad:** JSON Web Tokens (JWT) para autenticación y Bcrypt para el cifrado de contraseñas.
* **IA utilizada:** Gemini (Google) para la estructuración de modelos de datos y documentación de endpoints.

## 4. Módulo de Administración (Entrega Actual)
[cite_start]Este módulo permite al Administrador del Sistema gestionar la base del directorio comercial[cite: 33, 88]:
* **Configuración de Categorías:** CRUD completo para organizar las empresas.
* **Gestión de Sectores:** Clasificación por actividades comerciales.
* [cite_start]**Gestión de Usuarios:** Control sobre empresas registradas y visitantes[cite: 93, 94].

## 5. Instrucciones de Instalación
1. Clonar el repositorio: `git clone [URL-del-repo]`
2. Instalar dependencias: `npm install`
3. Configurar el archivo `.env` con la URI de MongoDB y la clave secreta de JWT.
4. Iniciar el servidor: `npm run dev` o `node src/index.js`

## 6. Estructura del Código
El proyecto sigue el patrón **Modelo-Controlador-Rutas**:
* `src/models/`: Definición de esquemas de Mongoose.
* `src/controllers/`: Lógica de negocio y funciones CRUD.
* `src/routes/`: Definición de los endpoints para Postman.
