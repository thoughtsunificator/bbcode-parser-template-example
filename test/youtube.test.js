import assert from "assert"
import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

describe("youtube", () => {

	it("toHTML", () => {

		assert.strictEqual(template.toHTML("[yt]dsa432432[/yt]Test"), `<iframe class="movie youtube" src="https://youtube.com/embed/dsa432432" width="425" height="355" frameborder="0" allowfullscreen="">dsa432432</iframe>Test`)
		assert.strictEqual(template.toHTML("[yt]dsa[/yt][yt]est[/yt]Test"), `<iframe class="movie youtube" src="https://youtube.com/embed/dsa" width="425" height="355" frameborder="0" allowfullscreen="">dsa</iframe><iframe class="movie youtube" src="https://youtube.com/embed/est" width="425" height="355" frameborder="0" allowfullscreen="">est</iframe>Test`)

	})

	it("toBBCode", () => {

		assert.strictEqual(template.toBBCode(`<iframe class="movie youtube" src="https://youtube.com/embed/dsa432432" width="425" height="355" frameborder="0" allowfullscreen="">dsa432432</iframe>Test`), "[yt]dsa432432[/yt]Test")
		assert.strictEqual(template.toBBCode(`<iframe class="movie youtube" src="https://youtube.com/embed/dsa" width="425" height="355" frameborder="0" allowfullscreen="">dsa</iframe><iframe class="movie youtube" src="https://youtube.com/embed/est" width="425" height="355" frameborder="0" allowfullscreen="">est</iframe>Test`), "[yt]dsa[/yt][yt]est[/yt]Test")

	})

})
