const express = require("express");
const PORT = process.env.PORT || 8080;

const app = express();

const productRouter = require("./routers/productRouter");
const cartRouter = require("./routers/cartRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta a productos
app.use("/api/productos", productRouter);

// Ruta a carritos
app.use("/api/carrito", cartRouter);

// Ruta para setear al usuario como administrador
app.post("/login", (req, res) => {
  module.exports.isAdmin = true;
  res.json({ msg: "Usuario logueado" });
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`);
});
