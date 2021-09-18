import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

export function toHTML(test) {
	test.expect(5)

	test.strictEqual(template.toHTML("[right]Test[/right]"), `<div align="right">Test</div>`)
	test.strictEqual(template.toHTML("[right][right][/right][/right]"), `<div align="right"><div align="right"></div></div>`)
	test.strictEqual(template.toHTML("[right][right]Test[/right][/right]"), `<div align="right"><div align="right">Test</div></div>`)
	test.strictEqual(template.toHTML("[right][right]Test[/right]Test[/right]"), `<div align="right"><div align="right">Test</div>Test</div>`)
	test.strictEqual(template.toHTML("[right][right][/right][/right][right][/right]"), `<div align="right"><div align="right"></div></div><div align="right"></div>`)

	test.done()
}

export function toBBCode(test) {
	test.expect(5)

	test.strictEqual(template.toBBCode(`<div align="right">Test</div>`), "[right]Test[/right]")
	test.strictEqual(template.toBBCode(`<div align="right"><div align="right"></div></div>`), "[right][right][/right][/right]")
	test.strictEqual(template.toBBCode(`<div align="right"><div align="right">Test</div></div>`), "[right][right]Test[/right][/right]")
	test.strictEqual(template.toBBCode(`<div align="right"><div align="right">Test</div>Test</div>`), "[right][right]Test[/right]Test[/right]")
	test.strictEqual(template.toBBCode(`<div align="right"><div align="right"></div></div><div align="right"></div>`), "[right][right][/right][/right][right][/right]")

	test.done()
}
