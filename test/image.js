import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

export function toHTML(test) {
	test.expect(3)

	test.strictEqual(template.toHTML("[img]http://localhost[/img]Test"), `<img class="userimg" src="http://localhost">Test`)
	test.strictEqual(template.toHTML("[img]http://localhost[/img][img]http://localhost[/img]Test"), `<img class="userimg" src="http://localhost"><img class="userimg" src="http://localhost">Test`)
	test.strictEqual(template.toHTML("[img]http://localhost[img]http://localhost[/img]Test[/img]"), `<img class="userimg" src="http://localhosthttp://localhostTest">`)

	test.done()
}

export function toBBCode(test) {
	test.expect(2)

	test.strictEqual(template.toBBCode(`<img class="userimg" src="http://localhost">Test`), "[img]http://localhost[/img]Test")
	test.strictEqual(template.toBBCode(`<img class="userimg" src="http://localhost"><img class="userimg" src="http://localhost">Test`), "[img]http://localhost[/img][img]http://localhost[/img]Test")

	test.done()
}
