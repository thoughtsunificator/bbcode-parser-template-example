import assert from "assert"
import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

describe("url", () => {

	it("toHTML", () => {

		assert.strictEqual(template.toHTML("[url=http://localhost]Test[/url]"), `<a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank">Test</a>`)
		assert.strictEqual(template.toHTML("[url=http://localhost][url=http://localhost][/url][/url]"), `<a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"><a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"></a></a>`)
		assert.strictEqual(template.toHTML("[url=http://localhost][url=http://localhost]Test[/url][/url]"), `<a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"><a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank">Test</a></a>`)
		assert.strictEqual(template.toHTML("[url=http://localhost][url=http://localhost]Test[/url]Test[/url]"), `<a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"><a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank">Test</a>Test</a>`)
		assert.strictEqual(template.toHTML("[url=http://localhost][url=http://localhost][/url][/url][url=http://localhost][/url]"), `<a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"><a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"></a></a><a href="http://localhost" rel="nofollow noopener noreferrer" target="_blank"></a>`)

	})

	it("toBBCode", () => {

		assert.strictEqual(template.toBBCode(`<a href="http://localhost">Test</a>`), "[url=http://localhost]Test[/url]")
		assert.strictEqual(template.toBBCode(`<a href="http://localhost"><a href="http://localhost"></a></a>`), "[url=http://localhost][/url][url=http://localhost][/url]")
		assert.strictEqual(template.toBBCode(`<a href="http://localhost"><a href="http://localhost">Test</a></a>`), "[url=http://localhost][/url][url=http://localhost]Test[/url]")
		assert.strictEqual(template.toBBCode(`<a href="http://localhost"><a href="http://localhost">Test</a>Test</a>`), "[url=http://localhost][/url][url=http://localhost]Test[/url]Test")
		assert.strictEqual(template.toBBCode(`<a href="http://localhost"><a href="http://localhost"></a></a><a href="http://localhost"></a>`), "[url=http://localhost][/url][url=http://localhost][/url][url=http://localhost][/url]")

	})

})
