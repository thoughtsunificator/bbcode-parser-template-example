import { Code } from "@thoughtsunificator/bbcode-parser-template"

export default class extends Code {

	/**
		* @readonly
		* @type {string}
		*/
	static tagName = "url"

	/**
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {
		return node.nodeName === "A"
	}

	/**
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {
		const bbNode = conversion.bbDocument.createElement("url",  conversion.node.getAttribute("href"))
		return bbNode
	}

	/**
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {
		const node = conversion.document.createElement("a")
		node.href = conversion.bbNode.keys.get("url")
		node.rel = "nofollow noopener noreferrer"
		node.target = "_blank"
		return node
	}

}
