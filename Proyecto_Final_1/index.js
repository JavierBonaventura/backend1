const express = require("express");
const cors = require("cors");
const { routerProductos } = require("./rutas/routerProductos");
const { routerCarrito } = require("./rutas/routerCarrito");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
var userLogged = false;


const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));



app.get("/", (req, res) => {
    res.status(200).json({ msg: "proyecto final zoppini" });
});

app.post("/login", (req, res) => {
    module.exports.logged = true;
    res.status(200).json({ msg: "user logged in" });
});


app.use("/productos", routerProductos);

app.use("/carrito", routerCarrito);

module.exports.logged = userLogged;
