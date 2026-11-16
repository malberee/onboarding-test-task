import sharedConfig from './eslint.shared.config.js'
import frontendConfig from './frontend/eslint.frontend.config.js'

export default [...sharedConfig, ...frontendConfig]
