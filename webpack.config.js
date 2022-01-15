const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");

const config = {
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
      },
    output: {
        filename: '[name].bundle.js',
        path: `${__dirname}/dist`,
      },
      module: {
        rules: [
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              'file-loader',
                {
                  loader: 'image-webpack-loader',
                  options: {
                      esModule: false,
                      name (file) {
                          return "[path][name].[ext]";
                      },
                      publicPath(url) {
                          return url.replace("../", "/assets/");
                      }
                  }
                },
            ]
          }
        ]
      },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
          }),
          new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to an HTML file in the dist folder
          })
    ],
    mode: 'development',
     devServer: {
       static: {
         directory: path.join(__dirname, './'),
       },
       compress: true,
       port: 8080,
     },
};

module.exports = config;