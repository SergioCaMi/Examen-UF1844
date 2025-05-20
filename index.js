// Server
const express = require("express");
const app = express();
const PORT = 3000;

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
  dataImage = JSON.parse(data);
  console.log("Archivo JSON leído correctamente");
} catch (err) {
  console.log("Error al leer el archivo JSON:", err);
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
  res.render("addImage.ejs", { title: "New Image" });
});

// Enpoint donde enviamos los datos del formulario
app.post("/new-image", (req, res) => {
  console.log("Petición recibida");
  console.log("Body del formulario: ", req.body);
  // La imagen ya se encuentra en el archivo?
  if (dataImage.find((p) => p.urlImagen === req.body.urlImagen)) {
    // SI
    res.send(`La imagen "${req.body.title}" ya se encontraba en el archivo.`);
  } else {
    // NO
    // Construimos el objeto
    const newImage = {
      title: req.body.title,
      urlImagen: req.body.urlImagen,
      date: req.body.date,
      description: req.body.description,
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
          ? res.send(`Error al añadir la imagen "${req.body.title}".`)
          : res.send(
              `La imagen "${req.body.title}" se ha añadido satisfactoriamente.`
            );
      }
    );
  }
});

// Delete  image
app.get("/delete-image", (req, res) => {
  // Mostramos la vista del formulario
  res.render("deleteImage.ejs", {
    title: "Delete Image",
    dataImage: dataImage,
  });
});

// Enpoint donde enviamos los datos a eliminar
app.post("/delete-image", (req, res) => {
  console.log("Petición recibida", req.body);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
