const path = require('path');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { getPaths, generateHtmlPlugins } = require('./utils');
const parts = require('./webpack.parts');
const config = require('./config');

const paths = getPaths(config);

const lintJSOptions = {
  emitWarning: true,
  // Fail only on errors
  failOnWarning: false,
  failOnError: true,

  // Toggle autofix
  fix: true,
  cache: true,

  formatter: require('eslint-friendly-formatter'),
};

const lintStylesOptions = {
  context: paths.css.src,
  syntax: 'scss',
  emitErrors: false,
  // fix: true,
};

// get array of HTMLWebpackPlugin's
const htmlPlugins = generateHtmlPlugins(paths.pages, /\.html$/);

const alias = (dir = '') => path.resolve(path.join(__dirname, '..', dir));

module.exports = merge([
  {
    context: paths.src,
    resolve: {
      unsafeCache: true,
      symlinks: false,
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
        util: alias('src/util'),
        styles: alias('src/scss'),
        images: alias('src/assets/images'),
      },
    },
    entry: paths.entry,
    output: {
      path: paths.dist,
      publicPath: parts.publicPath,
    },
    optimization: {
      splitChunks: {
        // Must be specified for HtmlWebpackPlugin to work correctly.
        // See: https://github.com/jantimon/html-webpack-plugin/issues/882
        chunks: 'all',
      },
    },
    stats: {
      warningsFilter: (warning) => warning.includes('entrypoint size limit'),
      children: false,
      modules: false,
    },
    plugins: [
      ...htmlPlugins,
      new FriendlyErrorsPlugin(),
      new StylelintPlugin(lintStylesOptions),
    ],
    module: {
      noParse: /\.min\.js/,
    },
  },
  parts.loadHtml({ options: { minimize: true } }),
  parts.lintJS({ include: paths.js.src, options: lintJSOptions }),
  parts.loadFonts({
    include: paths.fonts.src,
    options: {
      name: `${paths.fonts.dist}/[name].[hash:8].[ext]`,
    },
  }),
  // parts.extractSvg({
  //   include: paths.app,
  //   options: {
  //     extract: true,
  //     spriteFilename: `${paths.svg.src}/sprite.[hash:8].svg`,
  //     esModule: false,
  //   },
  // }),
  parts.loadSvg(),
]);
