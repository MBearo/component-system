class A {
  constructor (width, height) {
    this.width = width
    this.height = height
  }

  setHeight (height) {
    this.height = height
  }
}
class B extends A {
  constructor (width, height) {
    super(width, height)
  }

  setWidth (width) {
    this.width = width
  }
}
const a = new A(1, 2)
