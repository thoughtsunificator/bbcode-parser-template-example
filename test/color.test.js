import assert from "assert"
import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

describe("color", () => {

	it("toHTML", () => {

		assert.strictEqual(template.toHTML("[color=#FFFFFF]Test[/color]"), `<span style="color: rgb(255, 255, 255);">Test</span>`)
		assert.strictEqual(template.toHTML("[color=#FFFFFF][color=#000000][/color][/color]"), `<span style="color: rgb(255, 255, 255);"><span style="color: rgb(0, 0, 0);"></span></span>`)
		assert.strictEqual(template.toHTML("[color=#FFFFFF][color=#000000]Test[/color][/color]"), `<span style="color: rgb(255, 255, 255);"><span style="color: rgb(0, 0, 0);">Test</span></span>`)
		assert.strictEqual(template.toHTML("[color=#FFFFFF][color=#000000]Test[/color]Test[/color]"), `<span style="color: rgb(255, 255, 255);"><span style="color: rgb(0, 0, 0);">Test</span>Test</span>`)
		assert.strictEqual(template.toHTML("[color=#000000][color=#FFFFFF][/color][/color][color=#FFFFFF][/color]"), `<span style="color: rgb(0, 0, 0);"><span style="color: rgb(255, 255, 255);"></span></span><span style="color: rgb(255, 255, 255);"></span>`)

	})

	it("toBBCode", () => {

		assert.strictEqual(template.toBBCode(`<span style="color: #FFFFFF">Test</span>`), "[color=#FFFFFF]Test[/color]")
		assert.strictEqual(template.toBBCode(`<span style="color: #FFFFFF"><span style="color: #000000"></span></span>`), "[color=#FFFFFF][color=#000000][/color][/color]")
		assert.strictEqual(template.toBBCode(`<span style="color: #FFFFFF"><span style="color: #000000">Test</span></span>`), "[color=#FFFFFF][color=#000000]Test[/color][/color]")
		assert.strictEqual(template.toBBCode(`<span style="color: #FFFFFF"><span style="color: #000000">Test</span>Test</span>`), "[color=#FFFFFF][color=#000000]Test[/color]Test[/color]")
		assert.strictEqual(template.toBBCode(`<span style="color: #FFFFFF"><span style="color: #000000"></span></span><span style="color: #FFFFFF"></span>`), "[color=#FFFFFF][color=#000000][/color][/color][color=#FFFFFF][/color]")

	})

})
