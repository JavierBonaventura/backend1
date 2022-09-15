const express = require("express");
const { routerProducto } = require("./routes/routerProductos.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;
const listener = app.listen(PORT, function () {
  console.log(`Servidor iniciado`);
});

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("Servidor iniciado");
});

app.use("/api/productos", routerProducto);
