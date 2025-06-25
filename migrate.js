const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data', 'images.json');

const { Schema } = mongoose;

// Definición del esquema para los colores
const colorSchema = new Schema({
  _rgb: {
    type: [Number],
    required: true
  }
});

// Definición del esquema para los datos EXIF
const exifSchema = new Schema({
  Make: String,
  Model: String,
  Orientation: String,
  XResolution: Number,
  YResolution: Number,
  ResolutionUnit: String,
  Software: String,
  ModifyDate: Date,
  YCbCrPositioning: Number,
  ExposureTime: Number,
  FNumber: Number,
  ExposureProgram: String,
  ISO: Number,
  ExifVersion: String,
  DateTimeOriginal: Date,
  CreateDate: Date,
  ComponentsConfiguration: {
    type: Map,
    of: Number
  },
  ExposureCompensation: Number,
  MaxApertureValue: Number,
  MeteringMode: String,
  LightSource: String,
  Flash: String,
  FocalLength: Number,
  FlashpixVersion: String,
  ColorSpace: Number,
  ExifImageWidth: Number,
  ExifImageHeight: Number,
  FileSource: String,
  SceneType: String,
  CustomRendered: String,
  ExposureMode: String,
  WhiteBalance: String,
  DigitalZoomRatio: Number,
  FocalLengthIn35mmFormat: Number,
  SceneCaptureType: String,
  GainControl: String,
  Contrast: String,
  Saturation: String,
  Sharpness: String,
  SubjectDistanceRange: String,
  GPSLatitudeRef: String,
  GPSLatitude: [Number],
  GPSLongitudeRef: String,
  GPSLongitude: [Number],
  GPSAltitudeRef: {
    type: Map,
    of: Number
  },
  GPSTimeStamp: String,
  GPSSatellites: String,
  GPSMapDatum: String,
  GPSDateStamp: String,
  latitude: Number,
  longitude: Number
});

// Definición del esquema principal para la imagen
const imageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  urlImagen: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  description: String,
  colors: [colorSchema],
  exif: exifSchema
});

// Crear el modelo a partir del esquema
const Image = mongoose.model('Image', imageSchema);

async function main() {
  // Leer el JSON
  const data = fs.readFileSync(filePath);
  const images = JSON.parse(data);

  // Conectar a MongoDB
  await mongoose.connect(
    'mongodb+srv://sergiocami84:Msg--300183@cluster0.mo4mc0w.mongodb.net/gallery',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  try {
    await Image.create(images);
    console.log('Imágenes migradas correctamente');
  } catch (err) {
    console.error('Error al migrar imágenes:', err);
  } finally {
    mongoose.connection.close();
  }
}

main();
