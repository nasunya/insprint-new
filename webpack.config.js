const path = require('path')

module.exports = {
  entry: "assets/js/index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, 'assets')
  }
}