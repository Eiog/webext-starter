import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import browserExtension, { readJsonFile } from 'vite-plugin-web-extension'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import WebfontDownload from 'vite-plugin-webfont-dl'
import postcssPresetEnv from 'postcss-preset-env'
import VueDevTools from 'vite-plugin-vue-devtools'
import { VitePluginAutoImport, VitePluginComponents, VitePluginI18n } from './config'

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      VueDevTools(), // https://devtools-next.vuejs.org/
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      vue({
        script: {
          defineModel: true,
        },
        include: [/\.vue$/, /\.md$/],
      }),
      vueJsx(),
      WebfontDownload(),
      Icons({ compiler: 'vue3' }),

      Unocss(), // https://github.com/antfu/unocss
      ...VitePluginAutoImport(),
      ...VitePluginComponents(),
      ...VitePluginI18n(),
      browserExtension({
        manifest: () => {
          const pkg = readJsonFile('package.json')
          const template = readJsonFile('src/manifest.json')
          return {
            ...template,
            name: pkg.name,
            version: pkg.version,
            description: pkg.description,
          }
        },
        browser: process.env.TARGET ?? 'chrome',
      }),
    ],
    build: {
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'), // 路径别名
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        scopeBehaviour: 'local',
      },
      postcss: {
        plugins: [
          postcssPresetEnv(),
        ],
      },
    },
  }
})
