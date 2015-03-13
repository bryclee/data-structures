var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.

  var newStack = Object.create(stackMethods);
  newStack.storage = {};
  newStack.items = 0;


  return newStack;
};

var stackMethods = {};

stackMethods.push = function(value) {
  this.storage[this.items] = value;
  this.items++;
};

stackMethods.pop = function() {
  if (this.items) {
    this.items--;
    var result = this.storage[this.items];
    delete this.storage[this.items];

    return result;
  }
};

stackMethods.size = function() {
  return this.items;
}
