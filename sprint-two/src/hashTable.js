var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._items = 0;
};

HashTable.prototype.insert = function(k, v) {
  var i = getIndexBelowMaxForKey(k, this._limit);
  // lookup index in hash table
  var bucket = this._storage.get(i);
  if (bucket === undefined) {
    // set up bucket if no bucket exists at i
    bucket = [];
    this._storage.set(i, bucket);
  }
  
  for (var idx = 0; idx < bucket.length; idx++) {
    if (bucket[idx][0] === k) {
      // found the key, update value
      bucket[idx][1] = v;
      return;
    }
  }
  // did not find key
  bucket.push([k, v]);
  this._items++;
  if (this._items > 0.75 * this._limit) {
    this._resize(this._limit * 2);
  }
};

HashTable.prototype.retrieve = function(k) {
  var i = getIndexBelowMaxForKey(k, this._limit);
  
  var bucket = this._storage.get(i);
  
  // loop through the bucket contents looking for key
  if (bucket) {
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === k) {
        return bucket[i][1];
      }
    }
  }
  return null;
};

HashTable.prototype.remove = function(k) {
  var i = getIndexBelowMaxForKey(k, this._limit);
  
  var bucket = this._storage.get(i);
  
  // splice out if it is in the bucket
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      bucket.splice(i);
      this._items--;
      if (this._items < 0.25 * this._limit) {
        this._resize(this._limit * 0.5);
      }
      return;
    }
  }
};

HashTable.prototype._resize = function(newLimit) {
  var oldHash = this._storage;
  var self = this;
  this._storage = new LimitedArray(newLimit);
  this._items = 0;
  this._limit = newLimit;
  // for each of oldHash, re-add to new Hash
  oldHash.each(function(bucket) {
    if (bucket) {
      for (var i = 0; i < bucket.length; i++) {
        self.insert(bucket[i][0], bucket[i][1]);
      }
    }
  });
}

/*
 * Complexity: What is the time complexity of the above functions?
 */
