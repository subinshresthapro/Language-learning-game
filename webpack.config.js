const path = require('path');

module.exports = {
  mode: 'development',
  entry: './web.index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'nepali-game-web.js',
    library: 'NepaliJetsGame',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src/web'),
    },
    compress: true,
    port: 9000,
    open: true
  }
};
