import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export function VitePluginAutoImport(): PluginOption[] {
  return [
    AutoImport({
      /* options */
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: [
        'vue',
        '@vueuse/core',
        '@vueuse/head',
        'pinia',
        'vue-router',
        'vue-i18n',
      ],
      dirs: ['src/hooks', 'src/composables', 'src/stores', 'src/utils'],
      vueTemplate: true,
      resolvers: [],
    }), // https://github.com/antfu/unplugin-auto-import
  ]
}
