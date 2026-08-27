/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const stylelint = require('stylelint');
const { getFeatureToggleKeys } = require('./feature-toggles-keys');

const ruleName = 'spartacus/valid-for-feature-mixin-argument';
const MIXIN_NAME = 'forFeature';

const messages = stylelint.utils.ruleMessages(ruleName, {
  unknownKey: (key) =>
    `Unknown feature toggle "${key}" passed to @include ${MIXIN_NAME}(...). ` +
    `It must be a key of the "FeatureTogglesInterface" defined in ` +
    `core-libs/core/src/features-config/feature-toggles/config/feature-toggles.ts.`,
  nonStringLiteral: () =>
    `The first argument of @include ${MIXIN_NAME}(...) must be a static string literal ` +
    `(e.g. 'myFeatureFlag') so it can be statically validated against FeatureTogglesInterface.`,
  missingArgument: () =>
    `@include ${MIXIN_NAME}(...) requires a feature toggle key as its first argument.`,
});

const meta = {
  url:
    'https://github.com/SAP/spartacus/blob/develop/tools/stylelint-rules/rules/' +
    'valid-for-feature-mixin-argument/README.md',
};

/**
 * Matches the FIRST argument of `@include forFeature(...)`.
 *
 * Tolerates whitespace and a `using` / module-prefixed form (e.g. `features.forFeature('...')`).
 * Captures:
 *   1: full argument list (everything between the outer parens)
 */
const includeParamsRegex = /^\s*(?:[\w-]+\s*\.\s*)?forFeature\s*\(([\s\S]*)\)\s*$/;

/**
 * Splits an argument list on the TOP-LEVEL commas only.
 *
 * Needed because SCSS args may themselves contain commas inside strings,
 * maps `(a: 1, b: 2)` or function calls. For our use case it's overkill
 * (the first arg is supposed to be a string literal), but it's still safer
 * than a naive `String.split(',')`.
 */
function splitTopLevelArgs(argsString) {
  const result = [];
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let buf = '';

  for (let i = 0; i < argsString.length; i++) {
    const ch = argsString[i];
    const prev = i > 0 ? argsString[i - 1] : '';

    if (!inDouble && ch === "'" && prev !== '\\') {
      inSingle = !inSingle;
    } else if (!inSingle && ch === '"' && prev !== '\\') {
      inDouble = !inDouble;
    }

    if (!inSingle && !inDouble) {
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === ',' && depth === 0) {
        result.push(buf);
        buf = '';
        continue;
      }
    }
    buf += ch;
  }
  if (buf.length > 0) {
    result.push(buf);
  }
  return result.map((a) => a.trim());
}

/**
 * Matches a "bare" Sass identifier that is safe to treat as a static string.
 * Allowed: starts with a letter or underscore, followed by letters/digits/underscore/hyphen.
 *
 * Sass treats unquoted identifiers as `string` of unquoted type — so
 * `@include forFeature(myFlag)` is a perfectly legal alternative to
 * `@include forFeature('myFlag')`, and we should validate both.
 *
 * We intentionally REJECT anything that could be dynamic, namely tokens
 * containing `$` (variables), `#` (interpolation `#{...}`), parentheses
 * (function calls), spaces, dots (module access) etc.
 */
const BARE_IDENTIFIER_REGEX = /^[A-Za-z_][A-Za-z0-9_-]*$/;

/**
 * Returns the (unquoted) string value of `arg` if it is statically resolvable
 * — i.e. a quoted SCSS string literal OR a bare Sass identifier.
 * Returns `null` for anything dynamic (variables, interpolations, function calls, ...).
 */
function tryParseStringLiteral(arg) {
  if (
    (arg.startsWith("'") && arg.endsWith("'")) ||
    (arg.startsWith('"') && arg.endsWith('"'))
  ) {
    if (arg.length < 2) return null;
    return arg.slice(1, -1);
  }
  if (BARE_IDENTIFIER_REGEX.test(arg)) {
    return arg;
  }
  return null;
}

const ruleFunction = (primary) => {
  return (root, result) => {
    if (primary !== true) {
      return;
    }

    let validKeys;
    try {
      validKeys = getFeatureToggleKeys();
    } catch (err) {
      // We surface the failure as a stylelint warning on the file root so the
      // problem is visible, but we don't crash the whole lint run.
      stylelint.utils.report({
        message: `[${ruleName}] Failed to load FeatureTogglesInterface keys: ${err.message}`,
        node: root,
        result,
        ruleName,
      });
      return;
    }

    root.walkAtRules((atRule) => {
      if (atRule.name !== 'include') {
        return;
      }
      // `atRule.params` is everything after `@include` and before `{` or `;`.
      // Examples:
      //   "forFeature('myFlag')"
      //   "forFeature('myFlag', 'currentSelector')"
      //   "features.forFeature('myFlag')"
      const match = atRule.params.match(includeParamsRegex);
      if (!match) {
        return;
      }

      const rawArgs = match[1];
      const args = splitTopLevelArgs(rawArgs);

      if (args.length === 0 || args[0] === '') {
        stylelint.utils.report({
          message: messages.missingArgument(),
          node: atRule,
          result,
          ruleName,
          word: MIXIN_NAME,
        });
        return;
      }

      const firstArg = args[0];
      const literal = tryParseStringLiteral(firstArg);

      if (literal === null) {
        // Non-static argument (variable, expression, interpolation, ...).
        // We cannot statically verify it — warn so authors don't silently bypass the check.
        stylelint.utils.report({
          message: messages.nonStringLiteral(),
          node: atRule,
          result,
          ruleName,
          word: firstArg,
        });
        return;
      }

      if (!validKeys.has(literal)) {
        stylelint.utils.report({
          message: messages.unknownKey(literal),
          node: atRule,
          result,
          ruleName,
          word: literal,
        });
      }
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

module.exports = stylelint.createPlugin(ruleName, ruleFunction);
