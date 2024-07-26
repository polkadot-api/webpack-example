// All this three lines bellow are importings
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// Here goes all configuration
module.exports = {
  mode: "production",
  entry: "./src/app.tsx",
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
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
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
  devtool: "source-map",
};
