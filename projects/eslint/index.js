// eslint/index.js
module.exports = {
  rules: {
    'use-default-provide-config': {
      meta: {
        docs: {
          description:
            'Ensures that we do not use provideConfig() in library modules as this method should enable users to override default configurations. Use provideDefaultConfig() instead to make sure that consumers can use provideConfig() to override configurations.',
        },
      },
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
