/**
 *
 * @param {{ file: string; method: string }} input
 * @returns {string}
 */
module.exports.toId = function toId(input) {
  return `${input.file.replace("/", "_")}$${input.method}`;
};

/**
 *
 * @param {string} id
 * @returns {{ file: string; method: string }}
 */
module.exports.fromId = function fromId(id) {
  const splitted = id.split("$");

  return {
    file: splitted[0].replace("_", "/") + ".actions.ts",
    method: splitted[1],
  };
};
