function parseStatement(line){
  var parts = line.trim().split(' '),
      name = parts[0],
      args = parts.slice(1);
  return {
    name: name,
    args: args
  };
}


module.exports = {
  parse: parseStatement
};