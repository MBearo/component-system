import { Component, create } from './component-system'

export default class Wrapper extends Component {
  constructor (type) {
    super()
    this.node = document.createElement(type)
  }
}
