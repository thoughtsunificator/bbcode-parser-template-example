import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

export function toHTML(test) {
	test.expect(5)

	test.strictEqual(template.toHTML("[i]Test[/i]"), `<span style="font-style: italic;">Test</span>`)
	test.strictEqual(template.toHTML("[i][i][/i][/i]"), `<span style="font-style: italic;"><span style="font-style: italic;"></span></span>`)
	test.strictEqual(template.toHTML("[i][i]Test[/i][/i]"), `<span style="font-style: italic;"><span style="font-style: italic;">Test</span></span>`)
	test.strictEqual(template.toHTML("[i][i]Test[/i]Test[/i]"), `<span style="font-style: italic;"><span style="font-style: italic;">Test</span>Test</span>`)
	test.strictEqual(template.toHTML("[i][i][/i][/i][i][/i]"), `<span style="font-style: italic;"><span style="font-style: italic;"></span></span><span style="font-style: italic;"></span>`)

	test.done()
}

export function toBBCode(test) {
	test.expect(5)

	test.strictEqual(template.toBBCode(`<span style="font-style: italic">Test</span>`), "[i]Test[/i]")
	test.strictEqual(template.toBBCode(`<span style="font-style: italic"><span style="font-style: italic"></span></span>`), "[i][i][/i][/i]")
	test.strictEqual(template.toBBCode(`<span style="font-style: italic"><span style="font-style: italic">Test</span></span>`), "[i][i]Test[/i][/i]")
	test.strictEqual(template.toBBCode(`<span style="font-style: italic"><span style="font-style: italic">Test</span>Test</span>`), "[i][i]Test[/i]Test[/i]")
	test.strictEqual(template.toBBCode(`<span style="font-style: italic"><span style="font-style: italic"></span></span><span style="font-style: italic"></span>`), "[i][i][/i][/i][i][/i]")

	test.done()
}
