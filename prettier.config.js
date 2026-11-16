export default {
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'auto',
  importOrderSeparation: true,
  importOrderSortSpecifiers: false,
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/', '^[./]'],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
}
