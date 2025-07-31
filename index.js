// ****************************** Server ******************************
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const path = require("path");
const fs = require("fs");

// ****************************** Sesión Google + Autenticación ******************************

// ********** Cargar las variables de entorno **********

require("dotenv").config();

// ********** Configura la sesión del usuario **********
const session = require("express-session");
const passport = require("passport");
require("./auth");

// ********** Configura una sesión segura para cada usuario **********
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// ********** Iniciar Passport y lo conecta con las sesiones de Express **********
app.use(passport.initialize());
app.use(passport.session());



// ********** Ruta que manda al usuario a iniciar sesión con Google **********
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// ********** Ruta a la que vuelve Google después del login **********
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.render("welcome", { user: req.user });
  }
);

// ********** Cerrar sesión **********
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).render("Page404.ejs", { message: "Error al cerrar sesión", status: 500 ,
    user: req.user});
    res.redirect("/");
  });
});

// ****************************** Conexión a MongoDB + mongoose ******************************

// ********** Conexión a la base de datos **********
const mongoose = require("mongoose");
const Image = require("./models/image.model");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  // ********** Morgan para visualizar el flujo por consola **********
  const morgan = require("morgan");
  app.use(morgan("dev"));

  // ********** Procesar datos de formularios y JSON **********
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ********** Motor de vistas EJS **********
  app.set("view engine", "ejs");
  app.use(express.static("public"));

  // ********** Rutas modularizadas **********
  const imageRoutes = require("./routes/imageRoutes");
  app.use(imageRoutes);

  // ******************** URL inválida Error 404 ********************
  app.use((req, res) => {
    res.status(404).render("Page404.ejs", { message: "Página no encontrada", status: 404 ,
    user: req.user});
  });

  // ******************** Errores ********************
  const dirPath = path.join(__dirname, "data");
  const errorLogPath = path.join(dirPath, "errors.txt");

  // ******************** Manejo de errores internos (500) ********************
  app.use((err, req, res, next) => {
    console.error("Error interno del servidor:", err.message);

    fs.mkdir(dirPath, { recursive: true }, (dirErr) => {
      if (dirErr) console.error("Error al crear el directorio data:", dirErr);

      fs.appendFile(
        errorLogPath,
        `[${new Date().toISOString()}] ${err.stack}\n`,
        (fileErr) => {
          if (fileErr) console.error("Error al escribir en errores:", fileErr);
        }
      );
    });
    res.status(500).render("Page404.ejs", { message: "Ups! Ha ocurrido un error. Vuelve a intentarlo más tarde", status: 500 ,
    user: req.user});
  });

  // ****************************** Iniciar servidor ****************************************
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

// Mensajes de Error:
//     res.status(x).render("Page404.ejs", { message: "message", status: x , user: req.user});
