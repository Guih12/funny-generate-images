const express = require('express')
require('dotenv').config()
const app = express();

const viewConfig = require('./config/viewConfig');

app.set('views', viewConfig.views)
app.set('view engine', viewConfig.engine)
app.use(express.static(viewConfig.publicPath));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' })
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})