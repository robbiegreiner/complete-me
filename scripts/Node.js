export default class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.isFullWord = false;
    this.childNode = {};
    this.frequency = 0;
    this.lastTouched = 0;
  }
}
