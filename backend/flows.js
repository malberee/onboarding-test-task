export const DEFAULT_FLOW = 'default'

export const FLOWS = {
  default: ['phone', 'email', 'quiz_single', 'quiz_multi', 'checkout', 'success'],
  short: ['phone', 'email', 'checkout', 'success'],
  experimental: ['phone', 'quiz_single', 'email', 'promo', 'quiz_multi', 'checkout', 'success'],
}

export const findFlow = (name) => (Object.hasOwn(FLOWS, name) ? FLOWS[name] : undefined)
