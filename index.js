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

// ********** Rutas de autenticación (dummy o real según configuración) **********
if (process.env.USE_DUMMY_AUTH === 'true') {
  // Modo dummy: simular autenticación sin Google OAuth
  app.get("/auth/google", (req, res) => {
    // Simular usuario logueado
    req.session.dummyUser = {
      id: 'dummy_user_123',
      displayName: 'Usuario de Prueba',
      emails: [{ value: 'dummy@test.com' }],
      photos: [{ value: 'https://via.placeholder.com/50x50/4285f4/fff?text=Demo' }]
    };
    res.redirect('/google/callback');
  });

  app.get("/google/callback", (req, res) => {
    // En modo dummy, verificar que existe usuario dummy
    if (!req.session.dummyUser) {
      // Si no existe usuario dummy, redirigir a auth
      return res.redirect('/auth/google');
    }
    
    // En modo dummy, simular el comportamiento de passport
    req.user = req.session.dummyUser;
    
    // Simular la serialización de passport para mantener la sesión
    req.session.passport = { user: req.session.dummyUser };
    
    res.render("welcome", { user: req.user });
  });

} else {
  // Modo real: usar Google OAuth
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      res.render("welcome", { user: req.user });
    }
  );
}

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

async function main() {
  // Configuración de MongoDB con fallback para modo demo
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fototeca_demo';

  if (process.env.USE_DUMMY_AUTH === 'true') {
    console.log('� Modo demo: Intentando conectar a MongoDB (opcional)...');
    try {
      await mongoose.connect(mongoUri, { 
        serverSelectionTimeoutMS: 3000,
        connectTimeoutMS: 3000 
      });
      console.log('✅ Conectado a MongoDB exitosamente');
    } catch (error) {
      console.log('⚠️ MongoDB no disponible. Continuando en modo demo sin persistencia...');
      // En modo demo, continúa sin base de datos
    }
  } else {
    console.log('📊 Modo producción: Conectando a MongoDB...');
    try {
      await mongoose.connect(mongoUri);
      console.log('✅ Conectado a MongoDB exitosamente');
    } catch (error) {
      console.error('❌ Error conectando a MongoDB:', error.message);
      process.exit(1);
    }
  }

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

// Iniciar la aplicación
main().catch((err) => {
  console.error('❌ Error fatal al iniciar la aplicación:', err);
  process.exit(1);
});

// Mensajes de Error:
//     res.status(x).render("Page404.ejs", { message: "message", status: x , user: req.user});
