var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var newQueue = Object.create(queueMethods);
  newQueue.first = 0;
  newQueue.last = 0;
  newQueue.storage = {};

  return newQueue;
};

var queueMethods = {};
queueMethods.enqueue = function(value) {
  this.storage[this.last] = value;
  this.last++;
};

queueMethods.dequeue = function() {
  if (this.size()) {
    var res = this.storage[this.first];
    delete this.storage[this.first];
    this.first++;
    return res;
  }
};

queueMethods.size = function() {
  return this.last - this.first;
};
