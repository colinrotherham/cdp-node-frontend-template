import inert from '@hapi/inert'
import { health } from '~/src/app/health'
import { home } from '~/src/app/home'
import { products } from '~/src/app/products'
import { serveStaticFiles } from '~/src/common/helpers/serve-static-files'

const router = {
  plugin: {
    name: 'router',
    register: async (server) => {
      await server.register([inert])
      await server.register([health, home, products, serveStaticFiles])
    }
  }
}

export { router }
