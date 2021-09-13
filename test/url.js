import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

export function toHTML(test) {
	test.expect(5)

	test.strictEqual(template.toHTML("[url=http://localhost]Test[/url]"), `<a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank">Test</a>`)
	test.strictEqual(template.toHTML("[url=http://localhost][url=http://localhost][/url][/url]"), `<a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"><a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"></a></a>`)
	test.strictEqual(template.toHTML("[url=http://localhost][url=http://localhost]Test[/url][/url]"), `<a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"><a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank">Test</a></a>`)
	test.strictEqual(template.toHTML("[url=http://localhost][url=http://localhost]Test[/url]Test[/url]"), `<a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"><a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank">Test</a>Test</a>`)
	test.strictEqual(template.toHTML("[url=http://localhost][url=http://localhost][/url][/url][url=http://localhost][/url]"), `<a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"><a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"></a></a><a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"></a>`)

	test.done()
}

export function toBBCode(test) {
	test.expect(5)

	test.strictEqual(template.toBBCode(`<a href="http://localhost">Test</a>`), "[url=http://localhost]Test[/url]")
	test.strictEqual(template.toBBCode(`<a href="http://localhost"><a href="http://localhost"></a></a>`), "[url=http://localhost][/url][url=http://localhost][/url]")
	test.strictEqual(template.toBBCode(`<a href="http://localhost"><a href="http://localhost">Test</a></a>`), "[url=http://localhost][/url][url=http://localhost]Test[/url]")
	test.strictEqual(template.toBBCode(`<a href="http://localhost"><a href="http://localhost">Test</a>Test</a>`), "[url=http://localhost][/url][url=http://localhost]Test[/url]Test")
	test.strictEqual(template.toBBCode(`<a href="http://localhost"><a href="http://localhost"></a></a><a href="http://localhost"></a>`), "[url=http://localhost][/url][url=http://localhost][/url][url=http://localhost][/url]")

	test.done()
}
