import app from './server/server.js'
import config from './config/config.js'
import { Server as io } from 'socket.io'
import ContenedorMongoDb from './server/db.js'
import normalizr from 'normalizr'
import { messageSchemaNormalizr, userSchemaNormalizr } from './models/messageSchema.js'
import util from 'util'
const normalize = normalizr.normalize


const server = app.listen(config.env.PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
    var chat = new io(server);
    chat.on('connection', (socket) => {

        let now = new Date().toLocaleTimeString();
        let messages = new ContenedorMongoDb('messages', {});
        let messageDisplay = messages.listAll()
            .then(data => {

                console.log("data sin normalizar: " + JSON.stringify(data).length)
                console.log("data sin normalizar: " + JSON.stringify(data))

                let normalizedData = normalize(data, [messageSchemaNormalizr])
                console.log(util.inspect(normalizedData, { showHidden: true, depth: 12 }))
                chat.sockets.emit('message', normalizedData)


            })
            .catch(err => {
                console.log(err)
            })
        console.log(`Cliente conectado: ${socket.id}`);
        
        console.log("--------------------------")
        console.log(`[${now}] Se abrió una nueva conexión !!`)
        console.log(`Se abrió una nueva conexión !!`)
        let welcomeMsg=[{
            user: {
                email: "admin@admin.com",
                name: "admin",
                lastname: "admin",
                avatar: "avatar-admin",
                age: "99",
                nickname: "admin"
            }, 
            id: "1",
            message: "Bienvenido al chat",
            date: new Date().toLocaleTimeString()}]

        console.log("data sin normalizar: " + JSON.stringify(welcomeMsg).length)
        let normalizedData = normalize(welcomeMsg, [messageSchemaNormalizr])
        console.log("data normalizada: " + util.inspect(normalizedData, { showHidden: true, depth: 12 }))
        console.log("data normalizada lenght: " + JSON.stringify(normalizedData).length)
        socket.emit('message', normalizedData)

        socket.on("message", data => {

            let messages = new ContenedorMongoDb('messages', {});

            messages.save(data, (err, doc) => {
                if (err) {
                    console.log(err)
                } else {
     
                    chat.sockets.emit("message", doc)
                } 
            })
        })
    })
})

server.on('error', error => console.log(`Error en servidor ${error}`))

app.use(function(err, req, res, next) {
  
    res.status(err.status || 404).send({
        err: {
        status: err.status || 404,
        message: err.message || "Pagina no encontrada."
        }
    })  
})

export default server