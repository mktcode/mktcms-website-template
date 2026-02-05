import { navItems } from './navItems'
import { loadConfig } from './config'
import { grabFromNavItems } from './traverse'

const config = loadConfig()

const stats = await grabFromNavItems(navItems, config)

console.log(
  `[pagegrab] processed=${stats.processed} written=${stats.written} skipped=${stats.skipped} failed=${stats.failed}`
)
