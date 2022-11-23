import mongoose from 'mongoose'
import { asPOJO, renameField, removeField, print } from './utils.js'
import config from '../config/config.js';
import { messageSchemaMongoose } from '../models/messageSchema.js'

const connectedDB = mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
    .then(
        () => {
            console.log('connected to mongodb')
        },
        err => {
            console.log('error connecting to mongodb', err)
        }
    )

class ContenedorMongoDb {

    constructor(nombreColeccion, data) {
        this.data = data
        this.coleccion = mongoose.model(nombreColeccion, messageSchemaMongoose)
    }


    async listAll() {
        try {
            console.log(`----------Listing all documents from ${this.coleccion.modelName}-----`)

            let docs = await this.coleccion.find({}, { __v: 0 }).lean()

            docs = docs.map(asPOJO)
            docs = docs.map(d => renameField(d, '_id', 'id'))
            return docs
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save(nuevoElem) {
        try {
            console.log("Trying save" + JSON.stringify(nuevoElem))
            let now = { date: new Date().toLocaleTimeString() };
            nuevoElem = { ...nuevoElem, now }
            console.log("Trying save added date" + JSON.stringify(nuevoElem))

            let doc = await this.coleccion.create(nuevoElem);
            doc = asPOJO(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return doc
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }


}

export default ContenedorMongoDb