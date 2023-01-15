import carritosDao from '../daos/controller.js';
import logger from '../utils/logger.js';

import { Router } from "express";

const routerCarrito = Router();
const carritosDaoController = carritosDao.carritosDao;

routerCarrito.post('/', async (req,res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/carritos' - con metodo: ${method} - time: ${time}`);

    console.log('POSTcarrito request recibido');
    const carrito = {
        timestamp:  Date.now(),
    };
    const newCarrito = await carritosDaoController.created(carrito);
    res.status(201).json({
        result: 'Carrito Agregado',
        NuevoCarrito: newCarrito
    });
});

routerCarrito.delete('/:id', async(req,res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/carritos' - con metodo: ${method} - time: ${time}`);

    console.log('DELETEcarrito request recibido');
    const id = Number(req.params.id);
    const carritoBorrado = await carritosDaoController.delete(id);
    res.status(200).json({
        result: 'Carrito Borrado',
        id: req.params.id,
        NuevoListadoCarrito: carritoBorrado,
    });
});


export default routerCarrito;