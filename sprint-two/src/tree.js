var Tree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.children = [];  // fix me
  newTree.parent = null;
  
  // object of children, key = index number, value = object ref
  _.extend(newTree, treeMethods);

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value){
	var newTree = Tree(value);
  newTree.parent = this;
	this.children.push(newTree);
};

treeMethods.contains = function(target){
	// recursively search through each child for the target
  if (this.value === target){
  	return true;
  	// if it has children
  } else if (this.children.length !== 0){
    for (var i = 0; i < this.children.length; i++){
    	// search through all the child branches
      if (this.children[i].contains(target)){
      	return true;
      }
    }
  } //target is not value, none of children returned true for target
  return false;
};

treeMethods.removeFromParent = function(){
  if (!this.parent) return;

  var parent = this.parent;
  this.parent = null;
  for (var i = 0; i < parent.children.length; i++){
    if (parent.children[i] == this){
      parent.children.splice(i);
      return;
    }
  }
};

treeMethods.traverse = function(cb){
  cb(this.value);
  for (var i = 0; i < this.children.length; i++){
    this.children[i].traverse(cb);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
