import type { PluginOption } from 'vite'
import Components from 'unplugin-vue-components/vite'
import {
  NaiveUiResolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver,
  Vuetify3Resolver,
} from 'unplugin-vue-components/resolvers'

export function VitePluginComponents(): PluginOption[] {
  return [
    Components({
      dirs: ['src/components', 'src/layouts'],
      extensions: ['vue', 'md'],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        NaiveUiResolver(),
        Vuetify3Resolver(),
        VueUseComponentsResolver(),
        VueUseDirectiveResolver(),
      ],
    }), // https://github.com/antfu/unplugin-vue-components
  ]
}
