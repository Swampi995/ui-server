const logger = require('../lib/logger')

logger.info('Starting server...')
require('../../server/main').listen(8888, () => {
  logger.success('Server is running at http://localhost:8888')
})
