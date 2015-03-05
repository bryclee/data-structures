var LinkedList = function(){
  // create a linked list, using the functional method
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    // create a new Node, set tail ref, set list head and tail refs
    var newNode = Node(value);

    list.tail && (list.tail.next = newNode);
    list.head || (list.head = newNode);
    list.tail = newNode;
  };

  list.removeHead = function(){
    // set the head.next node to list.head
    // delete the head.next node
    // return the old head value
    var result = list.head.value;
    list.head = list.head.next;

    return result;
  };

  list.contains = function(target){
    // starting from head, look through all nodes for target value
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

var DoubleLinkedList = function(){
  var list = LinkedList();

  list.addToTail = function(value){
    var newNode = DoubleNode(value);

    // set previous value to new node
    if (list.tail){
      list.tail.next = newNode;
      newNode.previous = list.tail;
    }
    list.head || (list.head = newNode);
    list.tail = newNode;
  };

  list.addToHead = function(value){
    var newNode = DoubleNode(value);

    if (list.head){
      list.head.previous = newNode;
      newNode.next = list.head;
    }
    list.tail || (list.tail = newNode);
    list.head = newNode;
  };
  return list;
}

var Node = function(value){
  // create node object
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

var DoubleNode = function(value){
  var node = Node(value);

  node.previous = null;

  return node;
}

/*
 * Complexity: What is the time complexity of the above functions?
 */
