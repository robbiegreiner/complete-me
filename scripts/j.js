import Node from './Node'


export default class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(word) {
    const node = new Node();

    if (!this.root) {
      this.root = node;
    }

    let letters = [...word.toLowerCase()];

    let currentNode = this.root;

    letters.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    })

    if(!currentNode.isWord) {
      currentNode.isWord = true;
      this.wordCount++
    }

  }

  count() {
    return this.wordCount;
  }

  wordCountDisplay() {
    $('.word-count').text(tree.wordCount)
  }

  suggest(word) {
    let wordsArray = [...word];
    let currentNode = this.root;
    let suggestions = [];

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]];
    }


    const traverseTheTrie = (word, currentNode) => {
      const keys = Object.keys(currentNode.children);

      for (let k = 0; k < keys.length; k++) {
        const child = currentNode.children[keys[k]];
        const newString = word + child.letter;

        if (child.isWord) {
          suggestions.push({value: newString, frequency: child.frequency, lastTouched: child.lastTouched});
        }
        traverseTheTrie(newString, child);
      }
    }

    if (currentNode && currentNode.isWord) {
      suggestions.push({value: word, frequency: currentNode.frequency, lastTouched: currentNode.lastTouched});
    }
    if (currentNode) {
      traverseTheTrie(word, currentNode);
    }
    suggestions.sort((a, b) => {
      return b.frequency - a.frequency || b.lastTouched - a.lastTouched;
    })
    return suggestions.map(obj => {
      return obj.value;
    });
  }

  select(word) {
    let wordsArray = [...word];
    let currentNode = this.root;

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]];
    }
    currentNode.frequency++;
    currentNode.lastTouched = Date.now()
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }


}
