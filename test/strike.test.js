import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

export function toHTML(test) {
	test.expect(5)

	test.strictEqual(template.toHTML("[s]Test[/s]"), `<span style="text-decoration: line-through;">Test</span>`)
	test.strictEqual(template.toHTML("[s][s][/s][/s]"), `<span style="text-decoration: line-through;"><span style="text-decoration: line-through;"></span></span>`)
	test.strictEqual(template.toHTML("[s][s]Test[/s][/s]"), `<span style="text-decoration: line-through;"><span style="text-decoration: line-through;">Test</span></span>`)
	test.strictEqual(template.toHTML("[s][s]Test[/s]Test[/s]"), `<span style="text-decoration: line-through;"><span style="text-decoration: line-through;">Test</span>Test</span>`)
	test.strictEqual(template.toHTML("[s][s][/s][/s][s][/s]"), `<span style="text-decoration: line-through;"><span style="text-decoration: line-through;"></span></span><span style="text-decoration: line-through;"></span>`)

	test.done()
}

export function toBBCode(test) {
	test.expect(5)

	test.strictEqual(template.toBBCode(`<span style="text-decoration: line-through">Test</span>`), "[s]Test[/s]")
	test.strictEqual(template.toBBCode(`<span style="text-decoration: line-through"><span style="text-decoration: line-through"></span></span>`), "[s][s][/s][/s]")
	test.strictEqual(template.toBBCode(`<span style="text-decoration: line-through"><span style="text-decoration: line-through">Test</span></span>`), "[s][s]Test[/s][/s]")
	test.strictEqual(template.toBBCode(`<span style="text-decoration: line-through"><span style="text-decoration: line-through">Test</span>Test</span>`), "[s][s]Test[/s]Test[/s]")
	test.strictEqual(template.toBBCode(`<span style="text-decoration: line-through"><span style="text-decoration: line-through"></span></span><span style="text-decoration: line-through"></span>`), "[s][s][/s][/s][s][/s]")

	test.done()
}
