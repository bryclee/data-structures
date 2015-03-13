var Graph = function() {
  this.nodes = [];
};

Graph.prototype.addNode = function(node) {
  // nodes are represented by list, edge is every value first element
  // do not add if node already in list
  this.contains(node) || this.nodes.push([node]);
};

Graph.prototype.contains = function(node) {
  // search through first value of every node array for node target
  // time complexity O(n)
  return _.some(this.nodes, function(val) {
    if (val[0] === node)
      return true;
    else
      return false;
  })
};

Graph.prototype.grabNode = function(node) {
  return _.reduce(this.nodes, function(returnNode, nodeInGraph) {
    return returnNode || (nodeInGraph[0] === node ? nodeInGraph : false);
  }, false);
}

Graph.prototype.removeNode = function(node) {
  // find value and remove it from the list
  // search through each of the nodes
  _.each(this.nodes, function(nodeInGraph, idx, graph) {
    // if it is the node, splice it, save any edges
    if (nodeInGraph[0] === node) {
      graph[idx].splice(idx);
    } else {
      _.each(nodeInGraph, function(edge, edgeIdx) {
        if (edge == node) {
          nodeInGraph.splice(edgeIdx);
        }
      })
    }
  });
};

Graph.prototype.hasEdge = function(fromNode, toNode) {
  var from = this.grabNode(fromNode);

  if (_.contains(from, toNode))
    return true;
  else
    return false;
};

Graph.prototype.addEdge = function(fromNode, toNode) {
  // grab the fromNode and the toNode, add edge to list
  var from = this.grabNode(fromNode);
  var to = this.grabNode(toNode);

  from.push(toNode);
  to.push(fromNode);
};

Graph.prototype.removeEdge = function(fromNode, toNode) {
  var from = this.grabNode(fromNode);
  var to = this.grabNode(toNode);

  from.splice(_.indexOf(from, toNode));
  to.splice(_.indexOf(to, fromNode));
};

Graph.prototype.forEachNode = function(cb) {
  // takes arguments, calls cb on them
  _.each(this.nodes, function(value) {
    cb.apply(null, value);
  }); // figure out why you cant just put in the cb
};

/*
 * Complexity: What is the time complexity of the above functions?
 */



