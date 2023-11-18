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

const { setTitle } = require('./src/middlewares/set-title');
const { userLogged } = require('./src/middlewares/user-logged');

app.set('views', viewConfig.views)
app.set('view engine', viewConfig.engine)
app.use(express.static(viewConfig.publicPath));
app.use('styles', express.static(viewConfig.styles));
app.use(cookieParser())
app.use(express.json());

app.use(expressLayouts)
app.set('layout', viewConfig.layouts)
app.use(setTitle)

app.get('/', (req, res) => new HomeController().index(req, res))

app.get('/auth/signin', (req, res) => new AuthController().signIn(req, res))
app.get('/auth/signup', (req, res) => new AuthController().signUp(req, res))

app.post('/auth/register', async (req, res) => {
  try{
    const response = await axios.get('http://localhost:5000/api/sign-in')
    res.cookie('token', response.data.token,  { httpOnly: true })
    res.redirect('/')
  }catch(error){
    console.log(error)
  }
})

app.use((req, res) => {
  res.render('404', { message: `A página ${req.url.split("/")[1]} não existe`})
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})