import React from './react'
import ReactDOM from './react-dom'
// import { create } from './component/component-system.js'
// import Div from './component/Div.js'
function create (Class, attributes, ...children) {
  console.log(arguments)
  let object
  // 如果是html标签
  if (typeof Class === 'string') {
    object = new Wrapper()
  // 否则是组件
  } else {
    object = new Class()
  }
  // for (const child of children) {
  //   if (typeof child === 'string') {
  //     object.appendChild(new Text(child.toString()))
  //   } else {
  //     object.appendChild(child)
  //   }
  // }
  // for (const child of children) {
  //   object.appendChild(child)
  // }
  object.children = children
  return object
}

class Component {
  constructor () {
    this.children = []
    this.props = {}
    this.state = {}
    this.node = document.createElement('div')
  }

  appendTo (el) {
    el.appendChild(this.node)
    // this.children.forEach(child => {
    //   child.appendTo(this.node)
    // })
  }

  appendChild (child) {
    this.children.push(child)
  }
}
class Wrapper extends Component {

}
class Text extends Component {
  constructor (text) {
    super()
    this.node = document.createElement('span')
    this.node.innerText = text
  }
}
// 业务代码
class Button extends Component {
  render () {
    return (<div>aaa</div>)
  }
}
const c = <Button>sssss</Button>

console.log(c)
ReactDOM.render(<Button/>, document.querySelector('#app'))
