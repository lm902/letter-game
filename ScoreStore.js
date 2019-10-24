export default class ScoreStore {
  constructor () {
    this._score = 0
  }

  get score () {
    return this._score
  }

  set score (value) {
    this._score = value
    if (this.onchange) {
      this.onchange()
    }
  }
}
