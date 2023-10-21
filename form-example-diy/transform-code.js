const babel = require("@babel/core");
const recast = require("recast");

const functionName = "autoWrapper";
const moduleName = "@/app/wrapper";

module.exports.transformCode = function transformCode(filename, code) {
  const result = babel.transformSync(code, {
    plugins: [
      function transformer({ types: t }) {
        return {
          name: "ast-transform", // not required
          visitor: {
            Program(path) {
              path.unshiftContainer("body", [
                t.importDeclaration(
                  [
                    t.importSpecifier(
                      t.identifier(functionName),
                      t.identifier(functionName)
                    ),
                  ],
                  t.stringLiteral(moduleName)
                ),
              ]);
            },

            ExportNamedDeclaration(path) {
              const decl = path.node.declaration.declarations[0];
              const child = decl.init;
              if (child) {
                path.node.declaration.declarations[0].init = t.callExpression(
                  t.identifier(functionName),
                  [
                    t.objectExpression([
                      t.objectProperty(
                        t.identifier("file"),
                        t.stringLiteral(filename)
                      ),
                      t.objectProperty(
                        t.identifier("method"),
                        t.stringLiteral(decl.id.name)
                      ),
                    ]),
                    child,
                  ]
                );
              }
            },
          },
        };
      },
    ],

    parserOpts: {
      parser: recast.parse,
      plugins: [
        "asyncGenerators",
        "bigInt",
        "classPrivateMethods",
        "classPrivateProperties",
        "classProperties",
        ["decorators", { decoratorsBeforeExport: false }],
        "doExpressions",
        "dynamicImport",
        "exportDefaultFrom",
        "exportNamespaceFrom",
        "flow",
        "flowComments",
        "functionBind",
        "functionSent",
        "importMeta",
        "jsx",
        "logicalAssignment",
        "nullishCoalescingOperator",
        "numericSeparator",
        "objectRestSpread",
        "optionalCatchBinding",
        "optionalChaining",
        ["pipelineOperator", { proposal: "minimal" }],
        "throwExpressions",
      ],
    },

    generatorOpts: {
      generator: recast.print,
    },
  });

  return result.code;
};
