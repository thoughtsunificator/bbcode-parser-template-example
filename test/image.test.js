import assert from "assert"
import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

describe("image", () => {

	it("toHTML", () => {

		assert.strictEqual(template.toHTML("[img]http://localhost[/img]Test"), `<img class="userimg" src="http://localhost">Test`)
		assert.strictEqual(template.toHTML("[img]http://localhost[/img][img]http://localhost[/img]Test"), `<img class="userimg" src="http://localhost"><img class="userimg" src="http://localhost">Test`)
		assert.strictEqual(template.toHTML("[img]http://localhost[img]http://localhost[/img]Test[/img]"), `<img class="userimg" src="http://localhosthttp://localhostTest">`)

	})

	it("toBBCode", () => {

		assert.strictEqual(template.toBBCode(`<img class="userimg" src="http://localhost">Test`), "[img]http://localhost[/img]Test")
		assert.strictEqual(template.toBBCode(`<img class="userimg" src="http://localhost"><img class="userimg" src="http://localhost">Test`), "[img]http://localhost[/img][img]http://localhost[/img]Test")

	})

})
