const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.middle = null;
  }

  root() {
    return this.middle;
  }

  add(data) {
    if (!this.middle) {
      this.middle = new Node(data);
      return;
    }

    let currentNode = this.middle;

    while (currentNode) {
      if (currentNode.data === data) return;

      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = new Node(data);
        }
        currentNode = currentNode.left;
      }
      if (data > currentNode.data) {
        if (!currentNode.right) {
          currentNode.right = new Node(data);
        }
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let currentNode = this.middle;

    while (currentNode) {
      if (data === currentNode.data) return currentNode;
      currentNode =
        data < currentNode.data ? currentNode.left : currentNode.right;
    }
    return null;
  }

  remove(data) {
    function helper(tree, value) {
      if (!tree) return null;
      if (value > tree.data) {
        tree.right = helper(tree.right, value);
        return tree;
      } else if (value < tree.data) {
        tree.left = helper(tree.left, value);
        return tree;
      } else {
        if (!tree.left && !tree.right) {
          return null;
        }
        if (!tree.left) return tree.right;

        if (!tree.right) return tree.left;

        let currentNode = tree.left;
        while (currentNode.right) {
          currentNode = currentNode.right;
        }
        tree.data = currentNode.data;
        tree.left = helper(tree.left, tree.data);
        return tree;
      }
    }
    helper(this.middle, data);
  }

  min() {
    let currentNode = this.middle;
    if (!currentNode) return null;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    let currentNode = this.middle;
    if (!currentNode) return null;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
