# Fototeca Express

[Read this in English](#fototeca-express-english)

¡Bienvenido/a a **Fototeca Express**! Este proyecto es una galería de imágenes web desarrollada con Node.js, Express y EJS, que permite a los usuarios gestionar, visualizar y analizar imágenes de forma sencilla y moderna.

## Tecnologías utilizadas

- **Node.js** y **Express**: Backend y servidor web.
- **EJS**: Motor de plantillas para renderizar vistas dinámicas.
- **Passport + Google OAuth**: Autenticación de usuarios mediante Google.
- **get-image-colors** y **exifr**: Extracción de colores predominantes y metadatos EXIF de las imágenes.
- **CSS personalizado**: Interfaz moderna y responsive.

## Estructura del proyecto

```
├── auth.js                # Configuración de autenticación Google
├── index.js               # Servidor principal Express
├── package.json           # Dependencias y scripts
├── data/
│   └── images.json        # Base de datos de imágenes (JSON)
├── downloads/             # Carpeta de descargas
├── public/                # Archivos estáticos (JS, CSS)
├── views/                 # Vistas EJS
│   ├── addImage.ejs
│   ├── home.ejs
│   ├── ...
│   └── template/
│       ├── cabecera.ejs
│       └── footer.ejs
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

## Funcionalidades detalladas

### 1. Galería visual
- Visualiza todas las imágenes en una galería moderna y responsive.
- Cada imagen muestra su título, fecha, descripción, colores predominantes y acciones disponibles según el estado de autenticación.

### 2. Añadir imágenes (solo autenticado)
- Haz clic en `➕` para acceder al formulario de "Añadir imagen".
- Solo se permite añadir imágenes por URL (no se permite la subida de archivos locales).
- El formulario solicita título, URL de la imagen, fecha y descripción.
- La URL se valida automáticamente para asegurar que es una imagen válida.

### 3. Visualizar imagen (carrusel)
- Haz clic en `👁️` para abrir la imagen en modo carrusel.
- Navega entre imágenes con los botones de navegación `❮` y `❯`.
- Desde el carrusel puedes acceder a los detalles (`ℹ️`) o cerrar la vista.

### 4. Ver detalles de la imagen
- Haz clic en `ℹ️` para ver información detallada:
  - **Datos introducidos**: título, URL, fecha, descripción.
  - **Colores predominantes**: se muestran como círculos de color. Al pasar el ratón por encima, se muestra el código RGBA de cada color.
  - **Datos EXIF**: si la imagen contiene metadatos EXIF, se muestran detalles como cámara, fechas, parámetros de disparo, calidad de imagen, datos GPS, etc.
  - **Mapa de coordenadas**: si la imagen tiene datos GPS, se muestra un enlace a Google Maps con la ubicación.

### 5. Editar imagen (solo autenticado)
- Haz clic en `✏️` para editar el título, fecha o descripción de la imagen.
- El formulario de edición es similar al de añadir imagen.

### 6. Eliminar imagen (solo autenticado)
- Haz clic en `🗑️` para eliminar la imagen de la galería.
- La galería se actualiza automáticamente tras la eliminación.

### 7. Descargar imagen (solo autenticado)
- Haz clic en `⬇️` para descargar la imagen al instante.

### 8. Búsqueda y filtrado
- Haz clic en `🔍` para mostrar las opciones de búsqueda.
- **Buscar por nombre**: Escribe en el campo de búsqueda para filtrar imágenes por título.
- **Buscar por fecha**: Selecciona una fecha para mostrar solo imágenes a partir de esa fecha.

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
- **Passport + Google OAuth**: User authentication via Google.
- **get-image-colors** and **exifr**: Extract dominant colors and EXIF metadata from images.
- **Custom CSS**: Modern and responsive interface.

## Project Structure

```
├── auth.js                # Google authentication config
├── index.js               # Main Express server
├── package.json           # Dependencies and scripts
├── data/
│   └── images.json        # Image database (JSON)
├── downloads/             # Download folder
├── public/                # Static files (JS, CSS)
├── views/                 # EJS views
│   ├── addImage.ejs
│   ├── home.ejs
│   ├── ...
│   └── template/
│       ├── cabecera.ejs
│       └── footer.ejs
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

### 1. Visual Gallery
- View all images in a modern, responsive gallery.
- Each image displays its title, date, description, dominant colors, and available actions depending on authentication status.

### 2. Add Images (authenticated only)
- Click `➕` to access the "Add Image" form.
- Only images by URL are allowed (no local file upload).
- The form requires title, image URL, date, and description.
- The URL is automatically validated to ensure it is a valid image.

### 3. View Image (Carousel)
- Click `👁️` to open the image in carousel mode.
- Navigate between images with `❮` and `❯` buttons.
- From the carousel, you can access details (`ℹ️`) or close the view.

### 4. View Image Details
- Click `ℹ️` to see detailed information:
  - **Entered data**: title, URL, date, description.
  - **Dominant colors**: shown as color circles. Hover to see the RGBA code.
  - **EXIF data**: if available, shows camera, dates, shooting parameters, image quality, GPS data, etc.
  - **Map coordinates**: if GPS data is present, a Google Maps link is shown.

### 5. Edit Image (authenticated only)
- Click `✏️` to edit the image's title, date, or description.
- The edit form is similar to the add image form.

### 6. Delete Image (authenticated only)
- Click `🗑️` to remove the image from the gallery.
- The gallery updates automatically after deletion.

### 7. Download Image (authenticated only)
- Click `⬇️` to instantly download the image.

### 8. Search and Filter
- Click `🔍` to show search options.
- **Search by name**: Type in the search field to filter images by title.
- **Search by date**: Select a date to show only images from that date onwards.

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




588037d
