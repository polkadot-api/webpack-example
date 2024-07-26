// All this three lines bellow are importings
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// Here goes all configuration
module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/, // apply to all JS files
        exclude: /node_modules/, // exclude all files on node_modules
        use: {
          loader: "babel-loader", // looks at .babelrc
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html", // create a template to start from
    }),
  ],
  devServer: {
    host: "localhost", // where to run
    historyApiFallback: true,
    port: 3000, //given port to exec. app
    open: true, // open new tab
    hot: true, // Enable webpack's Hot Module Replacement
  },
};
