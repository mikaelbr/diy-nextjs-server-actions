const { transformCode } = require("./transform-code");

module.exports = async function (source) {
  const file = this.resourcePath.match(/\/app\/(.*)\.actions\.ts/)[1];
  return transformCode(file, source);
};
