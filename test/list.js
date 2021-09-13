import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

export function toHTML(test) {
	test.expect(6)

	test.strictEqual(template.toHTML("[list]Test[/list]"), `<ul>Test</ul>`)
	test.strictEqual(template.toHTML("[list=1]Test[/list]"), `<ol>Test</ol>`)
	test.strictEqual(template.toHTML("[list][list][/list][/list]"), `<ul><ul></ul></ul>`)
	test.strictEqual(template.toHTML("[list][list]Test[/list][/list]"), `<ul><ul>Test</ul></ul>`)
	test.strictEqual(template.toHTML("[list][list]Test[/list]Test[/list]"), `<ul><ul>Test</ul>Test</ul>`)
	test.strictEqual(template.toHTML("[list][list][/list][/list][list][/list]"), `<ul><ul></ul></ul><ul></ul>`)

	test.done()
}

export function toBBCode(test) {
	test.expect(6)

	test.strictEqual(template.toBBCode(`<ul>Test</ul>`), "[list]Test[/list]")
	test.strictEqual(template.toBBCode(`<ol>Test</ol>`), "[list=1]Test[/list]")
	test.strictEqual(template.toBBCode(`<ul><ul></ul></ul>`), "[list][list][/list][/list]")
	test.strictEqual(template.toBBCode(`<ul><ul>Test</ul></ul>`), "[list][list]Test[/list][/list]")
	test.strictEqual(template.toBBCode(`<ul><ul>Test</ul>Test</ul>`), "[list][list]Test[/list]Test[/list]")
	test.strictEqual(template.toBBCode(`<ul><ul></ul></ul><ul></ul>`), "[list][list][/list][/list][list][/list]")

	test.done()
}
