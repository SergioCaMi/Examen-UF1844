# Fototeca Express

¡Bienvenido/a a **Fototeca**! Este proyecto es una galería de imágenes web desarrollada con Node.js, Express, EJS y MongoDB (Mongoose), que permite a los usuarios gestionar, visualizar y analizar imágenes de forma sencilla y moderna.

## Cómo usar el proyecto

### Modo de desarrollo rápido (con Usuario Dummy)

**¿Qué es el Usuario Dummy?**

El sistema de Usuario Dummy es una función especial que permite probar todas las características de Fototeca Express **sin necesidad de configurar credenciales de Google OAuth**. Es ideal para:
- ✅ Desarrollo y pruebas rápidas
- ✅ Demostración del proyecto sin configuración
- ✅ Aprendizaje y evaluación de funcionalidades
- ✅ Evitar dependencias externas (Google OAuth + MongoDB)

**¿Cómo funciona?**

Cuando está activo (`USE_DUMMY_AUTH=true`):
- Se simula un usuario autenticado llamado "Usuario de Prueba"
- Se crean automáticamente 3 imágenes de demostración
- Todas las funciones están disponibles: ver, añadir, editar, eliminar y descargar
- No se requiere base de datos real (usa datos en memoria)
- La autenticación se mantiene durante toda la sesión

**Para usar el modo dummy:**

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/SergioCaMi/Examen-UF1844.git
   cd Examen-UF1844
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Ejecuta en modo dummy**:
   ```bash
   npm run dev
   ```

4. **¡Listo! Abre tu navegador**:
   - Ve a [http://localhost:5000](http://localhost:5000)
   - Haz clic en "Iniciar sesión" o ve a `/auth/google`
   - Entrarás automáticamente como "Usuario de Prueba"
   - Verás 3 imágenes de demostración pre-cargadas

**📋 Mensajes normales que verás:**
```
🔍 USE_DUMMY_AUTH: true
🔓 Modo dummy activado - Sin autenticación OAuth real
⚠️ MongoDB no disponible. Continuando en modo demo sin persistencia...
Servidor escuchando en http://localhost:5000
```

**✅ Esto es NORMAL** - El proyecto funciona sin base de datos en modo demo.

### ⚙️ Instalación completa (con OAuth real)

**Para usar autenticación real de Google:**

1. **Sigue los pasos 1-3 del modo rápido**

2. **Configura las variables de entorno en `.env`**:
   ```env
   USE_DUMMY_AUTH=false
   GOOGLE_CLIENT_ID=tu_client_id_real
   GOOGLE_CLIENT_SECRET=tu_client_secret_real
   GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
   MONGODB_URI=tu_mongodb_uri
   SESSION_SECRET=tu_session_secret
   ```

3. **Ejecuta el proyecto**:
   ```bash
   npm start
   ```

## 🔀 Modos de funcionamiento

### Modo Dummy (`USE_DUMMY_AUTH=true`) - **Por defecto**
- **Propósito**: Desarrollo, pruebas y demostración
- **Usuario**: Se simula automáticamente "Usuario de Prueba"
- **Datos**: 3 imágenes de demostración pre-cargadas en memoria
- **Base de datos**: Opcional - funciona sin MongoDB
- **Configuración**: Zero-config, funciona inmediatamente
- **Limitaciones**: Los datos se pierden al reiniciar el servidor

### Modo Producción (`USE_DUMMY_AUTH=false`)
- **Propósito**: Uso real con usuarios reales
- **Usuario**: Autenticación real con Google OAuth
- **Datos**: Persistencia real en MongoDB
- **Base de datos**: Requerida - MongoDB obligatorio
- **Configuración**: Requiere credenciales de Google y MongoDB
- **Ventajas**: Persistencia de datos, usuarios reales, escalabilidad

### ¿Cómo cambiar entre modos?
```bash
# Para modo Dummy
echo "USE_DUMMY_AUTH=true" > .env

# Para modo Producción  
echo "USE_DUMMY_AUTH=false" > .env
```

### ¿Qué datos incluye el modo Dummy?
- **Usuario**: "Usuario de Prueba" con email dummy@test.com
- **Imágenes**: 3 imágenes de demostración con diferentes colores
- **Funciones**: Todas disponibles (ver, añadir, editar, eliminar, descargar)


## Características principales

- **🔄 Modo Dual**: Funciona con Usuario Dummy (desarrollo) o OAuth real (producción)
- **📸 Galería visual**: Visualiza todas las imágenes en una galería moderna y responsive
- **🔐 Autenticación flexible**: Sistema de login con Google OAuth o simulación para desarrollo
- **📝 Gestión de imágenes**: Añadir, editar y eliminar imágenes
- **🎨 Análisis de imágenes**: Extracción de colores dominantes y datos EXIF
- **🔍 Búsqueda y filtrado**: Buscar por nombre o filtrar por fecha
- **💾 Descarga de imágenes**: Descargar cualquier imagen (solo usuarios autenticados)
- **⚡ Zero-config**: Funciona inmediatamente sin configuración externa

## Tecnologías utilizadas

- **Node.js** y **Express**: Backend y servidor web
- **EJS**: Motor de plantillas para renderizar vistas dinámicas  
- **MongoDB + Mongoose**: Base de datos NoSQL para almacenar imágenes y usuarios
- **Passport + Google OAuth**: Autenticación de usuarios mediante Google
- **get-image-colors** y **exifr**: Extracción de colores predominantes y metadatos EXIF de las imágenes
- **CSS personalizado**: Interfaz moderna y responsive

## Estructura del proyecto

```
├── models/                # Modelos de Mongoose
├── routes/                # Rutas Express  
├── views/                 # Vistas EJS
│   ├── addImage.ejs
│   ├── home.ejs
│   └── template/
├── public/                # Archivos estáticos
├── index.js               # Servidor principal
├── auth.js                # Configuración OAuth
└── README.md              # Este archivo
```

## Configuración requerida

### Variables de entorno (.env)

**Para modo Dummy (por defecto):**
```env
USE_DUMMY_AUTH=true
PORT=5000
```

**Para modo Producción (opcional):**
```env
USE_DUMMY_AUTH=false
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret  
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
SESSION_SECRET=tu_session_secret
MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos
PORT=5000
```

### Configuración Google OAuth (solo modo producción)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la Google+ API
4. Crea credenciales OAuth 2.0
5. Configura las URLs de redirección autorizadas


## Contribuir

Las contribuciones son bienvenidas. Si tienes ideas para nuevas características, mejoras en la interfaz, optimizaciones de código, o integración con otros servicios, no dudes en hacer fork y enviar un pull request.

---

¡Gracias por usar Fototeca Express! 📸
