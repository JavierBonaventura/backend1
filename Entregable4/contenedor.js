const fs = require("fs");

let productos = [
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
  constructor() {
    this.productos = productos;
    const indice = productos.sort((a, b) => b.id - a.id)[0].id;
    this.lastId = indice + 1;
  }

 
  async getAll() {
    try {
      return this.productos;
    } catch (error) {
        console.log("El error del metodo getAll es " + error);
      }
  }

  async save(productoNuevo) {
    try {
      let contenido = await this.getAll();
      productoNuevo.id = this.lastId;
      contenido = [...contenido, productoNuevo];
      this.productos = contenido;
      this.lastId++;
      return productoNuevo;
    } catch (error) {
        console.log("El error del metodo save es " + error);
      }
  }

  async update(id, productoNuevo) {
    try {
      let contenido = await this.getAll();

      const index = contenido.findIndex((x) => x.id === id);

      if (index >= 0) {
        contenido.splice(index, 1, { ...productoNuevo, id });
        this.productos = contenido;
        return productoNuevo;
      } else {
        return null;
      }
    } catch (error) {
        console.log("El error del metodo update es " + error);
      }
  }

  async getById(id) {
    try {
      let contenido = await this.getAll();
      const result = contenido.find((objeto) => objeto.id == id);
      return result ?? null;
    } catch (error) {
        console.log("El error del metodo getById es " + error);
      }
  }


  async deleteById(id) {
    try {      
      let contenido = await this.getAll();
      const index = contenido.findIndex((x) => x.id === id);      
      if (index >= 0) {
        this.productos = [...contenido.filter((dato) => dato.id !== id)];
        return id;
      } else {
        return null;
      }      
    } catch (error) {
        console.log("El error del metodo deleteById es " + error);
      }
  }
}

module.exports = { Contenedor };
