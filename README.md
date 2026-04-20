# commercia
Commercia es un directorio de empresas.

# 🚀 Proyecto Commercia - Módulo de Empresas
**Rama:** `pabloForero`  
**Desarrollador:** Pablo

## 📝 Descripción del Módulo
Este módulo permite la gestión integral de empresas dentro de la plataforma. Se ha desarrollado bajo la arquitectura **MVC** (Modelo-Vista-Controlador) y utiliza **Mongoose** para la persistencia de datos en un cluster de MongoDB Atlas.

## 🛠️ Endpoints (API)
| Método | Ruta | Descripción | Seguridad |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/empresas/registrar` | Registra una nueva empresa | JWT (x-auth-token) |
| **GET** | `/api/empresas/listar` | Lista todas las empresas | JWT (x-auth-token) |
| **GET** | `/api/empresas/:id` | Obtiene detalle por ID | JWT (x-auth-token) |

## ⚙️ Configuración y Conexión
* **Variables de Entorno:** El proyecto requiere un archivo `.env` con la variable `MONGO_URI`.
* **Compatibilidad de Red:** Se incluyó la opción `{ family: 4 }` en la conexión de Mongoose para asegurar compatibilidad en redes con restricciones de IPv6 o resolución de nombres SRV.
* **Seguridad:** Todas las rutas de este módulo están protegidas por un middleware de autenticación que verifica la validez de un Token JWT.

## 🧪 Pruebas en Postman
1. Registrar un usuario / Iniciar sesión para obtener el Token.
2. Configurar el Header: `x-auth-token: [TU_TOKEN]`.
3. Disparar los endpoints del módulo de Empresas.
