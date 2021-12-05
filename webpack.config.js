const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  target: isDevelopment ? 'web' : 'browserslist',
  entry: {
    script: path.resolve( __dirname, 'src', 'index.tsx' ),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource"
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader"]
      },
      {
        test: /\.(s[ac]ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader", 'sass-loader']
      }
    ],
  },
  devServer: {
    port: 8000,
    hot: true,
  },
  output: {
    filename: 'js/[name]_awake_quiz.js',
    path: path.resolve(__dirname, 'assets'),
    clean: true,
    assetModuleFilename: "images/[hash][ext][query]",
  },
  plugins: [
    isDevelopment && new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]_awake_quiz.css"
    }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['.', 'node_modules']
  },
  devtool: isDevelopment ? "source-map" : false,
  optimization: !isDevelopment ? {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
    })],
  } : {},
};
