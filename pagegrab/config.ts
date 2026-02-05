export type PagegrabConfig = {
  domain: string
  selector: string
  outputDir: string
  selectors: Record<string, string>
  force: boolean
}

type ArgMap = Map<string, string | boolean>

const DEFAULT_OUTPUT = '.storage/Seiten'

export const CONFIG_ENV = {
  domain: 'PAGEGRAB_DOMAIN',
  selector: 'PAGEGRAB_SELECTOR',
  outputDir: 'PAGEGRAB_OUTPUT',
  selectors: 'PAGEGRAB_SELECTORS',
  force: 'PAGEGRAB_FORCE'
} as const

export function loadConfig(argv: Array<string> = process.argv.slice(2)): PagegrabConfig {
  const args = parseArgs(argv)

  const domain = getStringArg(args, 'domain') ?? process.env[CONFIG_ENV.domain]
  const selector = getStringArg(args, 'selector') ?? process.env[CONFIG_ENV.selector]
  const outputDir = getStringArg(args, 'output') ?? process.env[CONFIG_ENV.outputDir] ?? DEFAULT_OUTPUT
  const selectorsRaw = getStringArg(args, 'selectors') ?? process.env[CONFIG_ENV.selectors]
  const force = getBooleanArg(args, 'force') ?? toBoolean(process.env[CONFIG_ENV.force]) ?? false

  if (!domain) {
    throw new Error('Missing domain. Provide --domain or PAGEGRAB_DOMAIN.')
  }

  if (!selector) {
    throw new Error('Missing selector. Provide --selector or PAGEGRAB_SELECTOR.')
  }

  const selectors = parseSelectors(selectorsRaw)

  return {
    domain,
    selector,
    outputDir,
    selectors,
    force
  }
}

function parseArgs(argv: Array<string>): ArgMap {
  const args: ArgMap = new Map()
  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i]
    if (!current.startsWith('--')) {
      continue
    }

    const [flag, valueFromEquals] = current.split('=')
    const key = flag.replace(/^--/, '')

    if (valueFromEquals !== undefined && valueFromEquals.length > 0) {
      args.set(key, valueFromEquals)
      continue
    }

    const next = argv[i + 1]
    if (!next || next.startsWith('--')) {
      args.set(key, true)
      continue
    }

    args.set(key, next)
    i += 1
  }

  return args
}

function getStringArg(args: ArgMap, key: string): string | undefined {
  const value = args.get(key)
  if (typeof value === 'string' && value.trim().length > 0) {
    return value
  }
  return undefined
}

function getBooleanArg(args: ArgMap, key: string): boolean | undefined {
  const value = args.get(key)
  if (typeof value === 'boolean') {
    return value
  }
  if (typeof value === 'string') {
    return toBoolean(value)
  }
  return undefined
}

function toBoolean(value: string | undefined): boolean | undefined {
  if (value === undefined) {
    return undefined
  }
  const normalized = value.toLowerCase().trim()
  if (['1', 'true', 'yes', 'y', 'on'].includes(normalized)) {
    return true
  }
  if (['0', 'false', 'no', 'n', 'off'].includes(normalized)) {
    return false
  }
  return undefined
}

function parseSelectors(raw: string | undefined): Record<string, string> {
  if (!raw) {
    return {}
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, string>
    return parsed ?? {}
  } catch (error) {
    throw new Error('Invalid selectors JSON. Provide a JSON object via --selectors or PAGEGRAB_SELECTORS.')
  }
}
