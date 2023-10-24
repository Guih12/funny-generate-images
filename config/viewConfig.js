const path = require('path')
const sourcePath = path.join(__dirname, '..', 'src');

/**
 * @returns {views: string[], engine: string, publicPath: string, styles: string}
 */
module.exports = {
  views: [
    path.join(sourcePath, 'views'),
    path.join(sourcePath, 'views', 'pages'),
  ],
  engine: 'ejs',
  publicPath: path.join(sourcePath, 'public'),
  styles: path.join(sourcePath, 'public', 'styles'),
  layouts: path.join(sourcePath, 'views', 'layouts', 'main')
}