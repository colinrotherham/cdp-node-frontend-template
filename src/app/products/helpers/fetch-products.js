import fetch from 'node-fetch'
import { appConfig } from '~/src/config'
import { createLogger } from '~/src/common/helpers/logger'

async function fetchProducts() {
  const logger = createLogger()
  const productsEndpointUrl = `${appConfig.get('apiUrl')}/products`

  try {
    const response = await fetch(productsEndpointUrl)
    const products = await response.json()

    return products
  } catch (error) {
    logger.error(error)
    return []
  }
}

export { fetchProducts }
