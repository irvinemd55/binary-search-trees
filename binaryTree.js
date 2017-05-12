'use strict';


//incidental node constructor for building out data points
//each node contains data as well as a potential left and right
//value for traversing the tree
function Node(data) {
  this.data = data;
  this.left = null;
  this.right = null;
}

//BinarySearchTree constructor built for nodes to inhabit
//only root structure needed to create initial build similar
//to head in a linked list
function BinarySearchTree() {
  this.root = null;
}

//method for adding nodes into BinarySearchTree. Data value is passed through the method to establish where the respective node needs to go
BinarySearchTree.prototype.add =
function(data) {
//new node created and assigned using node constructor based on data being passed through
  var node = new Node(data);
//iffy statement checking to see if there's a root node present. If not then node being passed through will be the new root of the tree being created
  if(!this.root) {
    this.root = node;
//else statement accounting for all other nodes being created if the root node is already present
  } else {
//variable named current assigned to the actual root node for subsequenet comparisons in the while loop
    var current = this.root;
//while loop that runs until current returns a value of null
    while(current) {
//iffy statement that checks to see if the new node value being passed through is greater than the current value
      if(node.data < current.data) {
//further iffy statment checking to see if there's a node present at the current's left parameter. If there isn't anything there then node being passed through becomes the new current.left and the loop is broken
        if(!current.left) {
          current.left = node;
          break;
        }
//embeded iffy statement checking to see if there isn't already a left node present if there is that becomes the new current value and the loop will repeat. EX: 5|3 tree with 2 passed through 2 is less than 5 but there's already a left node present(3). 3 gets reassigned to the current value. Loop repeats. 2 < 3 and 3 has no left node so 2 becomes the new left node for 3 and the loop is broken.
        current = current.left;
//similar structure to the above iffy statment except this check for values greater than the root node. If there is no right node present for the current node being looked at then the node being passed through becomes the new right node. If there is a right node present then the current value gets reassigned to the right node and the string repeats. EX: 5|6 tree with 8 being passed through 8 > 5 but there's already a right node present(6). 6 gets reassigned to the current value. Loop repeats. 8> 6 and 6 has no right node so 8 becomes the new right node for 6 and the loops is broken.
      } else if (node.data > current.data) {
        if(!current.right) {
          current.right = node;
          break;
        }
        current = current.right;
//final outlier statement checking for matching values. EX: 5|4 tree with 4 being passed through. 4 intially trips the left node iffy statement with current value being reassigned to the already existing left node. 4 is equal to 4 however, so neither of the above iffy statements are tripped. The loop gets broken and the new node is discarded to prevent potential duplicates.
      } else {
        break;
      }
    }
  }
}

BinarySearchTree.prototype.getMin = function(node) {
  if(!node) {
    node = this.root;
  }
  while(node.left) {
    node = node.left;
    console.log(node);
  }
  return node.data;
}


//removal method that passes a data value through
BinarySearchTree.prototype.remove = function(data) {
//assigns variable to the searchtree being using 'this'
  var that = this;
  console.log(node);
  var removeNode = function(node, data) {
    if(!node) {
      return null;
    }
    if(data === node.data) {
      if(!node.left && !node.right) {
        return null;
      }
    if(!node.left) {
      return node.right;
      }
    if(!node.right){
      return node.left;
      }
    var temp = that.getMin(node.right);
    node.data = temp;
    node.right = removeNode(node.right, temp);
    return node;
    } else if(data < node.data) {
    node.left = removeNode(node.left, data);
    return node;
    } else {
    node.right = removeNode(node.right, data);
    return node;
    }
  };
  this.root = removeNode(this.root, data);
};

BinarySearchTree.prototype.print = function() {
  if(!this.root) {
    return console.log('No root node found');
  }
  var newLine = new Node('|');
  var queue = [this.root, newLine];
  var string = '';
  while(queue.length) {
    var node = queue.shift();
    string+= node.data.toString() + ' ';
    if(node === newLine && queue.length) {
      queue.push(newLine);
    }
    if(node.left) {
      queue.push(node.left);
    }
    if(node.right) {
      queue.push(node.right);
    }
  }
  console.log(string.slice(0, -2).trim());
}


var binarySearchTree = new BinarySearchTree();
binarySearchTree.add(5);
binarySearchTree.add(3);
binarySearchTree.add(7);
binarySearchTree.add(2);
binarySearchTree.add(4);
// binarySearchTree.add(4);
binarySearchTree.add(6);
// binarySearchTree.add(8);
// binarySearchTree.print();
// binarySearchTree.remove(5);
// binarySearchTree.print();
console.log(binarySearchTree.getMin());
