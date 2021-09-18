import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

export function toHTML(test) {
	test.expect(1)

	test.strictEqual(template.toHTML("[code][b][/b][s][/s][code]tesdsadt[/code][/code]"), `<div class="codetext"><pre>[b][/b][s][/s][code]tesdsadt[/code]</pre></div>`)

	test.done()
}

export function toBBCode(test) {
	test.expect(1)

	test.strictEqual(template.toBBCode(`<div class="codetext"><pre>[b][/b][s][/s][code]tesdsadt[/code]</pre></div>`), "[code][b][/b][s][/s][code]tesdsadt[/code][/code]")

	test.done()
}
