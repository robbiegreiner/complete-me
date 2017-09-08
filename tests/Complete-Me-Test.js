import { assert } from 'chai';
const CompleteMe = require('../scripts/Complete-Me.js');
const Node = require('../scripts/Node.js');
const text = "/usr/share/dict/words"
const fs = require('fs')
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Complete Me', () => {

  describe('insert', () => {
    let completeMe;

    beforeEach( () => {
      completeMe = new CompleteMe();
    })

    it('should have a root', () => {
      assert.equal(completeMe.root, null);
    })

    it('should be able to insert new words and root should become a node', () => {
      completeMe.insert('sushi')
      assert.instanceOf(completeMe.root, Node);
    })

    it('should be able to insert new words and the root should have childNode', () => {
      completeMe.insert('sushi');
      assert.equal(completeMe.root.childNode.s.letter, 's');
      assert.equal(completeMe.root.childNode.s.childNode.u.childNode.s.childNode.h.letter, 'h');
    })

    it('should be able to insert a word and the last letter should have a isFullWord property of true', () => {
      completeMe.insert('goo');
      completeMe.insert('goose');

      assert.equal(
        completeMe.root
        .childNode.g
        .childNode.o
        .childNode.o
        .childNode.s
        .childNode.e
        .letter, 'e')

      assert.equal(
        completeMe.root
        .childNode.g
        .childNode.o
        .childNode.o
        .isFullWord, true)

      assert.equal(
        completeMe.root
        .childNode.g
        .childNode.o
        .childNode.o
        .childNode.s
        .childNode.e
        .isFullWord, true)
    })

    it('should be able to insert multiple words and childNode objects should have multiple properties', () => {
      completeMe.insert('ripple');
      completeMe.insert('ripe');

      let childKeys = Object.keys(
        completeMe.root
        .childNode.r
        .childNode.i
        .childNode.p
        .childNode
      );

      assert.deepEqual(childKeys, ['p', 'e']);
    })

    it('should have nodes which represent incomplete words where the isFullWord property is false', () => {
      completeMe.insert('goose');

      assert.equal(
        completeMe.root
        .childNode.g
        .childNode.o
        .childNode.o
        .childNode.s
        .isFullWord
      , false);

    })
  })

  describe('count', () => {
    let completeMe;

    beforeEach(function () {
      completeMe = new CompleteMe();
    })

    it('should return number of words inserted', () => {
      assert.equal(completeMe.count(), 0);

      completeMe.insert('go');
      assert.equal(completeMe.count(), 1);

      completeMe.insert('goo');
      assert.equal(completeMe.count(), 2);

      completeMe.insert('goose');
      assert.equal(completeMe.count(), 3);

      completeMe.insert('goonie');
      assert.equal(completeMe.count(), 4);
    })

    it('should only allow you enter a word one time', () => {
      assert.equal(completeMe.count(), 0);

      completeMe.insert('goose');
      assert.equal(completeMe.count(), 1);

      completeMe.insert('goose');
      assert.equal(completeMe.count(), 1);
    })
  });

  describe('suggest', () => {
    let completeMe;

    beforeEach(function () {
      completeMe = new CompleteMe();
    })

    it('should return all children words of suggestion', () => {
      completeMe.insert('go');
      completeMe.insert('goo');
      completeMe.insert('goose');
      completeMe.insert('god');
      completeMe.insert('gypsy');

      let suggestions = completeMe.suggest('go');

      assert.deepEqual(suggestions, [ 'go', 'goo', 'goose', 'god' ])
    })
  });

  describe('Populate', () => {

    it('should populate the Trie with the dictionary', () => {
      var completeMe = new CompleteMe();

      completeMe.populate(dictionary);
      assert.equal(completeMe.count(), 234371);
    }).timeout(10000)
  })

  function sleep(milliseconds) {
    var start = new Date().getTime();

    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  describe('select', () => {
    let completeMe;

    beforeEach(function () {
      completeMe = new CompleteMe();
    })

    it('should be able to select order of words returned by suggest', () => {
      completeMe.insert('goo')
      completeMe.insert('good')
      completeMe.insert('goodness')

      let suggestions = completeMe.suggest('goo');

      assert.deepEqual(suggestions, [ 'goo', 'good', 'goodness'])

      completeMe.select('goo');
      suggestions = completeMe.suggest('goo');
      assert.deepEqual(suggestions, [ 'goo', 'good', 'goodness'])

      sleep(10);

      completeMe.select('goodness');
      suggestions = completeMe.suggest('goo');
      assert.deepEqual(suggestions, [ 'goodness', 'goo', 'good'])

      sleep(10);

      completeMe.select('good');
      suggestions = completeMe.suggest('goo');
      assert.deepEqual(suggestions, [ 'good', 'goodness', 'goo'])

      sleep(10);

      completeMe.select('goo');
      suggestions = completeMe.suggest('goo');
      assert.deepEqual(suggestions, [ 'goo', 'good', 'goodness'])

      sleep(10);

      completeMe.select('goodness');
      sleep(10);
      completeMe.select('goo');
      sleep(10);
      completeMe.select('goodness');
      suggestions = completeMe.suggest('goo');
      assert.deepEqual(suggestions, [ 'goodness', 'goo', 'good'])
    })

  })

})
