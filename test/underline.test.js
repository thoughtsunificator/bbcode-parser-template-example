import assert from "assert"
import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

describe("underline", () => {

	it("toHTML", () => {

		assert.strictEqual(template.toHTML("[u]Test[/u]"), `<span style="text-decoration: underline;">Test</span>`)
		assert.strictEqual(template.toHTML("[u][u][/u][/u]"), `<span style="text-decoration: underline;"><span style="text-decoration: underline;"></span></span>`)
		assert.strictEqual(template.toHTML("[u][u]Test[/u][/u]"), `<span style="text-decoration: underline;"><span style="text-decoration: underline;">Test</span></span>`)
		assert.strictEqual(template.toHTML("[u][u]Test[/u]Test[/u]"), `<span style="text-decoration: underline;"><span style="text-decoration: underline;">Test</span>Test</span>`)
		assert.strictEqual(template.toHTML("[u][u][/u][/u][u][/u]"), `<span style="text-decoration: underline;"><span style="text-decoration: underline;"></span></span><span style="text-decoration: underline;"></span>`)

	})

	it("toBBCode", () => {

		assert.strictEqual(template.toBBCode(`<span style="text-decoration: underline">Test</span>`), "[u]Test[/u]")
		assert.strictEqual(template.toBBCode(`<span style="text-decoration: underline"><span style="text-decoration: underline"></span></span>`), "[u][u][/u][/u]")
		assert.strictEqual(template.toBBCode(`<span style="text-decoration: underline"><span style="text-decoration: underline">Test</span></span>`), "[u][u]Test[/u][/u]")
		assert.strictEqual(template.toBBCode(`<span style="text-decoration: underline"><span style="text-decoration: underline">Test</span>Test</span>`), "[u][u]Test[/u]Test[/u]")
		assert.strictEqual(template.toBBCode(`<span style="text-decoration: underline"><span style="text-decoration: underline"></span></span><span style="text-decoration: underline"></span>`), "[u][u][/u][/u][u][/u]")

	})

})
