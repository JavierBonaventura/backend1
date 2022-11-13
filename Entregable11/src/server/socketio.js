import ContenedorMongoDb from '../server/db.js'
import server from '../app.js'
import { Server } from 'socket.io'

class Chat {
    constructor() {
        this.socket = new Server(server)
        
        this.socket.on('connection', socket => {

            let now = new Date().toLocaleTimeString();
            
            ContenedorMongoDb.find('messages', {}, (err, docs) => {
                if (err) {
                    console.log(err)
                } else {
                    docs.forEach(doc => {
                        socket.emit('message', doc)
                    })
                }
            })
            console.log("--------------------------")
            console.log(`[${now}] Se abrió una nueva conexión !!`)
            socket.emit('message', {
                user: "admin",
                message: "Bienvenido al chat",
                date: dateIni = new Date().toLocaleDateString()
            })
 
            socket.on("message", data => {
                console.log(data);
                ContenedorMongoDb.save('messages', data, (err, doc) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(doc)
                    } 
                })
                io.sockets.emit("message", data)
            })
        })

        }
}

export default Chat