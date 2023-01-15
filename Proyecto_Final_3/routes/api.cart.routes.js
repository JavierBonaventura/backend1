const express = require('express');

// Import Router
const { Router } = express;
const router = Router();

// controllers
const controller = require('../controllers/cart.controller')



router.get("", controller.getAll)
router.get("/:id/products", controller.getCartById) 
router.get("/:id/products", controller.getCartByUser) 
router.post("/:id/products/:idprod", controller.postCart) 
router.delete('/:id', controller.deleteCart) 
router.delete('/:id/products/:product', controller.deleteProd) 
router.delete("", controller.deleteAll) 


module.exports = router;