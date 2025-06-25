const express = require("express");
const router = express.Router();
const Image = require("../models/image.model");
const getColors = require("get-image-colors");
const fetch = require("node-fetch");
const exifr = require("exifr");

// Función para extraer EXIF
async function extractExifFromUrl(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Error al descargar imagen");
    const buffer = await response.buffer();
    return await exifr.parse(buffer);
  } catch (error) {
    console.error("Error al extraer EXIF:", error);
    return null;
  }
}

// ********** Función para comprobar si los usuarios han hecho login **********
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

// ********** Función para renderizar con todos los datos necesarios **********
function getRenderObject(
  title,
  dataImage = null,
  req = null,
  message = undefined,
  colorMessage = "black",
  user = null
) {
  const userData =
    user ||
    (req.isAuthenticated?.() &&
    req.user &&
    req.user.photos &&
    req.user.photos.length > 0
      ? { photo: req.user.photos[0].value }
      : null);

  return {
    title,
    dataImage,
    message,
    colorMessage,
    user: userData,
  };
}
// **************************************** Home ****************************************
router.get("/", async (req, res) => {
  try {
    // ******************** Buscamos todas las imagenes ********************

    const dataImage = await Image.find({}).sort({ date: 1 });
    const renderData = getRenderObject(
      "Home",
      dataImage,
      req,
      undefined,
      "black"
    );
    res.status(200).render("home.ejs", renderData);
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// **************************************** Add new image ****************************************
// **************************************** Add new image GET (Mostrar formulario) ****************************************

router.get("/new-image", isAuthenticated, async (req, res) => {
  const dataImage = await Image.find({}).sort({ date: 1 });
  const renderData = getRenderObject("New Image", dataImage, req);
  res.status(200).render("addImage.ejs", renderData);
});

// **************************************** Add new image POST (guardar imagen) ****************************************
router.post("/new-image", isAuthenticated, async (req, res) => {
  const dataImage = [];
  try {
    const existingImage = await Image.findOne({
      urlImagen: req.body.urlImagen,
    });
    if (existingImage) {
      const renderData = getRenderObject(
        "New Image",
        dataImage,
        req,
        `La imagen "${req.body.title}" ya se encontraba en el archivo.`,
        "red"
      );
      res.status(500).render("addImage.ejs", renderData);
    }

    let colors;
    try {
      colors = await getColors(req.body.urlImagen);
    } catch (error) {
      console.error("Error al obtener colores:", error);
      colors = null;
    }

    const exifData = await extractExifFromUrl(req.body.urlImagen);

    const newImage = new Image({
      title: req.body.title,
      urlImagen: req.body.urlImagen,
      date: req.body.date,
      description: req.body.description,
      colors,
      exif: exifData,
      user: {
        name: `${req.user.name.givenName} ${req.user.name.familyName}`,
        email: req.user.emails?.[0]?.value || req.user.email || "No email",
      },
    });
    try {
      await newImage.save();
      const renderData = getRenderObject(
        "New Image",
        dataImage,
        req,
        `La imagen "${req.body.title}" se ha añadido satisfactoriamente.`,
        "green"
      );
      res.status(201).render("addImage.ejs", renderData);
    } catch (err) {
    res.status(500).render("Page404.ejs", { message: error.message, status: 500,
    user: req.user });
      return;
    }
  } catch (error) {
    console.error("Error al añadir imagen:", error);
    res.status(500).render("Page404.ejs", { message: "Error al añadir la imagen", status: 500,
    user: req.user });
  }
});

// **************************************** Eliminar imagen ****************************************
router.post("/image/:id/delete", isAuthenticated, async (req, res) => {
  dataImage = [];
  try {
    await Image.findByIdAndDelete(req.params.id);
    const renderData = getRenderObject(
      "Home",
      dataImage,
      req,
      `La imagen "${req.body.title}" se ha eliminado satisfactoriamente.`,
      "green"
    );
    return res.status(200).render("addImage.ejs", renderData);
  } catch (error) {
    console.error(`Error al eliminar imagen con id ${req.params.id}:`, error);
    res.status(500).render("Page404.ejs", { message: "Error al eliminar la imagen", status: 500 ,
    user: req.user});
  }
});

// **************************************** Visualizar  ****************************************

router.get("/image/:id/view", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
     return res.status(404).render("Page404.ejs", { message: "Imagen no encontrada", status: 404 ,
    user: req.user});
    }

    const renderData = getRenderObject("View", [image], req);

    return res.status(200).render("viewImage.ejs", renderData);
  } catch (error) {
    console.error("Error al ver imagen:", error);
res.status(500).render("Page404.ejs", { message: "Error al cargar imagen", status: 500 ,
    user: req.user});  }
});
// **************************************** Editar  ****************************************
// **************************************** Editar  GET (cargar datos antiguos) ****************************************

router.get("/image/:id/edit", isAuthenticated, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
     return res.status(404).render("Page404.ejs", { message: "Imagen no encontrada", status: 404 });
    }
        const renderData = getRenderObject("Edit", [image], req);
        console.log("Datos de la imagen a editar:", renderData);
    return res.status(200).render("editImage.ejs", renderData);
  } catch (error) {
    console.error("Error al editar imagen:", error);
    res.status(500).render("Page404.ejs", { message: "Error al editar imagen", status: 500,
    user: req.user });
  }
});

// **************************************** Editar POST (guardar nuevos datos) ****************************************

router.post("/edit-image", isAuthenticated, async (req, res) => {
  try {
    const updatedImage = await Image.findByIdAndUpdate(
      req.body.id,
      {
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
      },
      { new: true }
    );
    if (!updatedImage) return res.status(404).send("Imagen no encontrada");

    res.redirect("/");
  } catch (error) {
    console.error("Error al actualizar imagen:", error);
    res.status(500).send("Error al actualizar imagen");
  }
});

// **************************************** Descargar imagen ****************************************
router.get("/image/:id/download", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).send("Imagen no encontrada");

    const response = await fetch(image.urlImagen);
    if (response.ok) {
      const buffer = await response.buffer();
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="image-${Date.now()}.jpg"`
      );
      res.setHeader("Content-Type", "image/jpeg");
      res.send(buffer);
    } else {
      throw new Error("No se pudo descargar la imagen remota");
    }
  } catch (error) {
    console.error("Error al descargar imagen:", error);
    res.status(500).send("No se pudo descargar la imagen.");
  }
});

module.exports = router;
