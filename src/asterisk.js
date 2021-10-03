import { Code } from "@thoughtsunificator/bbcode-parser-template"

/**
 * @global
 */
class AsteriskCode extends Code {

	/**
		* @readonly
		* @type {string}
		*/
	static tagName = "*"

	/**
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {
		return node.nodeName === "LI"
	}

	/**
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {
		const bbNode = conversion.bbDocument.createElement("*")
		return bbNode
	}

	/**
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {
		const node = conversion.document.createElement("li")
		return node
	}

}

export default AsteriskCode
