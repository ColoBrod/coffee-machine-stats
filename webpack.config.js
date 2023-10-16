const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'web',

  module: {
    rules: [
      // Manifest json
      {
        test: /manifest\.json/,
        exclude: /(node_modules)/,
        
      },
      // TypeScript
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'ts-loader',
        },
      },
      // CSS
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      // HTML
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          }
        ],
      },
      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(webp)$/i,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'webp-loader',
          },
        ],
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
      },
    ],
  },

  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    extensions: ['', '.ts', '.tsx', '.js'],
  },
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      // manifest: 'public/manifest.json',
      chunks: ['main'],
    }),
  ],

  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
    static: [
      { directory: path.join(__dirname, 'dist') },
      { directory: path.join(__dirname, 'public') },
    ],
    compress: true,
  },
  
  // Следующая настройка может чудовищно снижать производительность программы.
  devtool: argv.mode === 'development' ? 'inline-source-map' : false,
});