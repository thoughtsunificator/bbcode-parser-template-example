import assert from "assert"
import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

describe("center", () => {

	it("toHTML", () => {

		assert.strictEqual(template.toHTML("[center]Test[/center]"), `<div align="center">Test</div>`)
		assert.strictEqual(template.toHTML("[center][center][/center][/center]"), `<div align="center"><div align="center"></div></div>`)
		assert.strictEqual(template.toHTML("[center][center]Test[/center][/center]"), `<div align="center"><div align="center">Test</div></div>`)
		assert.strictEqual(template.toHTML("[center][center]Test[/center]Test[/center]"), `<div align="center"><div align="center">Test</div>Test</div>`)
		assert.strictEqual(template.toHTML("[center][center][/center][/center][center][/center]"), `<div align="center"><div align="center"></div></div><div align="center"></div>`)

	})

	it("toBBCode", () => {

		assert.strictEqual(template.toBBCode(`<div align="center">Test</div>`), "[center]Test[/center]")
		assert.strictEqual(template.toBBCode(`<div align="center"><div align="center"></div></div>`), "[center][center][/center][/center]")
		assert.strictEqual(template.toBBCode(`<div align="center"><div align="center">Test</div></div>`), "[center][center]Test[/center][/center]")
		assert.strictEqual(template.toBBCode(`<div align="center"><div align="center">Test</div>Test</div>`), "[center][center]Test[/center]Test[/center]")
		assert.strictEqual(template.toBBCode(`<div align="center"><div align="center"></div></div><div align="center"></div>`), "[center][center][/center][/center][center][/center]")

	})

})
