import { breakpoints } from './breakpoints'
import { light } from './colors'
import { radius } from './radius'
import { spacing } from './spacing'
import { typography } from './typography'

export const theme = {
  colors: light,
  spacing,
  radius,
  typography,
  breakpoints,
} as const

export type AppTheme = typeof theme
