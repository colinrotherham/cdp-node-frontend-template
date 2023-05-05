import { createLogger } from '~/src/common/helpers/logger'

function catchAll(request, h) {
  const logger = createLogger()
  const { response } = request

  if (!response.isBoom) {
    return h.continue
  }

  const statusCode = response.output.statusCode

  logger.error(response.message, statusCode)

  return h
    .view('error/index', {
      heading: statusCode,
      message: statusCode === 404 ? 'Page not found' : 'Something went wrong'
    })
    .code(statusCode)
}

export { catchAll }
