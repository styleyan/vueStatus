Element.prototype.render = function() {
  var el = document.createElement(this.tagName)
  var props = this.props

  for (var propName in props) {
    el.setAttribute(propName, props[propName])
  }

  var children = this.children || []
  children.forEach((child) => {
    var childEl = (child instanceof Element) ? child.render() : document.createTextNode(child)
    el.appendChild(childEl)
  })
  return el
}