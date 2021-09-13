import { Code } from "@thoughtsunificator/bbcode-parser-template"

export default class extends Code {

	/**
		* @readonly
		* @type {string}
		*/
	static tagName = "spoiler"

	/**
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {
		return node.nodeName === "DIV" && node.className === "hide_button" && node.children.length === 2 && node.children[0].nodeName === "INPUT"
		&& node.children[0].className === "button show_button" && node.children[1].nodeName === "SPAN" && node.children[1].className === "spoiler_content"
	}

	/**
		* @param {Conversion} conversion
		*/
	static beforeCreateBBNode(conversion) {
		if (conversion.node.parentNode.className === "spoiler_content") {
			conversion.node.parentNode.parentNode.appendChild(conversion.node)
		}
		const input = conversion.node.children[0]
		input.nextElementSibling.childNodes.forEach(childNode => conversion.node.appendChild(childNode))
		conversion.ignoreNodeList.push(input)
		conversion.ignoreNodeList.push(input.nextElementSibling)
	}

	/**
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {
		let value = null
		let spoilerName = conversion.node.children[0].value.substring("show ".length)
		if (spoilerName !== "spoiler") {
			value = spoilerName
		}
		const bbNode = conversion.bbDocument.createElement("spoiler", value)
		return bbNode
	}

	/**
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {
		const node = conversion.document.createElement("div")
		node.className = "hide_button"
		const input = conversion.document.createElement("input")
		input.type = "button"
		input.className = "button show_button"
		input.setAttribute("onclick", "const isHidden=this.nextElementSibling.style.display === \"none\";this.value=isHidden === true  ? this.value.replace(\"Show\", \"Hide\") : this.value.replace(\"Hide\", \"Show\");this.nextElementSibling.style.display=isHidden === true ? \"block\" : \"none\";")
		if (conversion.bbNode.keys.get("spoiler") !== null) {
			input.value = `Show ${conversion.bbNode.keys.get("spoiler")}`
		} else {
			input.value = "Show spoiler"
		}
		node.appendChild(input)
		const span = conversion.document.createElement("span")
		span.className = "spoiler_content"
		span.style.display = "none"
		node.appendChild(span)
		return node
	}

	/**
		* @param {Conversion} conversion
		*/
	static appendNode(conversion) {
		if (conversion.parentMatch.node.className === "hide_button") {
			conversion.parentMatch.node.querySelector(".spoiler_content").appendChild(conversion.node)
		}
	}

}
