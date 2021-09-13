import { Code } from "@thoughtsunificator/bbcode-parser-template"

export default class extends Code {

	/**
		* @readonly
		* @type {string}
		*/
	static tagName = "size"

	/**
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {
		return node.nodeName === "SPAN" && node.style.fontSize !== ""
	}

	/**
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {
		const bbNode = conversion.bbDocument.createElement("size", conversion.node.style.fontSize.substring(0, conversion.node.style.fontSize.length - 1))
		return bbNode
	}

	/**
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {
		const node = conversion.document.createElement("span")
		node.style.fontSize = conversion.bbNode.keys.get("size") + "%"
		return node
	}

}
