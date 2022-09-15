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

