const webpack = require("webpack");
const path = require("path");
const config = require("./gulp/config");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const RemoveConsolePlugin = require("remove-console-plugin");

function createConfig(env) {
  let isProduction, webpackConfig;

  if (env === undefined) {
    env = process.env.NODE_ENV;
  }

  isProduction = env === "production";

  webpackConfig = {
    mode: isProduction ? "production" : "development",
    context: path.join(__dirname, config.src.js),
    entry: {
      // vendor: ['jquery'],
      //polyfill: "@babel/polifill",
      app: ["babel-polyfill", "./app.js"],
    },
    output: {
      path: path.join(__dirname, config.dest.js),
      filename: "[name].js",
      publicPath: "js/",
    },
    devtool: isProduction ? "#source-map" : "#cheap-module-eval-source-map",
    plugins: [
      // new webpack.optimize.CommonsChunkPlugin({
      //     name: 'vendor',
      //     filename: '[name].js',
      //     minChunks: Infinity
      // }),
      new RemoveConsolePlugin({ remove: ["log"] }),
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            formatter: require("eslint-formatter-pretty"),
          },
        },
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        analyzerPort: 4000,
        openAnalyzer: false,
      }),
    ],
    resolve: {
      extensions: [".js"],
      alias: {
        TweenLite: path.resolve(
          "node_modules",
          "gsap/src/uncompressed/TweenLite.js"
        ),
        TweenMax: path.resolve(
          "node_modules",
          "gsap/src/uncompressed/TweenMax.js"
        ),
        TimelineLite: path.resolve(
          "node_modules",
          "gsap/src/uncompressed/TimelineLite.js"
        ),
        TimelineMax: path.resolve(
          "node_modules",
          "gsap/src/uncompressed/TimelineMax.js"
        ),
        ScrollMagic: path.resolve(
          "node_modules",
          "scrollmagic/scrollmagic/uncompressed/ScrollMagic.js"
        ),
        "animation.gsap": path.resolve(
          "node_modules",
          "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js"
        ),
        "debug.addIndicators": path.resolve(
          "node_modules",
          "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js"
        ),
      },
    },
    optimization: {
      minimize: isProduction,
      noEmitOnErrors: true,
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: [path.resolve(__dirname, "node_modules")],
          loader: "eslint-loader",
          options: {
            fix: true,
            //cache: true,
            ignorePattern: __dirname + "/src/js/lib/",
          },
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: [path.resolve(__dirname, "node_modules")],
          query: {
            presets: ["env", "stage-0"],
          },
        },
        {
          test: /\.(glsl|frag|vert)$/,
          loader: "raw-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(glsl|frag|vert)$/,
          loader: "glslify-loader",
          exclude: /node_modules/,
        },
      ],
    },
  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      })
    );
  }

  return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
