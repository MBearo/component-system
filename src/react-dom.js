function render (element, parentNode) {
  if (typeof element === 'string' || typeof element === 'number') {
    return parentNode.appendChild(document.createTextNode(element))
  }
  // let {type,props} = element
  let type = element.type
  let props = element.props
  if (typeof element.type === 'function') {
    let returnedElement = type(props)
    type = returnedElement.type
    props = returnedElement.props
  }

  let domElement = document.createElement(type)
  for (let propName in props) {
    if (propName === 'className') {
      domElement.className = props[propName]
    } else if (propName === 'style') {
      let styleObj = props[propName]
      let cssText = Object.keys(styleObj).map(attr => {
        return `${attr.replace(/[A-Z]/g, e => '-' + e.toLowerCase())}:${styleObj[attr]}`
      }).join(';')
      domElement.style.cssText = cssText
    } else if (propName === 'children') {
      let children = Array.isArray(props[propName]) ? props[propName] : [props[propName]]
      children.forEach(child => render(child, domElement))
    } else {
      domElement.setAttribute(propName, props[propName])
    }
  }
  parentNode.appendChild(domElement)
}
export default { render }
