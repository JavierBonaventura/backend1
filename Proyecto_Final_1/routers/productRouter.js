const express = require("express");
const productRouter = express.Router();
const index = require("../index");

const Products = require("../controllers/productContainer");
const productsClass = new Products();

// Muesta todos los productos
productRouter.get("/", async (req, res) => {
  try {
    const products = await productsClass.getAll();
    res.json(products);
  } catch (error) {}
});

// Muesta un producto
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await productsClass.getById(req.params.id);
    res.json(product);
  } catch (error) {}
});

// Agrega productos
productRouter.post("/", admin, async (req, res) => {
  try {
    const product = await productsClass.save(req.body);
    res.json(product);
  } catch (error) {}
});

// Modifica un producto existente
productRouter.put("/:id", admin, async (req, res) => {
  try {
    const product = await productsClass.update(req.params.id, req.body);
    res.json(product);
  } catch (error) {}
});

// Elimina un producto
productRouter.delete("/:id", admin, async (req, res) => {
  try {
    const product = await productsClass.deleteById(req.params.id);
    res.status(200).json(product);
  } catch (error) {}
});

// Funcion de chequeo de admin
function admin(req, res, next) {
  if (!index.isAdmin) {
    res.json({ msg: "Ruta solo para administradores" });
  }
  next();
}

module.exports = productRouter;
