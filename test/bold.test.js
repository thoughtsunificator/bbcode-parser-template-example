import assert from "assert"
import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

describe("bold", () => {

	it("toHTML", () => {

		assert.strictEqual(template.toHTML("[b]Test[/b]"), `<span style="font-weight: bold;">Test</span>`)
		assert.strictEqual(template.toHTML("[b][b][/b][/b]"), `<span style="font-weight: bold;"><span style="font-weight: bold;"></span></span>`)
		assert.strictEqual(template.toHTML("[b][b]Test[/b][/b]"), `<span style="font-weight: bold;"><span style="font-weight: bold;">Test</span></span>`)
		assert.strictEqual(template.toHTML("[b][b]Test[/b]Test[/b]"), `<span style="font-weight: bold;"><span style="font-weight: bold;">Test</span>Test</span>`)
		assert.strictEqual(template.toHTML("[b][b][/b][/b][b][/b]"), `<span style="font-weight: bold;"><span style="font-weight: bold;"></span></span><span style="font-weight: bold;"></span>`)
		assert.strictEqual(template.toHTML("[b][b][/b]1[/b]2[b][/b]"), `<span style="font-weight: bold;"><span style="font-weight: bold;"></span>1</span>2<span style="font-weight: bold;"></span>`)
		assert.strictEqual(template.toHTML("[b]1[b]2[b]3[b]4[/b]5[/b]6[/b]7[/b]8[b]9[/b]Test"), `<span style="font-weight: bold;">1<span style="font-weight: bold;">2<span style="font-weight: bold;">3<span style="font-weight: bold;">4</span>5</span>6</span>7</span>8<span style="font-weight: bold;">9</span>Test`)


	})

	it("toBBCode", () => {

		assert.strictEqual(template.toBBCode(`<span style="font-weight: bold;">Test</span>`), "[b]Test[/b]")
		assert.strictEqual(template.toBBCode(`<span style="font-weight: bold;"><span style="font-weight: bold;"></span></span>`), "[b][b][/b][/b]")
		assert.strictEqual(template.toBBCode(`<span style="font-weight: bold;"><span style="font-weight: bold;">Test</span></span>`), "[b][b]Test[/b][/b]")
		assert.strictEqual(template.toBBCode(`<span style="font-weight: bold;"><span style="font-weight: bold;">Test</span>Test</span>`), "[b][b]Test[/b]Test[/b]")
		assert.strictEqual(template.toBBCode(`<span style="font-weight: bold;"><span style="font-weight: bold;"></span></span><span style="font-weight: bold;"></span>`), "[b][b][/b][/b][b][/b]")
		assert.strictEqual(template.toBBCode(`<span style="font-weight: bold;"><span style="font-weight: bold;"></span>1</span>2<span style="font-weight: bold;"></span>`), "[b][b][/b]1[/b]2[b][/b]")


	})

})
