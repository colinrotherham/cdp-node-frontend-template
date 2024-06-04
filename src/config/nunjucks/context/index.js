import path from 'path'

import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { buildNavigation } from '~/src/config/nunjucks/context/build-navigation.js'

const logger = createLogger()
const assetPath = config.get('assetPath')
const manifestPath = path.join(config.get('root'), '.public/manifest.json')

async function context(request) {
  let webpackManifest

  try {
    webpackManifest = (await import(manifestPath)).default
  } catch (error) {
    logger.error('Webpack Manifest assets file not found')
  }

  return {
    serviceName: config.get('serviceName'),
    serviceUrl: '/',
    breadcrumbs: [],
    navigation: buildNavigation(request),
    getAssetPath: function (asset) {
      const webpackAssetPath = webpackManifest[asset]

      return `${assetPath}/${webpackAssetPath}`
    }
  }
}

export { context }
