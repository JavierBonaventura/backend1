const { Router } = require("express");
const router = Router();
const fs = require("fs");

let products = [
  {
    name: "Escuadra",
    price: 123.45,
    img: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    name: "Calculadora",
    price: 234.56,
    img: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    name: "Globo Terráqueo",
    price: 345.67,
    img: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
];

let chats = fs.readFileSync("./chat/chat.json");
let messages = JSON.parse(chats);

router.get("/", (req, res) => {
  res.render("form", { products, messages });
});

module.exports = {
  router,
  products,
  messages,
};
