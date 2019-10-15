import { PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL, EVENT_SYMBOL, STATE_SYMBOL } from './constant'
export class Component {
  constructor () {
    this[PROPERTY_SYMBOL] = Object.create(null)// 避免找原型链上的同名方法
    this[ATTRIBUTE_SYMBOL] = Object.create(null)
    this[EVENT_SYMBOL] = Object.create(null)
    this[STATE_SYMBOL] = Object.create(null)
    this.children = []
  }

  created () {
    this.node = document.createElement('div')
    console.log(14, this.render())
    console.log(this)
    this.render().appendTo(this.node)
    // this.appendChild.call(this.render(),this.node)
  }

  mounted () {
    console.log(this.getAttribute('className'), 'mounted')
    // this.node.addEventListener('click', e => {
    //   this.triggerEvent('click', e)
    // })
  }

  appendTo (el) {
    console.log('el', el)
    el.appendChild(this.node)
    this.children.forEach(child => {
      console.log(30, child)
      child.appendTo(this.node)
    })
    this.mounted()
  }

  appendChild (child) {
    console.log(38, child)
    if (Array.isArray(child)) {
      this.children = child
    } else {
      this.children.push(child)
    }
    console.log(child, 'child')
  }

  getAttribute (name) {
    return this[ATTRIBUTE_SYMBOL][name]
  }

  setAttribute (name, value) {
    if (name === 'className') {
      this.node.classList.add(value)
    }
    if (name === 'style') {
      this.node.style = value
    }
    this[ATTRIBUTE_SYMBOL][name] = value
  }

  addEventListener (type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set()
    }
    this[EVENT_SYMBOL][type].add(listener)
  }

  removeEventListener (type, listener) {
    if (!this[EVENT_SYMBOL][type]) { return }
    this[EVENT_SYMBOL][type].delete(listener)
  }

  triggerEvent (type, ...arg) {
    if (!this[EVENT_SYMBOL][type]) { return }
    for (const event of this[EVENT_SYMBOL][type]) {
      event.call(this, arg)
    }
  }
}
class Wrapper extends Component {
  constructor (type) {
    super()
    this.node = document.createElement(type)
  }
}
class Text {
  constructor (config) {
    this.text = config
    this.created()
  }

  created () {
    this.node = document.createElement('span')
    this.node.innerText = this.text
  }

  mounted () {
  }

  appendTo (el) {
    el.appendChild(this.node)
    this.mounted()
  }
}

export function create (Class, attributes, ...children) {
  console.log(arguments)
  let object
  if (typeof Class === 'string') {
    object = new Wrapper()
  } else {
    object = new Class()
  }
  for (const name in attributes) {
    if (name.match(/^on-([\s\S]+)$/)) {
      console.log(object)
      object.addEventListener(RegExp.$1, attributes[name])
    } else {
      object.setAttribute(name, attributes[name])
    }
  }
  for (const child of children) {
    if (Array.isArray(child)) {
      for (const c of child) {
        if (typeof c === 'string') {
          object.appendChild(new Text(c))
        } else {
          object.appendChild(c)
        }
      }
    } else if (typeof child === 'object') {
      object.appendChild(child)
    } else {
      object.appendChild(new Text(child.toString()))
    }

    // if (typeof child === "string") {
    //   object.appendChild(new Text(child));
    // } else {
    //   object.appendChild(child);
    // }
  }
  return object
}
