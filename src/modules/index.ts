import type { App } from 'vue'
import { setupPinia } from './pinia'
import { setupI18n } from './i18n'
import { setupHead } from './usehead'
import { setupDirectives } from './directives'
import { setupAssets } from './assets'
import { setupVuetify } from './vuetify'
import { setupNotivue } from './notivue'

export function useModules(app: App) {
  setupPinia(app)
  setupI18n(app)
  setupHead(app)
  setupDirectives(app)
  setupVuetify(app)
  setupNotivue(app)
  setupAssets()
}
