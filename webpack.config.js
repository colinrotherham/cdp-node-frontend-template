import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'path'
import CopyPlugin from 'copy-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import WebpackAssetsManifest from 'webpack-assets-manifest'

const require = createRequire(import.meta.url)
const dirname = path.dirname(fileURLToPath(import.meta.url))

const govukFrontendPath = path.dirname(
  require.resolve('govuk-frontend/package.json')
)

const webpackConfig = {
  isDevelopment: process.env.NODE_ENV !== 'production'
}

export default {
  context: path.resolve(dirname, 'src/client'),
  entry: {
    application: {
      import: ['./javascripts/application.js', './stylesheets/application.scss']
    }
  },
  mode: webpackConfig.isDevelopment ? 'development' : 'production',
  ...(webpackConfig.isDevelopment && { devtool: 'source-map' }),
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000
  },
  output: {
    filename: 'javascripts/[name].[fullhash].js',
    path: path.join(dirname, '.public'),
    publicPath: '/public/',
    library: '[name]'
  },
  resolve: {
    alias: {
      '/public/assets': path.join(govukFrontendPath, 'dist/govuk/assets')
    }
  },
  module: {
    rules: [
      ...(webpackConfig.isDevelopment
        ? [
            {
              test: /\.(js|mjs)$/,
              enforce: 'pre',
              use: ['source-map-loader']
            }
          ]
        : []),
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // Allow sass-loader to process CSS @import first
              // before we use css-loader to extract `url()` etc
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [
                  path.join(dirname, 'src/server/common/components'),
                  path.join(dirname, 'node_modules')
                ],
                quietDeps: true
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
      {
        test: /\.(ico)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackAssetsManifest(),
    new MiniCssExtractPlugin({
      filename: 'stylesheets/[name].[fullhash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(govukFrontendPath, 'dist/govuk/assets'),
          to: 'assets'
        }
      ]
    })
  ]
}
