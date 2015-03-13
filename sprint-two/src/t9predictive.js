$(document).ready(function() {
  console.log(convertWordToKeys('test'));
  window.dict = new Trie();

  var $newWord = $('[name="word-input"]');
  var $t9 = $('[name="predict-input"]');
  var $dict = $(".dict > .word-bank");
  var $prediction = $(".predicted > .word-bank");

  $newWord.focus();

  // typing into the 'add word' field
  $newWord.on('keydown', function(event) {
    // save word on enter
    if (event.which === 13) {
      var words;
      var stat;
      var word = $newWord.val();
      var result = [];

      words = word.split(' ');
      for (var i = 0; i < words.length; i++) {
        // apostraphes?
        stat = words[i].match(/[^a-zA-Z ]/);
        console.log(stat);
        if (!stat) {
          console.log("add: " + dict.addWord(words[i]), convertWordToKeys(words[i]));
        }
      }
      // update dict word bank with word
      // can refactor later
      for (var j = 0; j < dict.contents.length; j++) {
        result.push(dict.contents[j] + " " + convertWordToKeys(dict.contents[j]));
      }
      $dict.html(result.join('<br>'));

      $newWord.val('');
    }
  });

  // typing into the 'predict word' field
  $t9.on('keyup', function(event) {
    var results = []
    var currentInputs = $t9.val().split(' ');
    console.log('currentInput: ' + currentInputs);
    for (var i = 0; i < currentInputs.length; i++) {
      var lookup = (dict.lookup(currentInputs[i]));
      if (lookup && lookup.length == 1)
        results.push(lookup[0]);
      // multiple possible inputs are indicated by commas
      else if (lookup && lookup.length > 1) {
        var tempRes = [];
        for (var j = 0; j < lookup.length; j++) {
          tempRes.push(lookup[j]);
        }
        results.push(tempRes.join(','));
      }
    }
    
    $prediction.html(results.join(' '));
  })

});