import express from 'express'
import productsFaker from './products-test.js'
import config from '../config/config.js';
import { webAuth } from './session-mongo.js';


const { Router } = express
const mainRouter = new Router()

let products=[]
if (config.env.ENV==='test') {products = productsFaker.fakerProducts()}


mainRouter.get('/index', webAuth, (req, res) => {    
    res.render('./main', {list: products})
})

mainRouter.get('/list',webAuth, (req, res) => {   
    res.render('./list', {list: products})
})

export default mainRouter
