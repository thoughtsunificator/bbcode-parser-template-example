import assert from "assert"
import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

describe("italic", () => {

	it("toHTML", () => {

		assert.strictEqual(template.toHTML("[i]Test[/i]"), `<span style="font-style: italic;">Test</span>`)
		assert.strictEqual(template.toHTML("[i][i][/i][/i]"), `<span style="font-style: italic;"><span style="font-style: italic;"></span></span>`)
		assert.strictEqual(template.toHTML("[i][i]Test[/i][/i]"), `<span style="font-style: italic;"><span style="font-style: italic;">Test</span></span>`)
		assert.strictEqual(template.toHTML("[i][i]Test[/i]Test[/i]"), `<span style="font-style: italic;"><span style="font-style: italic;">Test</span>Test</span>`)
		assert.strictEqual(template.toHTML("[i][i][/i][/i][i][/i]"), `<span style="font-style: italic;"><span style="font-style: italic;"></span></span><span style="font-style: italic;"></span>`)

	})

	it("toBBCode", () => {

		assert.strictEqual(template.toBBCode(`<span style="font-style: italic">Test</span>`), "[i]Test[/i]")
		assert.strictEqual(template.toBBCode(`<span style="font-style: italic"><span style="font-style: italic"></span></span>`), "[i][i][/i][/i]")
		assert.strictEqual(template.toBBCode(`<span style="font-style: italic"><span style="font-style: italic">Test</span></span>`), "[i][i]Test[/i][/i]")
		assert.strictEqual(template.toBBCode(`<span style="font-style: italic"><span style="font-style: italic">Test</span>Test</span>`), "[i][i]Test[/i]Test[/i]")
		assert.strictEqual(template.toBBCode(`<span style="font-style: italic"><span style="font-style: italic"></span></span><span style="font-style: italic"></span>`), "[i][i][/i][/i][i][/i]")

	})

})
