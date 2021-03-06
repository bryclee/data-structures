var BinarySearchTree = function(value, autobal) {
  var tree = Object.create(BinarySearchTree.prototype);

  tree.value = value;
  tree.left = null;
  tree.right = null;
  tree.parent = null;
  tree.leftWeight = 0;
  tree.rightWeight = 0;
  tree.autobal = autobal;

  return tree;
};

BinarySearchTree.prototype.insert = function(val) {
  // check lower or greater than value
  var res;

  if (val < this.value) {
    // check if branch does not exist and add or
    this.leftWeight++;
    // call insert of that branch
    // set parent property of new branch
    // increase width of this by 1
    // start depth counter at 1
    if (this.left === null) {
      res = new BinarySearchTree(val, this.autobal);
      this.left = res;
      this.left.parent = this;
    } else {
      res = this.left.insert(val);
    }
  } else if (val > this.value) {
    this.rightWeight++;
    if (this.right === null) {
      res = new BinarySearchTree(val, this.autobal);
      this.right = res; 
      this.right.parent = this;
    } else {
      res = this.right.insert(val);
    }
  }
  // check if node is unbalanced goes here
  if (this.autobal !== undefined) {
    if (Math.abs(this.rightWeight - this.leftWeight) > 1)
      this.rebalance(this.rightWeight - this.leftWeight);
  }
  return res;
};


BinarySearchTree.prototype.contains = function(val) {
  if (this.getBranch(val) !== null)
    return true;
  else
    return false;
};

BinarySearchTree.prototype.getBranch = function(val) {
  if (this.value == val) {
    return this;
  } else if (val < this.value) {
    if (this.left === null) {
      return null;
    } else {
      return this.left.getBranch(val);
    }
  } else if (val > this.value) {
    if (this.right === null) {
      return null;
    } else {
      return this.right.getBranch(val);
    }
  }
}

BinarySearchTree.prototype.getTopParent = function() {
  if (this.parent === null)
    return this;
  else return this.parent.getTopParent();
}

BinarySearchTree.prototype.depthFirstLog = function(cb) {
  cb(this.value);
  this.left && this.left.depthFirstLog(cb);
  this.right && this.right.depthFirstLog(cb);
};

BinarySearchTree.prototype.breadthFirstLog = function(cb) {
  var queue = [];
  var nextQueue = [];
  queue.push(this);

  // process all in queue first (this level) before starting nextQueue
  while (queue.length > 0 || nextQueue.length > 0) {
    while (queue.length > 0) {
      var testing = queue.shift();
      cb(testing.value);
      (testing.left !== null) && (nextQueue.push(testing.left));
      (testing.right !== null) && (nextQueue.push(testing.right));
    }
    if (nextQueue.length > 0) {
      queue = nextQueue;
      nextQueue = [];
    }
  }
}

BinarySearchTree.prototype.rebalance = function(dir) {
  // rebalance in direction, negative is left, pos is right
  var parent;
  var child;
  var childClosest;
  // to rebalance, set parent's child to child, child's child to this,
  // and this child to childClosest

  // rebalance left, this.left branch takes this place
  if (dir < 0) {
    parent = this.parent;
    child = this.left;
    if (!child)
      return;
    childClosest = child.right;
    
    // shift partners, reset weights
    if ((parent !== null) && (parent.left === this))
      parent.left = child;
    else if ((parent !== null) && (parent.right === this))
      parent.right = this;
    (child !== null) && (child.parent = parent);
    this.left = childClosest;
    (childClosest !== null) && (childClosest.parent = this);
    (child !== null) && (child.right = this);
    this.parent = child;
    
    // reshuffle the weights
    if (childClosest) {
      this.leftWeight = childClosest.leftWeight + childClosest.rightWeight + 1;
    } else {
      this.leftWeight = 0;
    } 
    child.rightWeight = this.leftWeight + this.rightWeight + 1;
    // this.right branch takes this place
  } else {
    parent = this.parent;
    child = this.right;
    if (!child)
      return;
    childClosest = child.left;


    if (parent && parent.left === this)
      parent.left = child;
    else if (parent && parent.right === this)
      parent.right = child;
    (child !== null) && (child.parent = parent);
    this.right = childClosest;
    (childClosest !== null) && (childClosest.parent = this);
    (child !== null) && (child.left = this);
    this.parent = child;

    if (childClosest) {
      this.rightWeight = childClosest.leftWeight + childClosest.rightWeight + 1;
    } else
      this.rightWeight = 0;
    child.leftWeight = this.leftWeight + this.rightWeight + 1;
  }
  this.printTree();
}

BinarySearchTree.prototype.printTree = function() {
  var testing;
  var results;
  var depth = 0;
  var spaces;
  var queue = [];
  var nextQueue = [];
  var allResults = [];
  queue.push(this);
  var totalElements = this.leftWeight + this.rightWeight + 1;

  // process all in queue first (this level) before starting nextQueue
  // logging each node of the tree in levels
  while (totalElements > 0) {
    console.log(totalElements);
    results = [];
    // process level
    while (queue.length > 0) {
      testing = queue.shift();
      // set depth if testing is not null
      if (testing) {
        totalElements--;
        results.push(testing.value);
        nextQueue.push(testing.left);
        nextQueue.push(testing.right);
      } else {
        nextQueue.push(null,null);
        results.push('x');
      }
    }
    // output level
    if (nextQueue.length > 0) {
      allResults.push(results);
      depth++;
      queue = nextQueue;
      nextQueue = [];
    }
  }
  // output the elements in the results
  _.each(allResults, function(line, idx, allResults) {
    results = [];
    spaces = Array(Math.pow(2,(depth - idx - 1))).join(' ');
    _.each(line, function(node) {
      results.push(spaces,node,spaces,' ');
    })
    console.log(results.join(''));
  });
}

/*
 * Complexity: What is the time complexity of the above functions?
 */
