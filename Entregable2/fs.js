const fs = require("fs");


const productos = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
];

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async save(producto) {
    try {
      await fs.promises.writeFile(
        "./" + this.nombreArchivo + ".txt",
        JSON.stringify(producto, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log("El error del metodo save es " + error);
    }
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(
        "./" + this.nombreArchivo + ".txt",
        "utf-8"
      );
      console.log(contenido);
      return JSON.parse(contenido);
    } catch (error) {
      console.log("El error del metodo getAll es " + error);
    }
  }

  async saveNew(productoNuevo) {
    const contenido = await this.getAll();
    const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
    productoNuevo.id = indice + 1;
    contenido.push(productoNuevo);
    this.save(contenido);
  }

  async getById(id) {
    const contenido = await this.getAll();
    const productoBuscado = contenido.filter((producto) => producto.id == id);
    console.log(productoBuscado);
  }

  async deleteById(id) {
    const contenido = await this.getAll();
    const productosMenosElBuscado = contenido.filter(
      (producto) => producto.id !== id
    );
    console.log(productosMenosElBuscado);
    this.save(productosMenosElBuscado);
  }

  async deleteAll() {
    const arrayVacio = [];
    this.save(arrayVacio);
  }
}

// Crea el contenedor con un archivo nombre "productos.txt"
const contenedor = new Contenedor("productos");

// Guarda en el archivo el contenido de la variable productos
// contenedor.save(productos);

// Pide el resultado de un unico objeto con id "1"
// contenedor.getById(1);

// Devuelve todo el contenido del archivo "productos.txt"
// contenedor.getAll();

// Borra un item determinado
// contenedor.deleteById(1);

// Borra todo el contenido del archivo
// contenedor.deleteAll();

//Variable con un prducto nuevo de ejemplo
const productoCreado = {
  title: "Bicicleta",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};
//Crea un nuevo producto en el arreglo
contenedor.saveNew(productoCreado);

