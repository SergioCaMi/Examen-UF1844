// Server
const express = require("express");
const app = express();
const PORT = 3000;

// Colores predominantes
const getColors = require("get-image-colors");

// Id Unicos
const { v4: uuidv4 } = require("uuid");

//Datos EXIF
const axios = require("axios");
const exifReader = require("exif-reader");

// Data
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data", "images.json");

//Existe el archivo images.son?
const dirPath = path.join(__dirname, "data");
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

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

// Nos permite procesar peticiones POST que vengan de un formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cargamos las vistas EJS
app.set("view engine", "ejs");

// Carpeta de recursos publicos
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs", { title: "Home", dataImage: dataImage });
});

// Add new image
app.get("/new-image", (req, res) => {
  // Mostramos la vista del formulario
  res.render("addImage.ejs", {
    title: "New Image",
    message: undefined,
    colorMessage: "black",
  });
});

// Enpoint donde enviamos los datos del formulario
app.post("/new-image", async (req, res) => {
  console.log("Petición recibida");
  // if (!(req.body.urlImagen.endsWith(".jpg"))||!(req.body.urlImagen.endsWith(".jpeg"))) {
  //   res.render("addImage.ejs", {
  //     title: "New Image",
  //     message: `Formato de imagen no soportado!`,
  //     colorMessage: "red",
  //   });
  // } else {
  // La imagen ya se encuentra en el archivo?
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

    // Descargamos la imagen
    const response = await axios.get(req.body.urlImagen, {
      responseType: "arraybuffer",
    });
    // Pasamos la imagen a binario (buffer)
    const imageBuffer = Buffer.from(response.data, "binary");

    let exifData;
    try {
      exifData = exifReader(imageBuffer);
    } catch (error) {
      console.error("Error al leer los datos EXIF:", error);
      exifData = null;
    }
      console.log("Body del formulario: ", req.body);
    console.log(`id: ${id} \n colores: ${colors} \n datos EXIF: ${exifData}`)
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
      JSON.stringify(dataImage, null, 2),
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
  // }
});

// Enpoint donde enviamos los datos a eliminar
app.post("/delete-image/:id", (req, res) => {
  console.log("Petición recibida", req.body);
  res.render("deleteImage.ejs", {
    title: "Delete Image",
    dataImage: req.body,
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
