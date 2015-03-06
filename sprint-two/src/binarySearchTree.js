var BinarySearchTree = function(value){
	var tree = Object.create(BinarySearchTree.prototype);

	tree.value = value;
	tree.left = null;
	tree.right = null;
  tree.parent = null;
  tree.depth = 0;
  tree.width = 0;

	return tree;
};

BinarySearchTree.prototype.insert = function(val){
	// check lower or greater than value
  var depth = 0;

  if (val < this.value){
  	// check if branch does not exist and add or
    if (this.left === null){
    // call insert of that branch
    // set parent property of new branch
    // increase width of this by 1
    // start depth counter at 1
      this.left = new BinarySearchTree(val);
      this.left.parent = this;
      this.width++;
    } else {
    	depth = this.left.insert(val);
    }
  } else if (val > this.value){
  	if (this.right === null){
  		this.right = new BinarySearchTree(val);
      this.right.parent = this;
      this.width++;
  	} else {
  		depth = this.right.insert(val);
  	}
  }
  depth++;
  // increase depth property
  if (depth > this.depth)
    this.depth = depth;
  // check if node is unbalanced goes here
  return depth;
};


BinarySearchTree.prototype.contains = function(val){
  if (this.value == val){
    return true;
  } else if (val < this.value){
    if (this.left === null){
      return false;
    } else {
      return this.left.contains(val);
    }
  } else if (val > this.value){
    if (this.right === null){
      return false;
    } else {
      return this.right.contains(val);
    }
  }
};

BinarySearchTree.prototype.depthFirstLog = function(cb){
  cb(this.value);
  this.left && this.left.depthFirstLog(cb);
  this.right && this.right.depthFirstLog(cb);
};

BinarySearchTree.prototype.breadthFirstLog = function(cb){
  var queue = [];
  var nextQueue = [];
  queue.push(this);

  // process all in queue first (this level) before starting nextQueue
  while (queue.length > 0 || nextQueue.length > 0){
    while (queue.length > 0){
      var testing = queue.shift();
      cb(testing.value);
      (testing.left !== null) && (nextQueue.push(testing.left));
      (testing.right !== null) && (nextQueue.push(testing.right));
    }
    if (nextQueue.length > 0){
      queue = nextQueue;
      nextQueue = [];
    }
  }
}

BinarySearchTree.prototype.printTree = function(){
  var testing;
  var results;
  var depth = this.depth;
  var spaces;
  var queue = [];
  var nextQueue = [];
  queue.push(this);

  // process all in queue first (this level) before starting nextQueue
  // logging each node of the tree in levels
  while (depth >= 0){
    results = [];
    while (queue.length > 0){
      testing = queue.shift();
      // set depth if testing is not null
      space = Array(Math.pow(2,depth)).join(' ');
      if (testing){
        results.push(space,testing.value,space,' ');
        nextQueue.push(testing.left);
        nextQueue.push(testing.right);
      } else {
        results.push(space,'x',space,' ');
      }
    }
    if (nextQueue.length > 0){
      console.log(results.join(''));
      depth--;
      queue = nextQueue;
      nextQueue = [];
    }
  }
}

/* examples: == depth: 1, 1 space before
1-
- -
=============== depth: 2, 3 spaces before
   -
 -   -
- - - -
=============== depth: 3, 7 spaces before
       -
   -       -
 -   -   -   -
- - - - - - - -

spaces = 2d * 1
*/
/*
 * Complexity: What is the time complexity of the above functions?
 */
