const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const axios = require('axios')
require('dotenv').config()
const app = express();

const viewConfig = require('./config/viewConfig');

const HomeController = require('./src/controllers/home-controller');
const AuthController = require('./src/controllers/auth-controller');

const homeController = new HomeController()
const authController = new AuthController()


const { setTitle } = require('./src/middlewares/set-title');

app.set('views', viewConfig.views)
app.set('view engine', viewConfig.engine)
app.use(express.static(viewConfig.publicPath));
app.use('styles', express.static(viewConfig.styles));
app.use(cookieParser())
app.use(express.json());

app.use(expressLayouts)
app.set('layout', viewConfig.layouts)
app.use(setTitle)

app.get('/', (req, res) => homeController.index(req, res))

app.get('/auth/signin', (req, res) => authController.signIn(req, res))
app.get('/auth/signup', (req, res) => authController.signUp(req, res))

app.post('/auth/login', (req, res) => authController.login(req, res))

app.get('/current_user', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'unauthorized', message: 'Usuário não autenticado' });
  }
  res.json({ token });
})

app.use((req, res) => {
  res.render('404', { message: `A página ${req.url.split("/")[1]} não existe`})
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})