const moment = require("moment");
const fs = require("fs").promises;

class Products {
  constructor() {
    this.path = "./data/products.txt";
    this.products = [];
    this.id = 1;
  }

  async getAll() {
    try {
      const data = await fs.readFile(this.path, "utf8");
      this.products = JSON.parse(data);
      return this.products;
    } catch (error) {}
  }

  async getById(id) {
    try {
      const data = await this.getAll();
      const product = data.find((product) => product.id == parseInt(id));
      return product;
    } catch (error) {}
  }

  async save(product) {
    try {
      const data = await this.getAll();
      console.log(data.length);
      this.id = parseInt(data[data.length - 1].id) + 1;
      product = {
        id: this.id,
        timestamp: moment().format("L LTS"),
        nombre: product.nombre,
        codigo: product.codigo,
        thumbnail: product.thumbnail,
        precio: product.precio,
        stock: product.stock,
      };
      data.push(product);
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
      this.id++;
      return product;
    } catch (error) {}
  }

  async update(id, product) {
    try {
      const data = await this.getAll();
      const index = data.findIndex((product) => product.id == id);
      data[index] = {
        id: id,
        timestamp: moment().format("L LTS"),
        ...product,
      };
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
      return data[index];
    } catch (error) {}
  }

  async deleteById(id) {
    try {
      const data = await this.getAll();
      const index = data.findIndex((product) => product.id == id);
      data.splice(index, 1);
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
      return `Se ha eliminado el producto con id: ${id}`;
    } catch (error) {}
  }
}

module.exports = Products;
