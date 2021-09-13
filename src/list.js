import { Code } from "@thoughtsunificator/bbcode-parser-template"

export default class extends Code {

	/**
		* @readonly
		* @type {string}
		*/
	static tagName = "list"

	/**
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {
		return node.nodeName === "UL" || node.nodeName === "OL"
	}

	/**
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {
		let value = null
		if (conversion.node.nodeName === "OL") {
			value = "1"
		}
		const	bbNode = conversion.bbDocument.createElement("list", value)
		return bbNode
	}

	/**
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {
		let node
		if (conversion.bbNode.keys.get("list") === "1") {
			node = conversion.document.createElement("ol")
		} else {
			node = conversion.document.createElement("ul")
		}
		return node
	}

}
