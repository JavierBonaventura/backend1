const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8080;


class Contenedor {
  async getAll() {
    try {
      const contenido = await fs.promises.readFile("./productos.txt", "utf-8");
      console.log(contenido);
      return JSON.parse(contenido);
    } catch (error) {
      console.log("El error del metodo getAll es " + error);
    }
  }

  async getById(id) {
    const contenido = await this.getAll();
    const productoBuscado = contenido.filter((producto) => producto.id == id);
    // console.log(productoBuscado);
    return (productoBuscado);
  }
}

const server = app.listen(PORT, () => {
  console.log("servidor iniciado");
});
const productos = new Contenedor();
app.get('/productos', async (req, res) => {
  const mostrarProductos = await productos.getAll();
  res.send(mostrarProductos);
})

app.get("/productoRandom", async (req, res) => {
  var aleatorio = Math.floor(Math.random() * (3))+1;
  const mostrarProducto = await productos.getById(aleatorio);
  res.send(mostrarProducto);
  console.log(aleatorio)
});






// app.get("/productoRandom", async (req, resp) => {
//   let productoRandom
//   contenedor.getAll().then(respuesta => productoRandom =Math.floor(Math.random()*respuesta.length))
// 	contenedor.getById(productoRandom).then(respuesta => resp.send(respuesta));
// });

// // modulo de manejo de archivos
// const fs = require("fs");
// const Contenedor = require('./fs.js');

// // modulo de express
// const express = require("express");
// const app = express();
// // definicion de puerto
// const PORT = 8080;

// //definicion de clase y metodos
// class Contenedor {
//   // obtener todos los productos del archivo
//   async getAll() {
//     try {
//       const contenido = await fs.promises.readFile("./productos.txt", "utf-8");
//       console.log(contenido);
//       return JSON.parse(contenido);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // obtener producto segun el id
//   async getById(id) {
//     const contenido = await this.getAll();
//     const productoBuscado = contenido.filter((producto) => producto.id === id);
//     console.log(productoBuscado)
//     return productoBuscado;
//   }
// }

// const contenedor = new Contenedor();

// // montaje de servidores

// const server = app.listen(PORT, () => {
//   console.log("servidor iniciado");
// });

// app.get("/productos", (req, resp) => {
//   contenedor.getAll().then(respuesta => resp.send(respuesta));
// });

// app.get("/productoRandom", async (req, resp) => {
//   let productoRandom
//   contenedor.getAll().then(respuesta => productoRandom =Math.floor(Math.random()*respuesta.length))
// 	contenedor.getById(productoRandom).then(respuesta => resp.send(respuesta));
// });
