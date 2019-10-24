import ScoreStore from './ScoreStore.js'
import KeyboardManager from './KeyboardManager.js'
import Letter from './Letter.js'

export default class LetterGame {
  constructor () {
    console.log(this)
    this.scoreStore = new ScoreStore()
    this.keyboardManager = new KeyboardManager()
    this.addLetterTimeout = window.setTimeout(this.addLetter.bind(this), Math.random() * 1000)
    this.letters = []
    this.scoreElement = document.createElement('h1')
    this.scoreStore.onchange = this.updateScore.bind(this)
    this.updateScore()
    document.body.appendChild(this.scoreElement)
    document.body.ondragstart = event => event.preventDefault()
    document.body.onselectstart = event => event.preventDefault()
    document.body.oncontextmenu = event => event.preventDefault()
    window.setTimeout(this.end.bind(this), 60000)
    window.requestAnimationFrame(this.updateAll.bind(this))
  }

  updateScore () {
    this.scoreElement.innerHTML = 'Score: ' + Math.round(this.scoreStore.score)
  }

  addLetter () {
    this.letters.push(new Letter(String.fromCharCode(Math.round(Math.random() * 26 + 64.5)), document.body, this.scoreStore, this.keyboardManager))
    this.addLetterTimeout = window.setTimeout(this.addLetter.bind(this), Math.random() * 1000)
  }

  end () {
    window.clearTimeout(this.addLetterTimeout)
  }

  updateAll () {
    for (const letter of this.letters) {
      letter.update()
    }
    window.requestAnimationFrame(this.updateAll.bind(this))
  }
}

window.onload = () => new LetterGame()
