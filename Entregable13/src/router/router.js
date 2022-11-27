import { Router } from 'express'
import path from 'path'
import passport from 'passport'

const routes = new Router()

routes.get('/', (req, res) => {
    res.redirect('/home')
})

routes.get('/login', (req, res) => {
    const nombre = req.user?.username
    console.log(path.join(process.cwd()));
    if (nombre) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), "/src/public/login.html"))
    }
})
routes.post(
    "/login",
    passport.authenticate("login", {
        successRedirect: "/home",
        failureRedirect: "/error-login",
    })
);
routes.get("/error-login", (req, res) => {
    res.sendFile(path.join(process.cwd(), "/src/public/error-login.html"))
});

routes.get("/register", (req, res) => {
    res.sendFile(path.join(process.cwd(), "/src/public/register.html"))
});
routes.post(
	"/register",
	passport.authenticate("register", {
		successRedirect: "/login",
		failureRedirect: "/error-register",
	})
);
routes.get("/error-register", (req, res) => {
    res.sendFile(path.join(process.cwd(), "/src/public/error-register.html"))
});

routes.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.render(path.join(process.cwd(), '/src/views/logout.ejs'))
      });
})

routes.get('/home', checkAuthentication, (req, res) => {
    res.render(path.join(process.cwd(), '/src/views/home.ejs'), { nombre: req.user.username })
})
function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
}

export default routes