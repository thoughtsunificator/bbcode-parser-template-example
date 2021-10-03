import { Code } from "@thoughtsunificator/bbcode-parser-template"

/**
 * @global
 */
class BoldCode extends Code {

	/**
		* @readonly
		* @type {string}
		*/
	static tagName = "b"

	/**
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {
		return node.nodeName === "SPAN" && node.style.fontWeight === "bold"
	}

	/**
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {
		const bbNode = conversion.bbDocument.createElement("b")
		return bbNode
	}

	/**
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {
		const node = conversion.document.createElement("span")
		node.style.fontWeight = "bold"
		return node
	}

}

export default BoldCode
