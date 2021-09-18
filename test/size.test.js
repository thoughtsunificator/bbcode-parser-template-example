import assert from "assert"
import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

describe("size", () => {

	it("toHTML", () => {

		assert.strictEqual(template.toHTML("[size=20]Test[/size]"), `<span style="font-size: 20%;">Test</span>`)
		assert.strictEqual(template.toHTML("[size=20][size=50][/size][/size]"), `<span style="font-size: 20%;"><span style="font-size: 50%;"></span></span>`)
		assert.strictEqual(template.toHTML("[size=20][size=50]Test[/size][/size]"), `<span style="font-size: 20%;"><span style="font-size: 50%;">Test</span></span>`)
		assert.strictEqual(template.toHTML("[size=20][size=50]Test[/size]Test[/size]"), `<span style="font-size: 20%;"><span style="font-size: 50%;">Test</span>Test</span>`)
		assert.strictEqual(template.toHTML("[size=20][size=50][/size][/size][size=20][/size]"), `<span style="font-size: 20%;"><span style="font-size: 50%;"></span></span><span style="font-size: 20%;"></span>`)

	})

	it("toBBCode", () => {

		assert.strictEqual(template.toBBCode(`<span style="font-size: 20%">Test</span>`), "[size=20]Test[/size]")
		assert.strictEqual(template.toBBCode(`<span style="font-size: 20%"><span style="font-size: 50%"></span></span>`), "[size=20][size=50][/size][/size]")
		assert.strictEqual(template.toBBCode(`<span style="font-size: 20%"><span style="font-size: 50%">Test</span></span>`), "[size=20][size=50]Test[/size][/size]")
		assert.strictEqual(template.toBBCode(`<span style="font-size: 20%"><span style="font-size: 50%">Test</span>Test</span>`), "[size=20][size=50]Test[/size]Test[/size]")
		assert.strictEqual(template.toBBCode(`<span style="font-size: 20%"><span style="font-size: 50%"></span></span><span style="font-size: 20%"></span>`), "[size=20][size=50][/size][/size][size=20][/size]")

	})

})
