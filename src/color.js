import { Code } from "@thoughtsunificator/bbcode-parser-template"


export default class extends Code {
	/**
		* @readonly
		* @type {string}
		*/
	static tagName = "color"

	/**
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {
		return node.nodeName === "SPAN" && node.style.color !== ""
	}

	/**
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {
		let color = null
		if(conversion.node.style.color.slice(0, 4) === "rgb(") {
			const colors = conversion.node.style.color.slice(4, -1).split(",")
			const red = `${Number(colors[0]).toString(16)}`.padStart(2, "0");
			const green = `${Number(colors[1]).toString(16)}`.padStart(2, "0");
			const blue = `${Number(colors[2]).toString(16)}`.padStart(2, "0");
			color = `#${red}${green}${blue}`.toUpperCase()
		} else {
			color = conversion.node.style.color
		}
		const bbNode = conversion.bbDocument.createElement("color", color)
		return bbNode
	}

	/**
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {
		const node = conversion.document.createElement("span")
		node.style.color = conversion.bbNode.keys.get("color")
		return node
	}

}
