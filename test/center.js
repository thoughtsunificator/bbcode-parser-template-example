import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

export function toHTML(test) {
	test.expect(5)

	test.strictEqual(template.toHTML("[center]Test[/center]"), `<div align="center">Test</div>`)
	test.strictEqual(template.toHTML("[center][center][/center][/center]"), `<div align="center"><div align="center"></div></div>`)
	test.strictEqual(template.toHTML("[center][center]Test[/center][/center]"), `<div align="center"><div align="center">Test</div></div>`)
	test.strictEqual(template.toHTML("[center][center]Test[/center]Test[/center]"), `<div align="center"><div align="center">Test</div>Test</div>`)
	test.strictEqual(template.toHTML("[center][center][/center][/center][center][/center]"), `<div align="center"><div align="center"></div></div><div align="center"></div>`)

	test.done()
}

export function toBBCode(test) {
	test.expect(5)

	test.strictEqual(template.toBBCode(`<div align="center">Test</div>`), "[center]Test[/center]")
	test.strictEqual(template.toBBCode(`<div align="center"><div align="center"></div></div>`), "[center][center][/center][/center]")
	test.strictEqual(template.toBBCode(`<div align="center"><div align="center">Test</div></div>`), "[center][center]Test[/center][/center]")
	test.strictEqual(template.toBBCode(`<div align="center"><div align="center">Test</div>Test</div>`), "[center][center]Test[/center]Test[/center]")
	test.strictEqual(template.toBBCode(`<div align="center"><div align="center"></div></div><div align="center"></div>`), "[center][center][/center][/center][center][/center]")

	test.done()
}
