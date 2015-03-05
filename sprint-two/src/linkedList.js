var LinkedList = function(){
  // create a linked list, using the functional method
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    // create a new Node
    var newNode = Node(value);

    list.tail && (list.tail.next = newNode);
    list.head || (list.head = newNode);
    list.tail = newNode;
  };

  list.removeHead = function(){
    // set the head.next node to list.head
    // delete the head.next node
    var result = list.head.value;
    list.head = list.head.next;

    return result;
  };

  list.contains = function(target){
    var idx = list.head;
    while (idx) {
      if (idx.value === target)
        return true;
      idx = idx.next;
    }
    return false;
  };

  return list;
};

var Node = function(value){
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
