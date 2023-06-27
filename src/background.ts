import browser from 'webextension-polyfill'
import 'uno.css'

browser.runtime.onInstalled.addListener(() => {
  // eslint-disable-next-line no-console
  console.log('Installed!')
})
