import fetch from 'node-fetch'
import { appConfig } from '~/src/config'
import { createLogger } from '~/src/common/helpers/logger'

async function fetchProduct(productId) {
  const logger = createLogger()
  const productEndpointUrl = `${appConfig.get('apiUrl')}/products/${productId}`

  try {
    const response = await fetch(productEndpointUrl)
    return await response.json()
  } catch (error) {
    logger.error(error)
    return []
  }
}

export { fetchProduct }
