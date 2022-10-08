const express = require("express");
const cartRouter = express.Router();

const Cart = require("../controllers/cartContainer");
const cartClass = new Cart();

const Products = require("../controllers/productContainer");
const productsClass = new Products();

// Agrega un carrito
cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartClass.newCart();
    res.json(newCart);
  } catch (error) {}
});

// Muestra un carrito
cartRouter.delete("/:id", async (req, res) => {
  try {
    const cart = await cartClass.deleteCart(req.params.id);
    res.json(cart);
  } catch (error) {}
});

// Muestra todos los carritos
cartRouter.get("/", async (req, res) => {
  try {
    const cart = await cartClass.cartGetAll();
    res.json(cart);
  } catch (error) {}
});

// Puestra los productos de un carrito
cartRouter.get("/:id/productos", async (req, res) => {
  try {
    const cart = await cartClass.cartProd(req.params.id);
    res.json(cart);
  } catch (error) {}
});

// Agrega un producto al carrito
cartRouter.post("/:id/productos/:idP", async (req, res) => {
  try {
    const product = await productsClass.getById(req.params.idP);
    const cart = await cartClass.addProduct(req.params.id, product);
    res.json(cart);
  } catch (error) {}
});

// Borra un producto del carrito
cartRouter.delete("/:id/productos/:idProd", async (req, res) => {
  try {
    const cartDeleted = await cartClass.eraseProduct(
      req.params.id,
      req.params.idProd
    );
    res.json(cartDeleted);
  } catch (error) {}
});

module.exports = cartRouter;
