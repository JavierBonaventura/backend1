const moment = require("moment");
const fs = require("fs").promises;

class Cart {
  constructor() {
    this.path = "./data/cart.txt";
    this.cart = [];
    this.id = 1;
    this.cartProducts = {
      id: this.id,
      timestamp: moment().format("L LTS"),
      nombre: "",
      code: "",
      thumbnail: "",
      precio: 0,
      stock: 0,
    };
  }

  async cartGetAll() {
    try {
      const data = await fs.readFile(this.path, "utf8");
      this.cart = JSON.parse(data);
      return this.cart;
    } catch (error) {}
  }

  async newCart() {
    try {
      const data = await this.cartGetAll();
      if (!data) {
        data = this.cart;
      } else if (data.length > 0) {
        this.id = parseInt(data[data.length - 1].id) + 1;
      }
      const cart = {
        id: this.id,
        timestamp: moment().format("L LTS"),
        products: [],
      };
      data.push(cart);
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
      return cart;
    } catch (error) {}
  }

  async deleteCart(id) {
    try {
      const data = await this.cartGetAll();
      const index = data.findIndex((cart) => cart.id === parseInt(id));
      data.splice(index, 1);
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
      return `Se ha eliminado el carrito con id: ${id}`;
    } catch (error) {}
  }

  async cartProd(id) {
    try {
      const data = await this.cartGetAll();
      const cart = data.find((cart) => cart.id == parseInt(id));
      return cart;
    } catch (error) {}
  }

  async addProduct(idCart, product) {
    try {
      const data = await this.cartGetAll();
      const cart = data.find((cart) => cart.id === parseInt(idCart));
      cart.products.push(product);
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
      return cart;
    } catch (error) {}
  }

  async eraseProduct(id, idProd) {
    try {
      const data = await this.cartGetAll();
      const cart = data.find((cart) => cart.id === parseInt(id));
      const index = cart.products.findIndex(
        (product) => product.id === parseInt(idProd)
      );
      cart.products.splice(index, 1);
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
      return cart;
    } catch (error) {}
  }
}

module.exports = Cart;
