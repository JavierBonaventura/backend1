import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import exphbs from "express-handlebars";
import path from "path";
import passport from "passport";
import dotenv from "dotenv";
import compression from "compression";

import "./src/dataBase/config.js";
import MongoStore from "connect-mongo";

const app = express();
dotenv.config();

const advanceOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
app.use(cookieParser());
app.use(
  session({
    store: new MongoStore({ 
        mongoUrl: "mongodb://localhost:27017/passport-mongo",
        mongoOptions: advanceOptions,
      }),
    secret: "1234567890!@#$%^&*()",
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 1000000, 
    },
  })
);

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer);
io.on('connection', (socket) => {
  console.log('un cliente se ha conectado');
  socket.emit('productos', productos);
  socket.emit('mensajes', mensajes);

  socket.on('nuevo-producto', data => {
    logger.info(`Mensaje: Nuevo mensaje - time: ${new Date().toLocaleString()}`);
      console.log('servidor productos');
      console.log('data nuevo-producto: ', data);
      setProducto(data)
      io.sockets.emit('productos', productos);
      modBD.insertProductMysql(data);
  });

  socket.on('nuevo-mensaje', data => {
    logger.info(`Mensaje: Nuevo mensaje - time: ${new Date().toLocaleString()}`);
      console.log('servidor mensajes');
      console.log('data nuevo-mensaje: ', data);
      mensajes.push(data);
      io.sockets.emit('mensajes', mensajes);
      modBD.insertProductSqlite(data);
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(path.dirname(""), "./src/views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(compression());

import logger from "./src/utils/logger.js";


import router from "./src/routes/index.js";
app.use("/", router);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});
