// It's fun to write JavaScript
const stylelint = require('stylelint');

const ruleName = 'spartacus/comment-no-loud';
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: 'Expected // for comments instead of /*',
});

module.exports = stylelint.createPlugin(ruleName, function () {
  return function (root, result) {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      // No options
    });

    if (!validOptions) {
      return;
    }

    root.walkComments((comment) => {
      if (isLoudComment(comment)) {
        stylelint.utils.report({
          message: messages.expected,
          node: comment,
          result,
          ruleName,
        });
      }
    });
  };
});

function isLoudComment(comment) {
  const regex = new RegExp(/^[ \t\n]*\/\*(?!\!)/);

  const splitComment = comment.source.input.css.split('\n');
  const commentFirstLine = splitComment[comment.source.start.line - 1];

  return regex.test(commentFirstLine);
}

module.exports.ruleName = ruleName;
module.exports.messages = messages;
