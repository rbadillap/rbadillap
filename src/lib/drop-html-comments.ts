type MdNode = { type: string; value?: string; children?: MdNode[] }

const comment = /^\s*<!--[\s\S]*?-->\s*$/

/**
 * A remark plugin: HTML comments in a post (`<!-- note -->`) are notes for
 * the author, never page text. Every other raw HTML node is left alone, so
 * the renderer keeps escaping it.
 */
export function dropHtmlComments() {
  return (tree: MdNode) => prune(tree)
}

function prune(node: MdNode) {
  if (!node.children) return
  node.children = node.children.filter(
    (child) => !(child.type === "html" && comment.test(child.value ?? "")),
  )
  node.children.forEach(prune)
}
