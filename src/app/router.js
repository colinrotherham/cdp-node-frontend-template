import inert from '@hapi/inert'
import { health } from '~/src/app/health'
import { home } from '~/src/app/home'
import { serveStaticFiles } from '~/src/common/helpers/serve-static-files'

const router = {
  plugin: {
    name: 'router',
    register: async (server) => {
      await server.register([inert])
      await server.register([health, home, serveStaticFiles])
    }
  }
}

export { router }
