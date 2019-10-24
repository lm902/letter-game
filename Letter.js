export default class Letter {
  constructor (letter, attachTo = document.body, scoreStore, keyboardManager) {
    this.letter = letter
    this.dropSpeed = Math.random() * 5 + 2
    this.width = Math.random() * 150 + 20
    this.img = document.createElement('img')
    this.img.src = `images/letters/${this.letter.toLowerCase()}.png`
    this.img.width = this.width
    this.top = -200
    this.img.onmousedown = () => this.destroy(true)
    this.img.ontouchstart = event => {
      this.destroy(true)
      event.preventDefault()
    }
    this.img.style.position = 'absolute'
    this.img.style.left = Math.random() * (window.innerWidth - this.width)
    attachTo.appendChild(this.img)
    this.keyboardManager = keyboardManager
    this.scoreStore = scoreStore
    console.log('Letter created', this)
  }

  update () {
    if (this.keyboardManager.currentKeys.includes(this.letter.charCodeAt(0))) {
      this.destroy(true)
    }
    if (this.top + parseInt(window.getComputedStyle(this.img).height) > window.innerHeight) {
      this.destroy()
    }
    this.img.style.top = this.top + 'px'
    this.top += this.dropSpeed
  }

  destroy (score = false) {
    if (score) {
      this.scoreStore.score += this.dropSpeed * (180 - this.width) / 50
    }
    this.img.parentElement.removeChild(this.img)
    this.update = () => { }
  }
}
