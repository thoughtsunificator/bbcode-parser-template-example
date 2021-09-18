import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

export function toHTML(test) {
	test.expect(6)

	const said = nick => `<strong>${nick} said:</strong><br>`

	test.strictEqual(template.toHTML("[quote]Test[/quote]"), `<div class="quotetext">Test</div>`)
	test.strictEqual(template.toHTML("[quote=nickname]Test[/quote]"), `<div class="quotetext">${said("nickname")}Test</div>`)
	test.strictEqual(template.toHTML("[quote]1[quote][/quote][/quote]"), `<div class="quotetext">1<div class="quotetext"></div></div>`)
	test.strictEqual(template.toHTML("[quote]1[quote]2[/quote][/quote]"), `<div class="quotetext">1<div class="quotetext">2</div></div>`)
	test.strictEqual(template.toHTML("[quote]1[quote=nick]2[/quote]3[/quote]"), `<div class="quotetext">1<div class="quotetext">${said("nick")}2</div>3</div>`)
	test.strictEqual(template.toHTML("[quote]1[quote]2[/quote][/quote][quote][/quote]"), `<div class="quotetext">1<div class="quotetext">2</div></div><div class="quotetext"></div>`)

	test.done()
}

export function toBBCode(test) {
	test.expect(8)

	const said = nick => `<strong>${nick} said:</strong><br>`

	test.strictEqual(template.toBBCode(`<div class="quotetext">Test</div>`), "[quote]Test[/quote]")
	test.strictEqual(template.toBBCode(`<div class="quotetext">${said("nickname")}Test</div>`), "[quote=nickname]Test[/quote]")
	test.strictEqual(template.toBBCode(`<div class="quotetext">1<div class="quotetext"></div></div>`), "[quote]1[quote][/quote][/quote]")
	test.strictEqual(template.toBBCode(`<div class="quotetext">1<div class="quotetext">2</div></div>`), "[quote]1[quote]2[/quote][/quote]")
	test.strictEqual(template.toBBCode(`<div class="quotetext">1<div class="quotetext">${said("nick")}2</div>3</div>`), "[quote]1[quote=nick]2[/quote]3[/quote]")
	test.strictEqual(template.toBBCode(`<div class="quotetext">1<div class="quotetext">2</div></div><div class="quotetext"></div>`), "[quote]1[quote]2[/quote][/quote][quote][/quote]")
	test.strictEqual(template.toBBCode(`<div class="quotetext">1<div class="quotetext">2<div class="quotetext">3<div class="quotetext">4</div>5</div>6</div>7</div>8<div class="quotetext">9</div>Test`), "[quote]1[quote]2[quote]3[quote]4[/quote]5[/quote]6[/quote]7[/quote]8[quote]9[/quote]Test")
	test.strictEqual(template.toBBCode(`<div class="quotetext">1<div class="quotetext">${said("test")}2<div class="quotetext">3<div class="quotetext">4</div>5</div>6</div>7</div>8<div class="quotetext">9</div>Test`), "[quote]1[quote=test]2[quote]3[quote]4[/quote]5[/quote]6[/quote]7[/quote]8[quote]9[/quote]Test")

	test.done()
}
