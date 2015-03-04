var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var newStack = {};
  newStack.items = 0;
  newStack.storage = {};
  _.extend(newStack, stackMethods);
  console.log(newStack);

  return newStack;
};

var stackMethods = {};

stackMethods.push = function(value){
	// add value to stack
	this.storage[this.items] = value;
	this.items++;
}

stackMethods.size = function(){
	return this.items;
}

stackMethods.pop = function(){
	// return top value
	if (this.items) {
			this.items--;
		var result = this.storage[this.items];
		delete this.storage[this.items];
		return result;
	}
}
