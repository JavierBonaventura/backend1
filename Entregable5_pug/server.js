const pug = require("pug");
const express = require("express");



const { Contenedor } = require("./api/contenedor");





// Llamo a la clase y contructor
const productos = new Contenedor();

const app = express();

// Defino el motor de plantillas con pug
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));

const router = express.Router();
app.use("/", router);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Metodo para guardar un producto
// router.post("/api/productos/guardar", (req, res) => {
// 	let producto = req.body;
// 	productos.save(producto);
// 	res.redirect("/productos");
// });


router.post("/api/productos/guardar", async (req, res) => {    
	let { title, price, thumbnail } = req.body;
	const producto = await productos.save({
		title,
		price,
		thumbnail,
	});
	res.redirect("/productos")  
});

// Metodo para listar los productos guardados
router.get("/productos/", async (req, res) => {	
	const prods = await productos.getAll()

	res.render("layouts/index", {
		productos: prods,
		hayProductos: prods.length,
		
	});

});



// router.get("/productos/listar", (req, res) => {
// 	res.json(productos.listarAll());
// });

// router.get("/productos/listar/:id", (req, res) => {
// 	let { id } = req.params;
// 	res.json(productos.listar(id));
// });

// router.put("/productos/actualizar/:id", (req, res) => {
// 	let { id } = req.params;
// 	let producto = req.body;
// 	productos.actualizar(producto, id);
// 	res.json(producto);
// });

// router.delete("/productos/borrar/:id", (req, res) => {
// 	let { id } = req.params;
// 	let producto = productos.borrar(id);
// 	res.json(producto);
// });


// Inicio el servidor
const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));