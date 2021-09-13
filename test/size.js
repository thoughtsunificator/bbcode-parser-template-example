import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

export function toHTML(test) {
	test.expect(5)

	test.strictEqual(template.toHTML("[size=20]Test[/size]"), `<span style="font-size: 20%;">Test</span>`)
	test.strictEqual(template.toHTML("[size=20][size=50][/size][/size]"), `<span style="font-size: 20%;"><span style="font-size: 50%;"></span></span>`)
	test.strictEqual(template.toHTML("[size=20][size=50]Test[/size][/size]"), `<span style="font-size: 20%;"><span style="font-size: 50%;">Test</span></span>`)
	test.strictEqual(template.toHTML("[size=20][size=50]Test[/size]Test[/size]"), `<span style="font-size: 20%;"><span style="font-size: 50%;">Test</span>Test</span>`)
	test.strictEqual(template.toHTML("[size=20][size=50][/size][/size][size=20][/size]"), `<span style="font-size: 20%;"><span style="font-size: 50%;"></span></span><span style="font-size: 20%;"></span>`)

	test.done()
}

export function toBBCode(test) {
	test.expect(5)

	test.strictEqual(template.toBBCode(`<span style="font-size: 20%">Test</span>`), "[size=20]Test[/size]")
	test.strictEqual(template.toBBCode(`<span style="font-size: 20%"><span style="font-size: 50%"></span></span>`), "[size=20][size=50][/size][/size]")
	test.strictEqual(template.toBBCode(`<span style="font-size: 20%"><span style="font-size: 50%">Test</span></span>`), "[size=20][size=50]Test[/size][/size]")
	test.strictEqual(template.toBBCode(`<span style="font-size: 20%"><span style="font-size: 50%">Test</span>Test</span>`), "[size=20][size=50]Test[/size]Test[/size]")
	test.strictEqual(template.toBBCode(`<span style="font-size: 20%"><span style="font-size: 50%"></span></span><span style="font-size: 20%"></span>`), "[size=20][size=50][/size][/size][size=20][/size]")

	test.done()
}
