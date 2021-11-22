function SearchWrapper (nodes) {
  this.nodes = nodes;
  this.css = function css(_property, _value) {
    if(nodes instanceof NodeList) {
      nodes.forEach((node) => {
        node.style[_property] = _value
      })
    } else {
      nodes.style[_property] = _value;
    }
  }
}
const searchNode = function (_index) {
  let query;
  if(typeof _index === 'string') {
    query = `*:nth-child(${_index}n)`;
    return new SearchWrapper(this.querySelectorAll(query));
  } else {
    query = `*:nth-child(${_index})`;
    return new SearchWrapper(this.querySelector(query));
  }
}
Node.prototype.searchNode = searchNode;

document.getElementById('changeableDiv').searchNode(1).css('color', 'red');
document.getElementById('changeableDiv').searchNode("2").css('color', 'blue');

$('#changeableDiv *:nth-child(2n)').css('background-color', 'lightgreen');
$('#changeableDiv *:nth-child(1)').css('background-color', 'darkgreen');
