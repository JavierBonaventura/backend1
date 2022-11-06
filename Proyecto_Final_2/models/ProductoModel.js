import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: { type: String, require: true },
    descripcion: { type: String, require: true },
    precio: { type: Number, require: true },
    codigo: { type: String, require: true },
    stock: { type: Number, require: true },
    url: { type: String, require: true },
    timeStamp: { type: Date, default: Date.now },
  });

const ProductoModel = mongoose.model('producto', productoSchema);

export default ProductoModel;