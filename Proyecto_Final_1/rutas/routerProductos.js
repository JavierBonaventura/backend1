const express = require("express");
const { Productos } = require("../logica/productos.class");
var index = require("../index");

const routerProductos = express.Router();
const logicaProductos = new Productos();

routerProductos.use(handleErrors);

routerProductos.get("/", async (req, res, next) => {
  try {
    const productos = await logicaProductos.getAll();
    res.status(200).json(productos);
  } catch (error) {
    next(error);
  }
});

routerProductos.get("/:id", async (req, res, next) => {
  try {
    const producto = await logicaProductos.getById(Number(req.params.id));
    res.status(200).json(producto ?? { error: "producto no encontrado" });
  } catch (error) {
    next(error);
  }
});

routerProductos.post("/", checkUser, async (req, res, next) => {
  try {
    const producto = await logicaProductos.save(req.body);

    res
      .status(200)
      .json(producto ?? { error: "no se pudo registrar el producto" });
  } catch (error) {
    next(error);
  }
});

routerProductos.put("/:id", checkUser, async (req, res, next) => {
  try {
    let { nombre, descripcion, codigo, url, precio, stock } = req.body;
    const producto = await logicaProductos.update(Number(req.params.id), {
      nombre,
      descripcion,
      codigo,
      url,
      precio,
      stock,
    });
    res
      .status(200)
      .json(producto ?? { error: "no se pudo actualizar el producto" });
  } catch (error) {
    next(error);
  }
});

routerProductos.delete("/:id", checkUser, async (req, res, next) => {
  try {
    const result = await logicaProductos.delete(Number(req.params.id));
    res
      .status(200)
      .json(
        result !== null
          ? { mensaje: `se elimino el producto con el id: ${result}` }
          : { error: "producto no encontrado" }
      );
  } catch (error) {
    next(error);
  }
});

function checkUser(req, res, next) {
  if (!index.logged) {
    res.status(401).json({
      error: -1,
      descripcion: `ruta ${req.baseUrl} método ${req.method} no autorizada`,
    });
  }
  next();
}

function handleErrors(err, req, res, next) {

  res.status(500).send("An internal server error occurred");
}

module.exports = { routerProductos };
