const path = require('path')

const sourcePath = path.join(__dirname, '..', 'src');

module.exports = {
  views: [
    path.join(sourcePath, 'views'),
    path.join(sourcePath, 'views', 'pages')
  ],
  engine: 'ejs',
  publicPath: path.join(sourcePath, 'public'),
}