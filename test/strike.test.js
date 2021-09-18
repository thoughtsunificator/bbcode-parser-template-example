import assert from "assert"
import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

describe("strike", () => {

	it("toHTML", () => {

		assert.strictEqual(template.toHTML("[s]Test[/s]"), `<span style="text-decoration: line-through;">Test</span>`)
		assert.strictEqual(template.toHTML("[s][s][/s][/s]"), `<span style="text-decoration: line-through;"><span style="text-decoration: line-through;"></span></span>`)
		assert.strictEqual(template.toHTML("[s][s]Test[/s][/s]"), `<span style="text-decoration: line-through;"><span style="text-decoration: line-through;">Test</span></span>`)
		assert.strictEqual(template.toHTML("[s][s]Test[/s]Test[/s]"), `<span style="text-decoration: line-through;"><span style="text-decoration: line-through;">Test</span>Test</span>`)
		assert.strictEqual(template.toHTML("[s][s][/s][/s][s][/s]"), `<span style="text-decoration: line-through;"><span style="text-decoration: line-through;"></span></span><span style="text-decoration: line-through;"></span>`)

	})

	it("toBBCode", () => {

		assert.strictEqual(template.toBBCode(`<span style="text-decoration: line-through">Test</span>`), "[s]Test[/s]")
		assert.strictEqual(template.toBBCode(`<span style="text-decoration: line-through"><span style="text-decoration: line-through"></span></span>`), "[s][s][/s][/s]")
		assert.strictEqual(template.toBBCode(`<span style="text-decoration: line-through"><span style="text-decoration: line-through">Test</span></span>`), "[s][s]Test[/s][/s]")
		assert.strictEqual(template.toBBCode(`<span style="text-decoration: line-through"><span style="text-decoration: line-through">Test</span>Test</span>`), "[s][s]Test[/s]Test[/s]")
		assert.strictEqual(template.toBBCode(`<span style="text-decoration: line-through"><span style="text-decoration: line-through"></span></span><span style="text-decoration: line-through"></span>`), "[s][s][/s][/s][s][/s]")

	})

})
