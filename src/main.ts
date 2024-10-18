import { CodeblockPostProcessor, I18n, Plugin } from '@typora-community-plugin/core'
import { File, editor } from "typora"


export default class extends Plugin {

  i18n = new I18n({
    resources: {
      'en': { buttonCopy: 'Copy' },
      'zh-cn': { buttonCopy: '复制' },
    }
  })

  onload() {
    this.registerMarkdownPostProcessor(
      CodeblockPostProcessor.from({
        button: {
          text: '<span class="fa fa-clipboard"></span>',
          title: this.i18n.t.buttonCopy,
          onclick(event, { codeblock, code }) {
            const normalizedCode = code.replace(/\r?\n/g, File.isWin ? '\r\n' : '\n')
            const escapedCode = normalizedCode
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;")
            const html = `<pre lang="${codeblock.getAttribute('lang')}">${escapedCode}</pre>`
            editor.UserOp.setClipboard(html, null, normalizedCode, true)
          },
        }
      }))
  }
}
