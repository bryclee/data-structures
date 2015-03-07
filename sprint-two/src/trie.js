var Trie = function(){
	this.spells = []; // a list of the words spelled with this combination
  this.nodes = {};
  this.contents = [];
}

Trie.prototype.addWord = function(fullWord, wordPosition){
	// .add() will add word to Trie, creating nodes letter by letter until word
	// is created.

  // initialize if word not input
  if (wordPosition === undefined){
    if (this.contents.indexOf(fullWord) !== -1)
      return 0;
    this.contents.push(fullWord);
    this.contents.sort();
    wordPosition = convertWordToKeys(fullWord);
  // set value if at last index of word
  } else if (wordPosition === ''){
    if (this.spells.indexOf(fullWord) === -1)
      this.spells.push(fullWord);
    return fullWord
  }
  // take first letter
  var first = wordPosition[0];
  // create new node
  if (!this.nodes[first]){
  	this.nodes[first] = new Trie();
  }
  // call .add on that new node with wordPosition.slice(1)

  return this.nodes[first].addWord(fullWord, wordPosition.slice(1));
}

Trie.prototype.lookup = function(key){
  // if no more key and this word spells something
  // return what it spells
  if (typeof key === 'number')
    key = key.toString();
  if (!key && this.spells.length !== 0){
    return this.spells;
  }
  
  var first = key[0];
  
  // if this has the first char as a key
  // lookup that node
  if (this.nodes[first])
    return this.nodes[first].lookup(key.slice(1));
}

var convertWordToKeys = function(word){
  // convert a word to the numbers it creates
  var result = [];
  var letters = word.toLowerCase().match(/[a-z]/g);
  var let;
  for (var i = 0; i < letters.length; i++){
    let = letters[i];
    if (let.search(/[abc]/) >= 0)
    	result.push('2');
    else if (let.search(/[def]/) >= 0)
      result.push('3');
    else if (let.search(/[ghi]/) >= 0)
      result.push('4');
    else if (let.search(/[jkl]/) >= 0)
      result.push('5');
    else if (let.search(/[mno]/) >= 0)
      result.push('6');
    else if (let.search(/[pqrs]/) >= 0)
      result.push('7');
    else if (let.search(/[tuv]/) >= 0)
      result.push('8');
    else if (let.search(/[wxyz]/) >= 0)
      result.push('9');
    else
      console.warn('char "' + let + '" not found');
  }
  return result.join('');
}