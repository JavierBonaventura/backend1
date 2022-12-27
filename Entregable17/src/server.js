import express  from "express"
import {Server as HttpServer} from "http"
import cookieParser from "cookie-parser"
import session from "express-session"
import mongoose from "mongoose"
import routers from "./router/router.js"
import bCrypt from "bcrypt"
import UserModels from './models/userModels.js'
import yargs from 'yargs';

const PORT = process.env.PORT || 8080

//passport imports
import passport from "passport";
import { Strategy } from "passport-local";

const localStrategy = Strategy;




const app = express();
const httpServer = new HttpServer(app);

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/*----------- Session -----------*/
app.use(cookieParser());
app.use(
	session({
		secret: "SECRETO",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 10000, //10 mins seg
		},
	})
);
   
//middlewares passport
app.use(passport.initialize());
app.use(passport.session());
app.use(routers)


passport.use(
	"login",
	new localStrategy((username, password, done) => {
		mongoose.connect(
			process.env.MONGODBURL
		);
		try {
			UserModels.findOne(
				{
					username,				
				},
				(err, user) => {
					if (err) {
						return done(err, null);
					}
					if (!user){
						return done(null, false)
					}
					if(!isValidPassword(user, password)){
						return done(null, false)
					}
					return done(null, user)
				}
			);
		} catch (e) {
			return done(e, null);
		}
	})
);

passport.use(
	"register",
	new localStrategy(
		{ passReqToCallback: true },
		async (req, username, password, done) => {
			console.log("register", username + password);
			mongoose.connect(
				`mongodb+srv://admin:admin@cluster0.imxi6sx.mongodb.net/?retryWrites=true&w=majority`
			);
			try {
				UserModels.findOne({ 'username': username }, function (err, user) {
					if (err) {
					  return done(err);
					}			   
					if (user) {
					  return done(null, false)
					}
					UserModels.create(
						{
							username,
							password: createHash(password),
							email: req.body.email,
						},
						(err, userWithId) => {
							if (err) {
								console.log(err)
								return done(err, null);
							}
							return done(null, userWithId);
						}
					);
				})
				
			} catch (e) {
				return done(e, null);
			}
		}
	)
);



passport.serializeUser((usuario, done) => {
	console.log(usuario);
	done(null, usuario._id);
});
passport.deserializeUser((id, done) => {
	UserModels.findById(id, done);
});
function createHash(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
function isValidPassword(user, password) {
	return bCrypt.compareSync(password, user.password);
}

const args = yargs(process.argv.slice(2)).alias({
	m: "modo",
	p: "puerto",
	d: "debug",
}).default({
	modo: "prod",
	puerto: 8080,
	debug: false
}).argv;

const connectedServer = httpServer.listen(PORT, () => {
	console.log("servidor levantado en puerto 8080");
});