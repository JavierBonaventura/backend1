import Producto from "./Producto.dao.class.js";
import mongoose from 'mongoose'
import CarritoModel from '../models/CartModel.js'


export default class Carrito {
	constructor() {
		this.url = "mongodb+srv://admin:admin@cluster0.imxi6sx.mongodb.net/?retryWrites=true&w=majority";
		this.mongodb = mongoose.connect	
		this.producto = new Producto();	
	}

	async crearCarrito(carr) {
		try{
			await this.mongodb(this.url);
			const newCart =  new CarritoModel(carr);
			return await newCart.save();

		}catch(err){
			console.log(err);
			return { error: "No se pudo crear el carrito" }
		}
	}

	// Obtener carrito por ID
	async listar(id) {
		try{		
			await this.mongodb(this.url);
			return await CarritoModel.findById(id)	
		}catch(error){
			return {error: "No existen carritos"}
		}
	}

	//Obtener un producto de un carrito
	async listarProd(id){
			 const carrProd = await this.listar(id);
			 console.log(carrProd.length);
			 return carrProd.productos;
				
	}

	// Obtener todos los carritos
	async listarAll() {
		try {
			await this.mongodb(this.url);		
			return await CarritoModel.find();		
		} catch (err) {
			return {error: "No existen carritos"}
		}
	}

	// Agregar un carrito y crea el archivo si es que no existe
	async addCarrito() {
		try {
			const contenido = await this.listarAll();
			const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
			const carr = { id: indice + 1, timeStamp: Date.now(), productos: [] };
			contenido.push(carr);
			this.crearCarrito(contenido);
			console.log("--- Carrito agregado ---");
			return carr;	

		} catch (err) {
			await this.crearCarrito([]);
			const contenido = await this.listarAll();
			const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
			contenido.push(carr)
			await this.crearCarrito(contenido);
			return carr;
		}
	}

	// Agrega un producto específico en un carrito específico
	async guardarProductoEnCarrito(idProd, idCarrito) {	
		await this.mongodb(this.url);
		const prod = await this.producto.getById(idProd);
		const carr = await CarritoModel.findById(idCarrito)
		carr.productos.push(prod)
		carr.save()
		console.log(carr)
		// return await carr.findByIdAndUpdate(carr,{$push: prod});		
	}

	// Actualiza el archivo de carrito
	async actualizar(carr, id) {
		const contenido = await this.listarAll();
		let index = contenido.findIndex((p) => p.id == id);
		carr.timeStamp = Date.now();
		if (index >= 0) {
			contenido.splice(index, 1, { ...carr, id });
			this.crearCarrito(contenido);
			return {msj: "Producto agregado"};
		} else {
			return {error: `Producto con id: ${carr.id} no existe`};
		}
	}

	// Borra un carrito en específico
	async borrar(id) {
		const contenido = await this.listarAll();
		let index = contenido.findIndex((carr) => carr.id == id);
		contenido.splice(index, 1);
		console.log(contenido);
		this.crearCarrito(contenido);

		return {msj: `{ Carrito con id: ${id} eliminado }`};
	}

	// Borra un producto en específico de un carrito
	async borrarProd(idProd, idCarrito){

		const carrito = await this.listar(idCarrito);
		console.log(carrito.productos);
		if(carrito.productos.length){
			for ( var i = 0; i < carrito.productos.length ; i++){
				let obj = carrito.productos[i];
				if ( obj.id == idProd){
					let indexProducto = carrito.productos.findIndex((prod) => prod.id == idProd);
					carrito.productos.splice(indexProducto, 1);
				}
			}
			this.actualizar(carrito, idCarrito);

		return {msj: `Producto con id: ${idProd} eliminado del carrito con id: ${idCarrito}`}

		}else{
			return {msj: "Producto no encontrado"}
		}

	
	}
}