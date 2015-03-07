var stacks = [];
var queues = [];

// instantiate 10000 instances of stacks
var stackInstantiation = function(){
	for (var i = 0; i < 100000; i++){
		stacks.push(new Stack());
	}
};

var stackPushing = function(){
	stacks.forEach(function(stack){
		for (var i = 0; i < 100; i++){
      stack.push(i);
		}
	});
};

var stackSize = function(){
  stacks.forEach(function(stack){
  	for (var i = 0; i < 100; i++){
  		stack.size();
  	}
  })
};

var stackPopping = function(){
	stacks.forEach(function(stack){
		for (var i = 0; i<100; i++){
			stack.pop();
		}
	})
};

var queueInstantiation = function(){
	for (var i = 0; i < 100000; i++){
		queues.push(new Queue())
	}
};

var queueEnqueue = function(){
	queues.forEach(function(queue){
		for (var i = 0; i < 100; i++){
			queue.enqueue(i);
		}
	})
};

var queueDequeue = function(){
	queues.forEach(function(queue){
		for (var i = 0; i < 100; i++){
			queue.dequeue();
		}
	})
};

stackInstantiation();
stackPushing();
stackSize();
stackPopping();
queueInstantiation();
queueEnqueue();
queueDequeue();