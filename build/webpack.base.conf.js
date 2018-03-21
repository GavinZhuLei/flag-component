const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const glob = require('glob')
const projectRoot = path.resolve(__dirname, '../')
const entryObj = {
  client: glob.sync('./src/' + config.moduleName + '/client/**/*.js').reduce(function (prev, curr) {
      prev[curr.slice(14, -3)] = curr;
      return prev;
  }, {}),
  system: glob.sync('./src/' + config.moduleName + '/sys/**/*.js').reduce(function (prev, curr) {
      prev[curr.slice(14, -3)] = curr;
      return prev;
  }, {})
}
const entryJS = entryObj[process.env.NODE_ENV]?entryObj[process.env.NODE_ENV]:glob.sync('./src/' + config.moduleName + '/**/*.js').reduce(function (prev, curr) {
      prev[curr.slice(14, -3)] = curr;
      return prev;
  }, {});
console.log("********webpack.base.conf.js*******")
console.log(path.resolve(__dirname, '../client/index/index.html'))
console.log(entryJS)
module.exports = {
  entry: entryJS,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV !== 'development'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, '../src'),
      'api':path.resolve(__dirname,'../src/api'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'common': path.resolve(__dirname,'../src/common'),
      'components': path.resolve(__dirname, '../src/components'),
      'styles': path.resolve(__dirname, '../src/styles'),
      'vux-components': 'vux/src/components/',
      'modules': path.resolve(__dirname, '../src/modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: {
          loader:'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        include: projectRoot,
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        use: {
          loader:'vue-loader',
          options: vueLoaderConfig
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: projectRoot,
        exclude: [new RegExp(`node_modules\\${path.sep}(?!vue-bulma-.*)`)]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
