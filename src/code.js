import { Code } from "@thoughtsunificator/bbcode-parser-template"

export default class extends Code {

	/**
		* @readonly
		* @type {string}
		*/
	static tagName = "code"

	/**
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {
		return node.nodeName === "DIV" && node.className === "codetext"
	}

	/**
		* @param {Conversion} conversion
		*/
	static beforeCreateBBNode(conversion) {
		conversion.ignoreNodeList.push(conversion.node.children[0])
		conversion.node.children[0].childNodes.forEach(childNode => conversion.node.appendChild(childNode))
	}

	/**
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {
		const bbNode = conversion.bbDocument.createElement("code")
		return bbNode
	}

	/**
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {
		const node = conversion.document.createElement("div")
		node.className = "codetext"
		const pre = conversion.document.createElement("pre")
		node.appendChild(pre)
		return node
	}

	/**
		* @param {Conversion} conversion
		*/
	static appendNode(conversion) {
		if (conversion.parentMatch.node.className === "codetext") {
			conversion.parentMatch.node.querySelector("pre").appendChild(conversion.node)
		}
	}

}
