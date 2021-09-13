import { Code } from "@thoughtsunificator/bbcode-parser-template"

export default class extends Code {

	/**
		* @readonly
		* @type {string}
		*/
	static tagName = "quote"

	/**
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {
		return node.nodeName === "DIV" && node.className === "quotetext"
	}

	/**
		* @param {Conversion} conversion
		*/
	static beforeCreateBBNode(conversion) {
		if (conversion.node.parentNode.className === "spoiler_content") {
			conversion.node.parentNode.parentNode.parentNode.appendChild(conversion.node)
		}
		if (conversion.node.children.length >= 1 && conversion.node.children[0].nodeName === "STRONG") {
			conversion.ignoreNodeList.push(conversion.node.children[0])
			conversion.ignoreNodeList.push(conversion.node.children[0].firstChild)
			conversion.ignoreNodeList.push(conversion.node.children[1])
			conversion.ignoreNodeList.push(conversion.node.querySelector(".hide_button"))
			conversion.ignoreNodeList.push(conversion.node.querySelector(".hide_button input"))
			conversion.ignoreNodeList.push(conversion.node.querySelector(".hide_button .spoiler_content"))
		}
	}

	/**
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {
		let value = null
		if (conversion.node.children.length >= 1 && conversion.node.children[0].nodeName === "STRONG") {
			value = conversion.node.children[0].textContent.substring(0, conversion.node.children[0].textContent.length - " said:".length)
		}
		const bbNode = conversion.bbDocument.createElement("quote", value)
		return bbNode
	}

	/**
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {
		const node = conversion.document.createElement("div")
		node.className = "quotetext"
		if (conversion.bbNode.keys.get("quote") !== null) {
			const strong = conversion.document.createElement("strong")
			strong.textContent = conversion.bbNode.keys.get("quote") + " said:"
			node.appendChild(strong)
			const br = conversion.document.createElement("br")
			node.appendChild(br)
		}
		let treeWalker = conversion.bbNode.ownerDocument.createTreeWalker(conversion.bbNode)
		const parentBBNodes = []
		while(treeWalker.parentNode()) {
			parentBBNodes.push(treeWalker.currentNode)
		}
		const parentQuoteBBNodes = parentBBNodes.filter(bbNode_ => bbNode_.tagName === "quote")
		treeWalker = conversion.bbNode.ownerDocument.createTreeWalker(conversion.bbNode)
		const childrenBBNodes = []
		while(treeWalker.nextNode()) {
			childrenBBNodes.push(treeWalker.currentNode)
		}
		const childrenQuoteBBNodes = childrenBBNodes.filter(bbNode_ => bbNode_.tagName === "quote")
		if (parentQuoteBBNodes.length === 1 && childrenQuoteBBNodes.length >= 1) {
			const node2 = conversion.document.createElement("div")
			node2.className = "hide_button"
			const input = conversion.document.createElement("input")
			input.type = "button"
			input.className = "button expand_quote"
			input.setAttribute("onclick", "this.nextSibling.style.display = \"block\";this.remove();")
			input.value = "Expand Quote"
			node2.appendChild(input)
			const span = conversion.document.createElement("span")
			span.className = "spoiler_content"
			span.style.display = "none"
			node.appendChild(node2)
			node2.appendChild(span)
		}
		return node
	}

	/**
		* @param {Conversion} conversion
		*/
	static appendNode(conversion) {
		if (conversion.parentMatch.node.className === "quotetext") {
			const treeWalker = conversion.bbDocument.createTreeWalker(conversion.bbNode)
			const parentBBNodes = []
			while(treeWalker.parentNode()) {
				parentBBNodes.push(treeWalker.currentNode)
			}
			const parentQuoteBBNodes = parentBBNodes.filter(bbNode_ => bbNode_.tagName === "quote")
			if (conversion.node.className === "quotetext" && parentQuoteBBNodes.length === 2) {
				conversion.matches.find(matchedNode => matchedNode.bbNode === parentQuoteBBNodes[1]).node.querySelector(".spoiler_content").appendChild(conversion.node)
			} else {
				const hideButton = [...conversion.parentMatch.node.children].find(child => child.className === "hide_button")
				if(hideButton) {
					hideButton.before(conversion.node)
				} else {
					conversion.parentMatch.node.appendChild(conversion.node)
				}
			}
		}
	}

}
