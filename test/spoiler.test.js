import assert from "assert"
import { JSDOM } from "jsdom"
import { Template } from "@thoughtsunificator/bbcode-parser-template"
import * as Codes from "../index.js"

const virtualDOM = new JSDOM()
const { document } = virtualDOM.window

const template = new Template(Object.values(Codes), document)

describe("spoiler", () => {

	it("toHTML", () => {

		const onclick = `const isHidden=this.nextElementSibling.style.display === &quot;none&quot;;this.value=isHidden === true  ? this.value.replace(&quot;Show&quot;, &quot;Hide&quot;) : this.value.replace(&quot;Hide&quot;, &quot;Show&quot;);this.nextElementSibling.style.display=isHidden === true ? &quot;block&quot; : &quot;none&quot;;`

		const input = (content, name = "spoiler") => `<div class="hide_button"><input type="button" class="button show_button" onclick="${onclick}" value="Show ${name}"><span class="spoiler_content" style="display: none;">${content}</span></div>`

		assert.strictEqual(template.toHTML("[spoiler]Test[/spoiler]"), `${input("Test")}`)
		assert.strictEqual(template.toHTML("[spoiler=test]1[spoiler][/spoiler][/spoiler]"), `${input(`1${input("")}`, "test")}`)
		assert.strictEqual(template.toHTML("[spoiler]1[spoiler]2[/spoiler][/spoiler]"), `${input(`1${input("2")}`)}`)
		assert.strictEqual(template.toHTML("[spoiler]1[spoiler]2[/spoiler]3[/spoiler]"), `${input(`1${input("2")}3`)}`)
		assert.strictEqual(template.toHTML("[spoiler]1[spoiler]2[/spoiler][/spoiler][spoiler][/spoiler]"), `${input(`1${input("2")}`)}${input("")}`)
		assert.strictEqual(template.toHTML("[spoiler]1[spoiler]2[spoiler]3[spoiler=name]4[/spoiler]5[/spoiler]6[/spoiler]7[/spoiler]8[spoiler]9[/spoiler]Test"), `${input(`1${input(`2${input(`3${input(`4`, "name")}5`)}6`)}7`)}8${input(`9`)}Test`)

	})

	it("toBBCode", () => {

		const onclick = `const isHidden=this.nextElementSibling.style.display === &quot;none&quot;;this.value=isHidden === true  ? this.value.replace(&quot;Show&quot;, &quot;Hide&quot;) : this.value.replace(&quot;Hide&quot;, &quot;Show&quot;);this.nextElementSibling.style.display=isHidden === true ? &quot;block&quot; : &quot;none&quot;;`

		const input = (content, name = "spoiler") => `<div class="hide_button"><input type="button" class="button show_button" onclick="${onclick}" value="Show ${name}"><span class="spoiler_content" style="display: none;">${content}</span></div>`

		assert.strictEqual(template.toBBCode(`${input("Test")}`), "[spoiler]Test[/spoiler]")
		assert.strictEqual(template.toBBCode(`${input(`1${input("")}`, "test")}`), "[spoiler=test]1[spoiler][/spoiler][/spoiler]")
		assert.strictEqual(template.toBBCode(`${input(`1${input("2")}`)}`), "[spoiler]1[spoiler]2[/spoiler][/spoiler]")
		assert.strictEqual(template.toBBCode(`${input(`1${input("2")}3`)}`), "[spoiler]1[spoiler]2[/spoiler]3[/spoiler]")
		assert.strictEqual(template.toBBCode(`${input(`1${input("2")}`)}${input("")}`), "[spoiler]1[spoiler]2[/spoiler][/spoiler][spoiler][/spoiler]")
		assert.strictEqual(template.toBBCode(`${input(`1${input(`2${input(`3${input(`4`, "name")}5`)}6`)}7`)}8${input(`9`)}Test`), "[spoiler]1[spoiler]2[spoiler]3[spoiler=name]4[/spoiler]5[/spoiler]6[/spoiler]7[/spoiler]8[spoiler]9[/spoiler]Test")

	})

})
