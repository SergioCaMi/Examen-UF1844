# Fototeca Express

¡Bienvenido/a a **Fototeca Express**! Este proyecto es una galería de imágenes web desarrollada con Node.js, Express, EJS y MongoDB (Mongoose), que permite a los usuarios gestionar, visualizar y analizar imágenes de forma sencilla y moderna.

## Tecnologías utilizadas

- **Node.js** y **Express**: Backend y servidor web.
- **EJS**: Motor de plantillas para renderizar vistas dinámicas.
- **MongoDB + Mongoose**: Base de datos NoSQL para almacenar imágenes y usuarios.
- **Passport + Google OAuth**: Autenticación de usuarios mediante Google.
- **get-image-colors** y **exifr**: Extracción de colores predominantes y metadatos EXIF de las imágenes.
- **CSS personalizado**: Interfaz moderna y responsive.

## Estructura del proyecto

```
├── models/                # Modelos de Mongoose (por ejemplo, image.model.js)
├── routes/                # Rutas Express (por ejemplo, imageRoutes.js)
├── views/                 # Vistas EJS
│   ├── addImage.ejs
│   ├── home.ejs
│   ├── ...
│   └── template/
│       ├── cabecera.ejs
│       └── footer.ejs
├── public/                # Archivos estáticos (JS, CSS)
├── index.js               # Servidor principal Express
├── auth.js                # Configuración de autenticación Google
├── package.json           # Dependencias y scripts
└── README.md              # (Este archivo)
```

## Acceso y autenticación

- **Sin autenticar**: Puedes visualizar la galería, ver detalles de las imágenes, consultar colores predominantes, datos EXIF y mapa de coordenadas si están disponibles, y buscar imágenes por nombre o fecha.
- **Autenticado (Google)**: Además de lo anterior, puedes añadir nuevas imágenes, editar y eliminar imágenes existentes, y descargar imágenes.

## Iconos y acciones principales

- `📷` (Inicio): Volver a la galería principal.
- `➕` (Añadir): Añadir una nueva imagen (solo autenticado).
- `🔍` (Buscar): Mostrar opciones de búsqueda por nombre o fecha.
- `🔑` (Iniciar sesión): Autenticarse con Google.
- `👤` o foto de perfil (Cerrar sesión): Cerrar sesión Google.
- `✏️` (Editar): Editar imagen (solo autenticado).
- `🗑️` (Eliminar): Eliminar imagen (solo autenticado).
- `📤` (Enviar): Confirmar envío de formulario.
- `⬇️` (Descargar): Descargar imagen (solo autenticado).
- `👁️` (Ver): Visualizar imagen en modo carrusel.
- `ℹ️` (Detalles): Ver detalles completos de la imagen.

## Funcionalidades principales

- **Galería visual**: Visualiza todas las imágenes en una galería moderna y responsive.
- **Añadir imágenes**: Añade imágenes por URL (no se permite la subida de archivos locales). El formulario solicita título, URL, fecha y descripción.
- **Visualizar imagen (carrusel)**: Navega entre imágenes y accede a detalles o cierra la vista.
- **Ver detalles**: Consulta título, URL, fecha, descripción, colores predominantes (con código RGBA al pasar el ratón), datos EXIF y mapa de coordenadas (enlace a Google Maps si hay GPS).
- **Editar imagen**: Modifica título, fecha o descripción de la imagen (solo autenticado).
- **Eliminar imagen**: Elimina imágenes de la galería (solo autenticado).
- **Descargar imagen**: Descarga cualquier imagen (solo autenticado).
- **Búsqueda y filtrado**: Busca imágenes por nombre o filtra por fecha (desde la fecha indicada hasta la actual).

## Cómo ejecutar el proyecto

1. **Instala las dependencias**:
   ```
npm install
   ```
2. **Configura las variables de entorno**:
   - Crea un archivo `.env` o `.env.development` con tus credenciales de Google OAuth y la URI de tu base de datos MongoDB.
3. **Inicia el servidor**:
   ```
npm start
   ```
   El servidor estará disponible en [http://localhost:5000](http://localhost:5000)

## Consejos de uso

- Si no has iniciado sesión, puedes explorar la galería y consultar detalles, colores y metadatos de las imágenes.
- Para añadir, editar, eliminar o descargar imágenes, inicia sesión con Google (`🔑`).
- Al añadir una imagen, asegúrate de que la URL sea válida y apunte a una imagen accesible públicamente.
- Pasa el ratón sobre los círculos de color para ver el código RGBA exacto.
- Si la imagen contiene datos GPS, haz clic en el enlace de Google Maps para ver la ubicación.

## Contribuir

¡Las contribuciones son bienvenidas! Si tienes ideas para nuevas funcionalidades, mejoras de interfaz, optimización de código o integración con otros servicios (por ejemplo, almacenamiento en la nube, IA para reconocimiento de imágenes, etc.), no dudes en hacer un fork y enviar tu pull request.

**Recomendaciones para contributors:**
- Sigue la estructura y estilo del código existente.
- Documenta tus cambios en el README y en los comentarios del código.
- Añade tests o ejemplos de uso si introduces nuevas funcionalidades.
- Si tienes dudas, abre un issue para discutir tu propuesta.

---

¡Gracias por usar y mejorar Fototeca Express! 📸

---

# Fototeca Express (English)

Welcome to **Fototeca Express**! This project is a web image gallery built with Node.js, Express, and EJS, allowing users to manage, view, and analyze images easily and with a modern interface.

## Technologies Used

- **Node.js** and **Express**: Backend and web server.
- **EJS**: Template engine for dynamic views.
- **MongoDB + Mongoose**: NoSQL database for storing images and users.
- **Passport + Google OAuth**: User authentication via Google.
- **get-image-colors** and **exifr**: Extract dominant colors and EXIF metadata from images.
- **Custom CSS**: Modern and responsive interface.

## Project Structure

```
├── models/                # Mongoose models (e.g., image.model.js)
├── routes/                # Express routes (e.g., imageRoutes.js)
├── views/                 # EJS views
│   ├── addImage.ejs
│   ├── home.ejs
│   ├── ...
│   └── template/
│       ├── cabecera.ejs
│       └── footer.ejs
├── public/                # Static files (JS, CSS)
├── index.js               # Main Express server
├── auth.js                # Google authentication config
├── package.json           # Dependencies and scripts
└── README.md              # (This file)
```

## Access and Authentication

- **Without authentication**: You can view the gallery, see image details, check dominant colors, EXIF data, and map coordinates (if available), and search images by name or date.
- **Authenticated (Google)**: In addition to the above, you can add new images, edit and delete existing images, and download images.

## Main Icons and Actions

- `📷` (Home): Return to the main gallery.
- `➕` (Add): Add a new image (authenticated only).
- `🔍` (Search): Show search options by name or date.
- `🔑` (Sign in): Authenticate with Google.
- `👤` or profile photo (Sign out): Log out from Google.
- `✏️` (Edit): Edit image (authenticated only).
- `🗑️` (Delete): Delete image (authenticated only).
- `📤` (Send): Submit form.
- `⬇️` (Download): Download image (authenticated only).
- `👁️` (View): View image in carousel mode.
- `ℹ️` (Details): View full image details.

## Detailed Features

- **Visual Gallery**: View all images in a modern, responsive gallery.
- **Add Images**: Add images by URL (no local file upload). The form requires title, image URL, date, and description.
- **View Image (Carousel)**: Navigate between images and access details or close the view.
- **View Details**: Check title, URL, date, description, dominant colors (with RGBA code on hover), EXIF data, and map coordinates (Google Maps link if GPS data is present).
- **Edit Image**: Modify the image's title, date, or description (authenticated only).
- **Delete Image**: Remove images from the gallery (authenticated only).
- **Download Image**: Download any image (authenticated only).
- **Search and Filter**: Search images by name or filter by date (from the selected date to the current date).

## How to Run the Project

1. **Install dependencies**:
   ```
npm install
   ```
2. **Set up environment variables**:
   - Create a `.env` or `.env.development` file with your Google OAuth credentials and MongoDB database URI.
3. **Start the server**:
   ```
npm start
   ```
   The server will be available at [http://localhost:5000](http://localhost:5000)

## Usage Tips

- If not signed in, you can explore the gallery and view image details, colors, and metadata.
- To add, edit, delete, or download images, sign in with Google (`🔑`).
- When adding an image, ensure the URL is valid and publicly accessible.
- Hover over color circles to see the exact RGBA code.
- If the image contains GPS data, click the Google Maps link to view the location.

## Contributing

Contributions are welcome! If you have ideas for new features, interface improvements, code optimization, or integration with other services (e.g., cloud storage, AI for image recognition, etc.), feel free to fork and submit a pull request.

**Contributor recommendations:**
- Follow the existing code structure and style.
- Document your changes in the README and code comments.
- Add tests or usage examples if you introduce new features.
- If in doubt, open an issue to discuss your proposal.

---

Thank you for using and improving Fototeca Express! 📸
