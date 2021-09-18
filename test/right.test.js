import assert from "assert"
import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

describe("right", () => {

	it("toHTML", () => {

		assert.strictEqual(template.toHTML("[right]Test[/right]"), `<div align="right">Test</div>`)
		assert.strictEqual(template.toHTML("[right][right][/right][/right]"), `<div align="right"><div align="right"></div></div>`)
		assert.strictEqual(template.toHTML("[right][right]Test[/right][/right]"), `<div align="right"><div align="right">Test</div></div>`)
		assert.strictEqual(template.toHTML("[right][right]Test[/right]Test[/right]"), `<div align="right"><div align="right">Test</div>Test</div>`)
		assert.strictEqual(template.toHTML("[right][right][/right][/right][right][/right]"), `<div align="right"><div align="right"></div></div><div align="right"></div>`)

	})

	it("toBBCode", () => {

		assert.strictEqual(template.toBBCode(`<div align="right">Test</div>`), "[right]Test[/right]")
		assert.strictEqual(template.toBBCode(`<div align="right"><div align="right"></div></div>`), "[right][right][/right][/right]")
		assert.strictEqual(template.toBBCode(`<div align="right"><div align="right">Test</div></div>`), "[right][right]Test[/right][/right]")
		assert.strictEqual(template.toBBCode(`<div align="right"><div align="right">Test</div>Test</div>`), "[right][right]Test[/right]Test[/right]")
		assert.strictEqual(template.toBBCode(`<div align="right"><div align="right"></div></div><div align="right"></div>`), "[right][right][/right][/right][right][/right]")

	})

})
