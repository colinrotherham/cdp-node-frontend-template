import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import WebpackAssetsManifest from 'webpack-assets-manifest'

const require = createRequire(import.meta.url)
const dirname = path.dirname(fileURLToPath(import.meta.url))

const govukFrontendPath = path.dirname(
  require.resolve('govuk-frontend/package.json')
)

const webpackConfig = {
  isDevelopment: process.env.NODE_ENV !== 'production',
  stylesheets: {
    components: path.join(dirname, 'src/server/common/components')
  }
}

export default {
  context: path.resolve(dirname, 'src/client'),
  entry: {
    application: './assets/javascripts/application.js'
  },
  mode: webpackConfig.isDevelopment ? 'development' : 'production',
  ...(webpackConfig.isDevelopment && { devtool: 'source-map' }),
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000
  },
  output: {
    filename: 'js/[name].[fullhash].js',
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
              test: /\.js$/,
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
        test: /\.(?:s[ac]|c)ss$/i,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          'css-loader',
          ...(webpackConfig.isDevelopment ? ['resolve-url-loader'] : []),
          {
            loader: 'sass-loader',
            options: {
              ...(webpackConfig.isDevelopment && { sourceMap: true }),
              sassOptions: {
                outputStyle: 'compressed',
                quietDeps: true,
                includePaths: [webpackConfig.stylesheets.components]
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
    new WebpackAssetsManifest({
      output: 'manifest.json'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash].css'
    })
  ]
}
