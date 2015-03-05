var BinarySearchTree = function(value){
	var tree = Object.create(BinarySearchTree.prototype);

	tree.value = value;
	tree.left = null;
	tree.right = null;

	return tree;
};

BinarySearchTree.prototype.insert = function(val){
	// check lower or greater than value
  if (val < this.value){
  	// check if branch does not exist and add or
    if (this.left === null){
    	this.left = new BinarySearchTree(val);
    // call insert of that branch
    } else {
    	this.left.insert(val);
    }
  } else if (val > this.value){
  	if (this.right === null){
  		this.right = new BinarySearchTree(val);
  	} else {
  		this.right.insert(val);
  	}
  }
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
  queue.push(this);

  while (queue.length > 0){
    var testing = queue.shift();
    cb(testing.value);
    (testing.left !== null) && (queue.push(testing.left));
    (testing.right !== null) && (queue.push(testing.right));
  }
}

/*
 * Complexity: What is the time complexity of the above functions?
 */
