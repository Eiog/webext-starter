import browser from 'webextension-polyfill'
import 'uno.css'

browser.runtime.onInstalled.addListener(() => {
  console.log('Installed!')
})
