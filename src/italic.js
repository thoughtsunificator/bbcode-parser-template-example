import { Code } from "@thoughtsunificator/bbcode-parser-template"

/**
 * @global
 */
class ItalicCode extends Code {

	/**
		* @readonly
		* @type {string}
		*/
	static tagName = "i"

	/**
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {
		return node.nodeName === "SPAN" && node.style.fontStyle === "italic"
	}

	/**
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {
		const bbNode = conversion.bbDocument.createElement("i")
		return bbNode
	}

	/**
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {
		const node = conversion.document.createElement("span")
		node.style.fontStyle = "italic"
		return node
	}

}

export default ItalicCode
