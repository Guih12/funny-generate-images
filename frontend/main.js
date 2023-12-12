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
const MyImagesController = require('./src/controllers/my-images-controller');
const GenerateImageController = require('./src/controllers/generate-image-controller');
const FeedController = require('./src/controllers/feed-controller');

const homeController = new HomeController()
const authController = new AuthController()
const myImagesController = new MyImagesController()
const generateImageController = new GenerateImageController()
const feedController = new FeedController()


const { setTitle } = require('./src/middlewares/set-title');
const { authenticate } = require('./src/middlewares/authenticate');

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
app.post('/auth/register', (req, res) => authController.register(req, res))


app.use('/my-images', authenticate);
app.use('/generate-image', authenticate);

app.get('/current_user', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'unauthorized', message: 'Usuário não autenticado' });
  }
  res.json({ token });
})

app.get('/feed',                          authenticate, (req, res) => feedController.index(req, res))
app.get('/my-images',                     authenticate, (req, res) => myImagesController.index(req, res))
app.get('/generate-image',                authenticate, (req, res) => generateImageController.index(req, res))
app.post('/generate-image',               authenticate, (req, res) => generateImageController.generate(req, res))
app.post('/generate-image/save',          authenticate, (req, res) => generateImageController.save(req, res))
app.put('/like-image/:image_id',          authenticate, (req, res) => generateImageController.like(req, res))
app.delete('/my-images/:image_id/delete', authenticate, (req, res) => myImagesController.deleteImage(req, res))

app.use((req, res) => {
  res.render('404', { message: `A página ${req.url.split("/")[1]} não existe`})
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})