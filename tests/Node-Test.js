import { assert } from 'chai';
import Node from '../scripts/Node.js';

describe ('Node functionality', () => {
  let node;

  beforeEach(() => {
    node = new Node()
  })

  it('should start with null as its default letter', () => {
    assert.equal(node.letter, null)
  })

  it('should not start out as a word', () => {
    assert.equal(node.isFullWord, false);
  })

  it('should have no children', () => {
    assert.deepEqual(node.childNode, {});
  })
})
