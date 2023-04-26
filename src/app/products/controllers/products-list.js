import { sortByTimestamp } from '~/src/common/helpers/sort-by-timestamp'
import { fetchProducts } from '~/src/app/products/helpers/fetch-products'
import { transformProductToEntityRow } from '~/src/app/products/transformers/transform-product-to-entity-row'

const productsListController = {
  handler: async (request, h) => {
    const products = await fetchProducts()
    const entityRows = products
      .sort(sortByTimestamp())
      .map(transformProductToEntityRow)

    return h.view('products/views/list', {
      pageTitle: 'Products',
      heading: 'Products',
      entityRows
    })
  }
}

export { productsListController }
