import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

export function toHTML(test) {
	test.expect(6)

	test.strictEqual(template.toHTML("[list][*][/list]"), `<ul><li></li></ul>`)
	test.strictEqual(template.toHTML("[list=1][*][/list]"), `<ol><li></li></ol>`)
	test.strictEqual(template.toHTML("[list][*]Test[/list]"), `<ul><li>Test</li></ul>`)
	test.strictEqual(template.toHTML("[list][*]Test[*][/list]"), `<ul><li>Test</li><li></li></ul>`)
	test.strictEqual(template.toHTML("[list][*]1[*]2[*]3[*]4[/list]"), `<ul><li>1</li><li>2</li><li>3</li><li>4</li></ul>`)
	test.strictEqual(template.toHTML("[list][*]1[list][*]test[/list][*]2[*]3[*]4[/list]"), `<ul><li>1<ul><li>test</li></ul></li><li>2</li><li>3</li><li>4</li></ul>`)

	test.done()
}

export function toBBCode(test) {
	test.expect(6)

	test.strictEqual(template.toBBCode(`<ol><li></li></ol>`), "[list=1][*][/list]")
	test.strictEqual(template.toBBCode(`<ul><li></li></ul>`), "[list][*][/list]")
	test.strictEqual(template.toBBCode(`<ul><li>Test</li></ul>`), "[list][*]Test[/list]")
	test.strictEqual(template.toBBCode(`<ul><li>Test</li><li></li></ul>`), "[list][*]Test[*][/list]")
	test.strictEqual(template.toBBCode(`<ul><li>1</li><li>2</li><li>3</li><li>4</li></ul>`), "[list][*]1[*]2[*]3[*]4[/list]")
	test.strictEqual(template.toBBCode(`<ul><li>1<ul><li>test</li></ul></li><li>2</li><li>3</li><li>4</li></ul>`), "[list][*]1[list][*]test[/list][*]2[*]3[*]4[/list]")

	test.done()
}
