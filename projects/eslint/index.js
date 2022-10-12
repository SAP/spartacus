// eslint/index.js
module.exports = {
  rules: {
    'use-default-provide-config': {
      create: function (context) {
        const selector = 'CallExpression[callee.name=provideConfig]';
        const message =
          '[Spartacus] provideConfig() is intended for library consumers. To allow for better extensibility, please provide default configs inside Spartacus libraries using provideDefaultConfig().';

        return {
          [selector](node) {
            context.report({
              node,
              message,
            });
          },
        };
      },
    },
  },
};
