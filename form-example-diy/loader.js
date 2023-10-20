const { toId } = require("./action-utils.js");

const signatureMatcher = /^export async function ([^\(]+)/gm;

module.exports = function (source) {
  const file = this.resourcePath.match(/\/app\/(.*)\.actions\.ts/)[1];
  return source.replace(signatureMatcher, function (match, method) {
    const extra = `${method}.valueOf = "/react?id=${toId({ file, method })}";`;
    return `${extra}\n${match}`;
  });
};
