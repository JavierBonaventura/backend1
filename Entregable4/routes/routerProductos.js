const express = require("express");
const routerProducto = express.Router();
const { Contenedor } = require("../contenedor");


const contenedor = new Contenedor();

routerProducto.get("/", async (req, res) => {
    const productos = await contenedor.getAll();
    res.json(productos);
});

routerProducto.get("/:id", async (req, res) => {   
        const producto = await contenedor.getById(req.params.id);
        res.json(producto ?? { error: "No existe el producto buscado" });    
});

routerProducto.post("/", async (req, res) => {    
        let { title, price, thumbnail } = req.body;
        const producto = await contenedor.save({
            title,
            price,
            thumbnail,
        });
        res.json(producto ?? { error: "No se ingreso el producto" });    
});

routerProducto.put("/:id", async (req, res) => {  
        let { title, price, thumbnail } = req.body;
        const producto = await contenedor.update(Number(req.params.id), {
            title,
            price,
            thumbnail,
        });
        res.json(producto ?? { error: "Producto no encontrado" });   
});

routerProducto.delete("/:id", async (req, res) => {    
        const result = await contenedor.deleteById(Number(req.params.id));
        res.json(
            result !== null
                ? { mensaje: `se elimino el producto ` }
                : { error: "producto no encontrado" }
        );   
});

module.exports = { routerProducto };
