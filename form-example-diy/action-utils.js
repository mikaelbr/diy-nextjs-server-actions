module.exports.toId = function toId(input) {
  return `${input.file.replace("/", "_")}$${input.method}`;
};

module.exports.fromId = function fromId(id) {
  const splitted = id.split("$");

  return {
    file: splitted[0].replace("_", "/") + ".actions.ts",
    method: splitted[1],
  };
};
