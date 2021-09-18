import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

export function toHTML(test) {
	test.expect(5)

	test.strictEqual(template.toHTML("[u]Test[/u]"), `<span style="text-decoration: underline;">Test</span>`)
	test.strictEqual(template.toHTML("[u][u][/u][/u]"), `<span style="text-decoration: underline;"><span style="text-decoration: underline;"></span></span>`)
	test.strictEqual(template.toHTML("[u][u]Test[/u][/u]"), `<span style="text-decoration: underline;"><span style="text-decoration: underline;">Test</span></span>`)
	test.strictEqual(template.toHTML("[u][u]Test[/u]Test[/u]"), `<span style="text-decoration: underline;"><span style="text-decoration: underline;">Test</span>Test</span>`)
	test.strictEqual(template.toHTML("[u][u][/u][/u][u][/u]"), `<span style="text-decoration: underline;"><span style="text-decoration: underline;"></span></span><span style="text-decoration: underline;"></span>`)

	test.done()
}

export function toBBCode(test) {
	test.expect(5)

	test.strictEqual(template.toBBCode(`<span style="text-decoration: underline">Test</span>`), "[u]Test[/u]")
	test.strictEqual(template.toBBCode(`<span style="text-decoration: underline"><span style="text-decoration: underline"></span></span>`), "[u][u][/u][/u]")
	test.strictEqual(template.toBBCode(`<span style="text-decoration: underline"><span style="text-decoration: underline">Test</span></span>`), "[u][u]Test[/u][/u]")
	test.strictEqual(template.toBBCode(`<span style="text-decoration: underline"><span style="text-decoration: underline">Test</span>Test</span>`), "[u][u]Test[/u]Test[/u]")
	test.strictEqual(template.toBBCode(`<span style="text-decoration: underline"><span style="text-decoration: underline"></span></span><span style="text-decoration: underline"></span>`), "[u][u][/u][/u][u][/u]")

	test.done()
}
