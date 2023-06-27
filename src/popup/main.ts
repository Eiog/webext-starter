/* JS files and framework components are HMR-ed */

import { createApp } from 'vue'
import App from './App.vue'
import '~/assets'

// eslint-disable-next-line no-console
console.log('Loaded  App/main.ts')

createApp(App).mount('#app')
