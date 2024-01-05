import { zip } from 'zip-a-folder'
import { readJsonFile } from 'vite-plugin-web-extension'

const pkg = readJsonFile('package.json')
async function zipDist() {
  await zip('dist', `release/${pkg.name}-${pkg.version}.zip`)
}
await zipDist()
