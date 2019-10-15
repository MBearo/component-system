import {Component,create} from './component-system'

export default class Div extends Component {
  constructor(){
    super()
    this.created()
  }
  render () {
    return (
      <div>ssss</div>
    )
  }
}
