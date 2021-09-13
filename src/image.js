import { Code } from "@thoughtsunificator/bbcode-parser-template"

export default class extends Code {

	/**
		* @readonly
		* @type {string}
		*/
	static tagName = "img"

	/**
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {
		return node.nodeName === "IMG"
	}

	/**
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {
		const bbNode = conversion.bbDocument.createElement("img")
		bbNode.textContent = conversion.node.getAttribute("src")
		return bbNode
	}

	/**
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {
		const node = conversion.document.createElement("img")
		node.className = "userimg"
		if (conversion.bbNode.childNodes.length >= 1) {
			node.src = conversion.bbNode.textContent
		} else {
			node.src = conversion.bbNode.keys.get("img")
		}
		if (conversion.bbNode.keys.has("align")) {
			if (conversion.bbNode.keys.get("align") === "left") {
				node.className = "userimg img-a-l"
			} else if (conversion.bbNode.keys.get("align") === "right") {
				node.className = "userimg img-a-r"
			}
		}
		return node
	}

}
