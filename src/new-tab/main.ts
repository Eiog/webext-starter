import { createApp } from 'vue'
import NewTab from './NewTab.vue'
import '~/assets/index'

// eslint-disable-next-line no-console
console.log('Loaded popup/main.ts')

createApp(NewTab).mount('#app')
