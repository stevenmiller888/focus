import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'

const { NODE_ENV = 'development' } = process.env

const base = {
  context: __dirname,
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: './src/manifest.json', to: './manifest.json' }
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['index']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ]
}

const development = {
  ...base,
  devtool: '#eval-module-source-map',
  module: {
    ...base.module,
    rules: [
      ...base.module.rules,
      {
        test: /\.css$/,
        include: /src/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[local]_[hash:8]',
              modules: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin()
  ]
}

const production = {
  ...base,
  devtool: '#source-map',
  module: {
    ...base.module,
    rules: [
      ...base.module.rules,
      {
        test: /\.css$/,
        include: /src/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[hash:8]'
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: /src/,
        loader: ExtractTextPlugin.extract({ use: [ 'css-loader' ] })
      }
    ]
  },
  plugins: [
    ...base.plugins,
    new ExtractTextPlugin({
      filename: 'bundle-[hash:8].css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })
  ]
}

if (NODE_ENV === 'development') {
  module.exports = development
} else {
  module.exports = production
}
