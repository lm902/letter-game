export default class KeyboardManager {
  constructor () {
    document.addEventListener('keydown', this.keydown.bind(this))
    document.addEventListener('keyup', this.keyup.bind(this))
    this.currentKeys = []
  }

  keydown (event) {
    if (this.currentKeys.indexOf(event.keyCode) === -1) {
      this.currentKeys.push(event.keyCode)
    }
  }

  keyup (event) {
    if (this.currentKeys.indexOf(event.keyCode) !== -1) {
      this.currentKeys.splice(this.currentKeys.indexOf(event.keyCode), 1)
    }
  }
}
