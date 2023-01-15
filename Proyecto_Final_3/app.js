const express = require('express');
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')

const mongoose = require('mongoose');

// Models
const cookieParser = require('cookie-parser')
const session = require('express-session')

// gzip compression
const compression = require('compression')

//passport
const passport = require('passport')
const flash = require('express-flash')
const initializePassport = require('./passport/local')


// initialize Passport
initializePassport(passport)


// websocket
const app = express();
const server = http.createServer(app)
const io = new Server(server)

// template handlebars
const templateEngine = require('./engine')
templateEngine(app)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(path.join(__dirname, "public")))

app.use(flash())
app.use(cookieParser("This is a secret"))
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    
}))


// passport
app.use(passport.initialize())
app.use(passport.session())
app.use(compression())


// Socket connection
io.on('connection', async (socket) => {
    
    //leo el mensaje nuevo y lo guardo en la base de datos
    socket.on("newMsj", async data => {
        const msj = await chatModel.create(data)
        return msj
    })
    
   
    //obtengo los mensajes normalizados 
    socket.emit("msNorm", norm)
    
})
    
    
// routers
const adminRouter = require("./routes/admin.routes")
const cartRouter = require("./routes/api.cart.routes")
const chatRouter = require("./routes/api.chat.routes")
const prodTestRouter = require("./routes/api.products.routes")
const userRouter = require("./routes/api.user.routes")
const homeRouter = require("./routes/home.routes")
const infoRouter = require("./routes/info")



app.use("/admin", adminRouter)
app.use("/api/cart", cartRouter)
app.use("/api/chat", chatRouter)
app.use("/api/products", prodTestRouter)
app.use("/api/users", userRouter)
app.use("/", homeRouter)
app.use("/info", infoRouter)



mongoose.Promise = global.Promise;
const DATABASE_URI=  'mongodb://127.0.0.1:27017';
 mongoose.connect(DATABASE_URI, { 
        // useMongoClient: true, 
        //useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //promiseLibrary: global.Promise 
    })
    .then(() => console.log(`DATABASE CONNECTED SUCCESSFULLY TO ${DATABASE_URI}.`))
    .catch(error => (console.log(error), process.exit(1)));

module.exports = server