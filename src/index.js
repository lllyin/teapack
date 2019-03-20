function add(a, b) {
  return a + b;
}

function greeting(word) {
  return `greeting ${word}`;
}
console.log(add(1, 3), greeting('天下'));

module.exports = {
  add,
  greeting
}

