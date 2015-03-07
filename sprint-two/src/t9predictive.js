$(document).ready(function(){
  console.log(convertWordToKeys('test'));
  window.dict = new Trie();

  var $newWord = $('[name="word-input"]');
  var $t9 = $('[name="t9"]');
  var $dict = $(".dict");

  $newWord.focus();

  $newWord.on('keydown', function(event){
    if (event.which === 13){
      var word = $newWord.val();

      var stat = word.match(/[^a-zA-Z]/);
      if (!stat){
        console.log("add: " + dict.addWord(word));
        $dict.html(dict.contents.join('<br>'));
      }

      $newWord.val('');
    }
  });

  

});