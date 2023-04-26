import {
  productController,
  productsListController
} from '~/src/app/products/controllers'

const products = {
  plugin: {
    name: 'products',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/products',
          ...productsListController
        },
        {
          method: 'GET',
          path: '/products/{productId}',
          ...productController
        }
      ])
    }
  }
}

export { products }
