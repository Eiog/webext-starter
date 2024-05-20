import type { App } from 'vue'

import { directive } from './directives'
import { i18n } from './i18n'
import { notivue } from './notivue'
import { pinia } from './pinia'

export * from './directives'
export * from './i18n'
export * from './notivue'
export * from './pinia'
export function useModules(app: App) {
  app
    .use(directive)
    .use(i18n)
    .use(notivue)
    .use(pinia)
}
