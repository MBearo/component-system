const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
          // options: {
          //   presets: ['@babel/preset-env'],
          //   plugins: [['babel-plugin-transform-react-jsx', { pragma: 'create' }]]
          // }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    })
  ]
}
