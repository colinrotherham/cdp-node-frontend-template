import { appConfig } from '~/src/config'
import { fetchProduct } from '~/src/app/products/helpers/fetch-product'
import { transformProductToHeadingEntities } from '~/src/app/products/transformers/transform-product-to-heading-entities'

const productController = {
  handler: async (request, h) => {
    const product = await fetchProduct(request.params?.productId)

    return h.view('products/views/product', {
      pageTitle: `${product.name} Product`,
      heading: product.name,
      product,
      headingEntities: transformProductToHeadingEntities(product),
      breadcrumbs: [
        {
          text: 'Products',
          href: `${appConfig.get('appPathPrefix')}/products`
        },
        {
          text: product.name
        }
      ]
    })
  }
}

export { productController }
