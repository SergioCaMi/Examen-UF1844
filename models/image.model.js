const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema de colores

const colorSchema = new Schema({
  _rgb: {
    type: [Number],
  },
});

// Esquema EXIF
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
  ComponentsConfiguration: { type: Map, of: Number },
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
  GPSAltitudeRef: { type: Map, of: Number },
  GPSTimeStamp: String,
  GPSSatellites: String,
  GPSMapDatum: String,
  GPSDateStamp: String,
  latitude: Number,
  longitude: Number,
});

const imageSchema = new Schema({
  title: { type: String, required: true },
  urlImagen: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  description: String,
  colors: [colorSchema],
  exif: {
    type: exifSchema,
    default: null
  },
  user: {
    type: {
      name: {
        type: String, 
      },
      email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, "Email inválido"]
      }
    },
  }
});

const Image = mongoose.model("Image", imageSchema);
// mongoose.model(Colección, Schema);

module.exports = Image;
