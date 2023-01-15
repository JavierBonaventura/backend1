const router = require("express").Router()

const controller = require('../controllers/products.controller')




router.get("", controller.get)
router.post("", controller.post) 
router.put("/:id", controller.put) 
router.get("/:id", controller.getById) 
router.delete("/:id", controller.deleteProd) 
router.delete("", controller.deleteAll) 


module.exports = router