import path, { resolve } from 'node:path'
import { defineConfig } from 'vite'
import browserExtension from 'vite-plugin-web-extension'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Icons from 'unplugin-icons/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import DefineOptions from 'unplugin-vue-define-options/dist/vite'

function root(...paths: string[]): string {
  return path.resolve(__dirname, ...paths)
}

export default defineConfig(({ command, mode }) => {
  return {
    build: {
      outDir: root('dist'),
      emptyOutDir: true,
    },
    plugins: [
      DefineOptions(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      vue(),
      Icons({ compiler: 'vue3' }),
      // https://github.com/antfu/unplugin-auto-import
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
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
        dirs: ['src/hooks', 'src/composables', 'src/stores', 'src/utils'],
        dts: 'src/typings/auto-import.d.ts',
        vueTemplate: true,
      }),
      // https://github.com/antfu/unplugin-vue-components
      Components({
        dirs: ['src/components', 'src/layouts'],
        extensions: ['vue', 'md'],
        deep: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/typings/components.d.ts',
        resolvers: [NaiveUiResolver()],
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),
      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: resolve(__dirname, './src/locales/**'),
      }),
      browserExtension({
        manifest: 'src/manifest.json',
        browser: process.env.TARGET ?? 'chrome',
      }),
    ],
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'), // 路径别名
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
    },
  }
})
