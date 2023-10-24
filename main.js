const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express();

const viewConfig = require('./config/viewConfig');

const HomeController = require('./src/controllers/HomeController')

app.set('views', viewConfig.views)
app.set('view engine', viewConfig.engine)
app.use(express.static(viewConfig.publicPath));
app.use('styles', express.static(viewConfig.styles));
app.use(cookieParser())

app.use(expressLayouts)
app.set('layout', viewConfig.layouts)


app.get('/', (req, res) => new HomeController().index(req, res))

app.get('/user', (req, res) => {
  res.json({user: {name: 'John Doe', age: 25}})
})

app.use((req, res) => {
  res.render('404', { message: `A página ${req.url.split("/")[1]} não existe` })
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})