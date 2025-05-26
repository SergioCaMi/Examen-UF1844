// ********** Server **********
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; //para renderizar

// ********** Registro de todas las peticiones que vienen del cliente **********
const morgan = require('morgan');
app.use(morgan("dev")); 

// ********** Colores predominantes **********
const getColors = require("get-image-colors");

// ********** Id Unicos **********
const { v4: uuidv4 } = require("uuid");

// ********** Datos EXIF **********
const exifr = require("exifr");
const fetch = require("node-fetch");

// ********** Data **********
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data", "images.json");

//Existe el archivo images.son?
const dirPath = path.join(__dirname, "data");
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Existe el directorio de descarga?
const { writeFile } = require("fs/promises");
const { mkdir, existsSync } = require("fs");
const { fileURLToPath } = require("url");

const downloadDir = path.join(__dirname, "downloads");
if (!existsSync(downloadDir)) {
  mkdir(downloadDir, { recursive: true }, (err) => {
    if (err) console.error("Error creando carpeta", err);
  });
}
app.post("/image/:id/download", async (req, res) => {
  const id = req.params.id;
  console.log("Petición recibida para descargar la imagen con ID:", id);

  // Encuentra la imagen por ID
  const image = dataImage.find((img) => img.id === id);
  if (!image) {
    return res.status(404).send("Imagen no encontrada");
  }
  // Descargamos la imagen en el directorio /downloads
  const urlImagen = image.urlImagen;
  try {
    const response = await fetch(urlImagen);
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      const fileName = `image-${Date.now()}.jpg`;
      const filePath = path.join(downloadDir, fileName);
      await writeFile(filePath, Buffer.from(buffer));
      res.status(200).send("OK");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("No se pudo descargar la imagen.");
  }
});

// Leer el contenido del archivo JSON
let dataImage = [];
try {
  const data = fs.readFileSync(filePath, "utf8");
  if (data.trim()) {
    // Analizar el contenido del archivo JSON
    dataImage = JSON.parse(data);
    console.log("Archivo JSON leído correctamente");
  } else {
    console.log("El archivo JSON está vacío.");
  }
} catch (err) {
  console.log("Error al leer el archivo JSON:", err);
  console.log();
}

// ********** Nos permite procesar peticiones POST que vengan de un formulario **********
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//********** Cargamos las vistas EJS **********
app.set("view engine", "ejs");

// ********** Carpeta de recursos publicos **********
app.use(express.static("public"));

// ******************** Home ********************

app.get("/", (req, res) => {
  res.render("home.ejs", { title: "Home", dataImage: dataImage });
});

// ******************** Add new image ********************
app.get("/new-image", (req, res) => {
  // Mostramos la vista del formulario
  res.render("addImage.ejs", {
    title: "New Image",
    message: undefined,
    colorMessage: "black",
  });
});

// ******************** Enpoint donde enviamos los datos del formulario ********************
app.post("/new-image", async (req, res) => {
  console.log("Petición recibida");
  // La imagen ya se encuentra en el archivo
  if (dataImage.find((p) => p.urlImagen === req.body.urlImagen)) {
    // SI
    res.render("addImage.ejs", {
      title: "New Image",
      message: `La imagen "${req.body.title}" ya se encontraba en el archivo.`,
      colorMessage: "red",
    });
  } else {
    // NO
    // Construimos el objeto
    // Obtener los colores de manera asíncrona
    let colors;
    try {
      colors = await getColors(req.body.urlImagen);
    } catch (error) {
      console.error("Error al leer los colores de la imagen:", error);
      colors = null;
    }

    //Crear ID unico
    const id = uuidv4();

    //Datos EXIF

    const exifData = await extractExifFromUrl(req.body.urlImagen);

    console.log("Body del formulario: ", req.body);
    console.log(`id: ${id} \n colores: ${colors}`);
    // Construir el objeto newImage con los colores obtenidos
    const newImage = {
      id: id,
      title: req.body.title,
      urlImagen: req.body.urlImagen,
      date: req.body.date,
      description: req.body.description,
      colors: colors,
      exif: exifData,
    };
    // Añadimos
    dataImage.push(newImage);
    dataImage.sort((a, b) => new Date(a.date) - new Date(b.date));
    // Lo guardamos en el archivo JSON
    fs.writeFile(
      filePath,
      JSON.stringify(dataImage, null, 3),
      "utf8",
      (err) => {
        err
          ? res.render("addImage.ejs", {
              title: "New Image",
              message: `Error al añadir la imagen "${req.body.title}".`,
              colorMessage: "red",
            })
          : res.render("addImage.ejs", {
              title: "New Image",
              message: `La imagen "${req.body.title}" se ha añadido satisfactoriamente.`,
              colorMessage: "green",
            });
      }
    );
  }
});

// ******************** Enpoint donde enviamos los datos a eliminar ********************
app.post("/image/:id/delete", (req, res) => {
  const id = req.params.id;
  console.log("Petición recibida para eliminar la imagen con ID:", id);

  // Creamos los datos con la imagen ya eliminada
  const newArray = dataImage.filter((image) => image.id != id);
  // Guardamos los nuevos datos
  try {
    fs.writeFileSync(filePath, JSON.stringify(newArray), "utf-8");
    console.log("Datos eliminados satisfactoriamente.");
    dataImage = newArray;
    res.status(200).json({ message: "Imagen eliminada" });
  } catch (error) {
    console.log(`Error al eliminar nuevo objeto con id ${id}`);
    res.status(500).json({ message: "Error al eliminar la imagen" });
  }
});

// ******************** Visualizar una imagen ********************
app.get("/image/:id/view", (req, res) => {
  const id = req.params.id;
  const index = dataImage.findIndex((image) => image.id === id);
  res.render("viewImage.ejs", {
    title: "View",
    dataImage: dataImage,
    index: index,
  });
});

// ******************** Detalles de una imagen ********************
app.get("/image/:id/details", (req, res) => {
  const id = req.params.id;
  const index = dataImage.findIndex((image) => image.id === id);
  res.render("detailsImage.ejs", {
    title: "Details",
    dataImage: dataImage,
    index: index,
  });
});

// ******************** Editar una imagen ********************
app.get("/image/:id/edit", (req, res) => {
  const id = req.params.id;
  const index = dataImage.findIndex((image) => image.id === id);
  res.render("editImage.ejs", {
    title: "Edit",
    dataImage: dataImage,
    index: index,
  });
});

app.post("/edit-image", async (req, res) => {
  console.log("Petición recibida");
  console.log(req.body);
  // recuperamos el objeto
  const objectImage = dataImage[req.body.index];
  const { title, date, description } = req.body;
  objectImage.title = title;
  objectImage.date = date;
  objectImage.description = description;
  console.log(objectImage);
  // metemos todos los objetos que no van a variar
  const newArray = dataImage.filter((image, i) => i != req.body.index);
  // y completamos añadiendo el nuevo objeto
  newArray.push(objectImage);
  // Ordenamos
  dataImage.sort((a, b) => new Date(a.date) - new Date(b.date));
  // Lo guardamos en el archivo JSON
  fs.writeFile(filePath, JSON.stringify(dataImage, null, 3), "utf8", (err) => {
    err
      ? res.render("editImage.ejs", {
          title: "Edit Image",
          message: `Error al modificar la imagen "${req.body.title}".`,
          colorMessage: "red",
        })
      :   res.render("home.ejs", { title: "Home", dataImage: dataImage });

  });
});

// ******************** URL noválida ********************
app.use((req, res) => {
  res.status(404).render('Page404.ejs', { endpoint: req.originalUrl });
});


// ******************** Iniciar el servidor ********************
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// ******************** Funciones ********************
/**
 * Devuelve los datos EXIF de una imagen dada por su url
 *
 * @async
 * @function extractExifFromUrl
 * @param {imageUrl} url de una imagen
 * @returns datos Exif de la imagen dada por como parámetros. En caso de error devolverá null
 */
async function extractExifFromUrl(imageUrl) {
  try {
    // Descargar la imagen desde la URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Error al descargar la imagen: ${response.statusText}`);
    }

    // Convertir la respuesta a un buffer
    const imageBuffer = await response.buffer();

    // Extraer los datos EXIF
    const exifData = await exifr.parse(imageBuffer);

    console.log("Datos EXIF:", exifData);
    return exifData;
  } catch (error) {
    console.error("Error al extraer los datos EXIF:", error);
    return null;
  }
}
