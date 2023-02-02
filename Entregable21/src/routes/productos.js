import productosDao from '../daos/controller.js';
import { Router } from "express";
import logger from '../utils/logger.js';

const routerProductos = Router();

const productosDaoController = productosDao.productosDao;

routerProductos.get('/', async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/productos' - con metodo: ${method} - time: ${time}`);

    console. log('GET request recibido');
    console. log('productosDao: ', productosDao);
    const productos = await productosDaoController.read();
});

routerProductos.get('/:id', async (req,res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/productos' - con metodo: ${method} - time: ${time}`);

    console.log('GET request recibido con id');
    const id = Number(req.params.id);
    const producto = productosDaoController.readOne(id);
});

routerProductos.post('/', async (req,res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/productos' - con metodo: ${method} - time: ${time}`);

    console.log('POST request recibido');
    const producto ={ 
        timestamp: Date.now(),
        nombre: req.query.nombre,
        descripcion: req.query.descripcion,
        codigo: req.query.codigo,
        foto: req.query.foto,
        precio: req.query.precio,
        stock: req.query.stock,
    };
    const newProducto = await productosDaoController.created(producto);
});

routerProductos.put('/:id', async (req,res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/productos' - con metodo: ${method} - time: ${time}`);

    console.log('PUT request recibido');
    const id = Number(req.params.id);
    const productoEncontrado = {};
    productoEncontrado.timestamp = req.query.timestamp;
    productoEncontrado.nombre = req.query.nombre;
    productoEncontrado.descripcion = req.query.descripcion;
    productoEncontrado.codigo = req.query.codigo;
    productoEncontrado.foto = req.query.foto;
    productoEncontrado.precio = req.query.precio;
    productoEncontrado.stock = req.query.stock;

    await productosDaoController.update(id,productoEncontrado);
});

routerProductos.delete('/:id', async (req,res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/productos' - con metodo: ${method} - time: ${time}`);
    
    console.log('DELETE request recibido');
    const id = Number(req.params.id);
    const productoBorrado = await productosDaoController.delete(id);
});

export default routerProductos;