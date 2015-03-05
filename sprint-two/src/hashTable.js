var HashTable = function(){
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype._checkIndex = function(i, k){
	// helper function to check the index of the hash table

	// iterate through entries of hash table to find the key, if not in first spot
	// entries of hash table are stored as [k, v]
  for (var j = 0; j < this._limit; j++){
  	// if searching for a value
  	var checkAtI = this._storage.get(i)
  	if (k && checkAtI && checkAtI[0] === k){
  		return i;
    // if searching for a blank spot
  	} else if (k === undefined && checkAtI === undefined){
  		return i;
    // did not find what was searching for
  	} else {
  		i = (i + 1) % this._limit;
  	}
  }
  // item saerching for not found
  	return false;
}

HashTable.prototype.insert = function(k, v){
  // hash key to index, cycle until blank item found
  var i = getIndexBelowMaxForKey(k, this._limit);
  var newI = this._checkIndex(i);

  if (newI !== false){
  	this._storage.set(newI, [k, v]);
  }
  // could not find blank spot
  else return false;
};

HashTable.prototype.retrieve = function(k){
	// hash key to index, cycle until key found
  var i = getIndexBelowMaxForKey(k, this._limit);
  var newI = this._checkIndex(i, k);

  if (newI !== false){
  	return this._storage.get(newI)[1];
  }
  else
  	return null;
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var newI = this._checkIndex(i, k);

  if (newI !== false){
  	this._storage.set(newI, undefined);
  } else {
  	return null;
  }
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
