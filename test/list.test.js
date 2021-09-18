import assert from "assert"
import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

describe("list", () => {

	it("toHTML", () => {

		assert.strictEqual(template.toHTML("[list]Test[/list]"), `<ul>Test</ul>`)
		assert.strictEqual(template.toHTML("[list=1]Test[/list]"), `<ol>Test</ol>`)
		assert.strictEqual(template.toHTML("[list][list][/list][/list]"), `<ul><ul></ul></ul>`)
		assert.strictEqual(template.toHTML("[list][list]Test[/list][/list]"), `<ul><ul>Test</ul></ul>`)
		assert.strictEqual(template.toHTML("[list][list]Test[/list]Test[/list]"), `<ul><ul>Test</ul>Test</ul>`)
		assert.strictEqual(template.toHTML("[list][list][/list][/list][list][/list]"), `<ul><ul></ul></ul><ul></ul>`)

	})

	it("toBBCode", () => {

		assert.strictEqual(template.toBBCode(`<ul>Test</ul>`), "[list]Test[/list]")
		assert.strictEqual(template.toBBCode(`<ol>Test</ol>`), "[list=1]Test[/list]")
		assert.strictEqual(template.toBBCode(`<ul><ul></ul></ul>`), "[list][list][/list][/list]")
		assert.strictEqual(template.toBBCode(`<ul><ul>Test</ul></ul>`), "[list][list]Test[/list][/list]")
		assert.strictEqual(template.toBBCode(`<ul><ul>Test</ul>Test</ul>`), "[list][list]Test[/list]Test[/list]")
		assert.strictEqual(template.toBBCode(`<ul><ul></ul></ul><ul></ul>`), "[list][list][/list][/list][list][/list]")

	})

})
