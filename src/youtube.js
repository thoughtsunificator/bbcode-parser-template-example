import { Code } from "@thoughtsunificator/bbcode-parser-template"

export default class extends Code {

	/**
		* @readonly
		* @type {string}
		*/
	static tagName = "yt"

	/**
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {
		return node.nodeName === "IFRAME" && node.className === "movie youtube"
		&& node.src.startsWith("https://youtube.com/embed/") && node.src.length > "https://youtube.com/embed/".length
	}

	/**
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {
		const bbNode = conversion.bbDocument.createElement("yt")
		return bbNode
	}

	/**
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {
		const node = conversion.document.createElement("iframe")
		node.className = "movie youtube"
		if (conversion.bbNode.childNodes.length >= 1) {
			node.src = "https://youtube.com/embed/" +  conversion.bbNode.textContent
		} else {
			node.src = "https://youtube.com/embed/" + conversion.bbNode.keys.get("yt")
		}
		node.width = "425"
		node.height = "355"
		node.frameBorder = "0"
		node.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
		node.allowFullscreen = true
		return node
	}

}
