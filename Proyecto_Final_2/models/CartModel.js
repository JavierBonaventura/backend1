import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    productos: [
      // {
      //   producto: { type: mongoose.Schema.Types.ObjectId, ref: "producto" },
      //   cantidad: {Number},
      // },
    ],
    timeStamp: { type: Date, default: Date.now },
  });

const CarritoModel = mongoose.model('carrito', carritoSchema);

export default CarritoModel;