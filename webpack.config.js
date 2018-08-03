const { VueLoaderPlugin } = require('vue-loader');
const nodeSassMagicImporter = require('node-sass-magic-importer');
const path = require('path');
const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const vueLoaderConfig = require('./webpack/vue-loader.conf');

const env = process.env.NODE_ENV;
const minify = env === 'production';
const sourceMap = env === 'development';

const alias = (dir = '') => path.resolve(path.join(__dirname, dir));
const assetsPath = (dir = '') => path.posix.join('static', dir);
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [alias('src'), alias('test')],
  exclude: [alias('src/tests')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true,
  },
});

const config = {
  context: alias(),
  entry: {
    app: './src/main.js',
  },
  mode: env,
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': alias('src'),
      api: alias('src/api'),
      store: alias('src/store'),
      components: alias('src/components'),
      widgets: alias('src/widgets'),
      i18n: alias('src/i18n'),
      shared: alias('src/shared'),
      services: alias('src/shared/services'),
      util: alias('src/shared/util'),
      styles: alias('src/assets/scss'),
      images: alias('src/assets/images'),
    },
  },
  optimization: {
    splitChunks: {
      // Must be specified for HtmlWebpackPlugin to work correctly.
      // See: https://github.com/jantimon/html-webpack-plugin/issues/882
      chunks: 'all',
    },
  },
  devtool: sourceMap ? 'cheap-module-eval-source-map' : undefined,
  module: {
    rules: [
      createLintingRule(),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [alias('src')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['ie >= 8', 'last 4 version'],
                }),
              ],
              sourceMap,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              importer: nodeSassMagicImporter(),
              sourceMap,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: alias('dist/index.html'),
      template: alias('static/index.html'),
      inject: true,
      minify: minify
        ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          // More options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        }
        : false,
    }),
  ],
};

if (minify) {
  config.optimization.minimizer = [
    new OptimizeCSSAssetsPlugin(),
    // Enabled by default in production mode if
    // the 'minimizer' option isn't overridden.
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
    }),
  ];
}

if (env !== 'development') {
  config.plugins.push(new MiniCssExtractPlugin());

  const sassLoader = config.module.rules.find(({ test }) => test.test('.scss'));
  // Replace the 'vue-style-loader' with
  // the MiniCssExtractPlugin loader.
  sassLoader.use[0] = MiniCssExtractPlugin.loader;
}

module.exports = config;
