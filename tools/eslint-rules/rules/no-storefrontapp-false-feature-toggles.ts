/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

export const RULE_NAME = 'no-storefrontapp-false-feature-toggles';

const DISABLE_NEXT_LINE_REGEX = /eslint-disable-next-line\s+(.+)/;
const CXSPA_REGEX = /CXSPA-\d+/;
export const RULE_PATTERN = /no-storefrontapp-false-feature-toggles(?!-)/;

function getProvideFeatureTogglesAncestor(
  node: TSESTree.Node
): TSESTree.CallExpression | null {
  let current: TSESTree.Node | undefined = node.parent;
  while (current) {
    if (
      current.type === 'CallExpression' &&
      current.callee.type === 'Identifier' &&
      (current.callee.name === 'provideFeatureToggles' ||
        current.callee.name === 'provideFeatureTogglesFactory')
    ) {
      return current as TSESTree.CallExpression;
    }
    current = current.parent;
  }
  return null;
}

/**
 * ESLint rule that enforces feature toggles are set to true inside provideFeatureToggles()
 * or provideFeatureTogglesFactory() in the storefrontapp.
 *
 * The storefrontapp is the internal example app used for development and testing. All feature
 * toggles should be enabled so that developers exercise new code paths daily, mirroring
 * the experience of newly-created customer apps where installation schematics enable all
 * toggles by default.
 *
 * Setting a toggle to false is only justified when the backend feature is available to
 * customers but the local dev/CI backend doesn't support it yet. In that case, suppress
 * with an eslint-disable-next-line comment that includes a CXSPA ticket reference:
 *
 * @example
 * // ❌ Invalid - toggle set to false without justification
 * provideFeatureToggles({ myToggle: false })
 *
 * // ❌ Invalid - disable comment without CXSPA ticket
 * // eslint-disable-next-line @nx/workspace-no-storefrontapp-false-feature-toggles
 * myToggle: false,
 *
 * // ✅ Valid - toggle set to true
 * provideFeatureToggles({ myToggle: true })
 *
 * // ✅ Valid - false with CXSPA ticket documenting why backend isn't ready
 * // eslint-disable-next-line @nx/workspace-no-storefrontapp-false-feature-toggles -- CXSPA-12345: enable once CI backend supports it
 * myToggle: false,
 */
export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallows feature toggles set to false inside provideFeatureToggles() or provideFeatureTogglesFactory() in the storefrontapp',
    },
    schema: [],
    messages: {
      noFalseFeatureToggle:
        '[Spartacus] Feature toggle "{{name}}" must be set to true in the storefrontapp. ' +
        'All feature toggles should be enabled to exercise new code paths during development. ' +
        'If the backend does not yet support this feature in CI, suppress this error with: ' +
        '// eslint-disable-next-line @nx/workspace-no-storefrontapp-false-feature-toggles -- CXSPA-XXXXX: <reason>',
      missingCxspaTicket:
        '[Spartacus] The eslint-disable-next-line directive for "no-storefrontapp-false-feature-toggles" must include a ' +
        'CXSPA ticket reference (e.g., -- CXSPA-12345: enable once CI backend supports the feature).',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      'Property[value.type="Literal"][value.value=false]'(
        node: TSESTree.Property
      ) {
        if (!getProvideFeatureTogglesAncestor(node)) {
          return;
        }
        const keyName =
          node.key.type === 'Identifier' ? node.key.name : 'unknown';
        context.report({
          node: node.value as TSESTree.Literal,
          messageId: 'noFalseFeatureToggle',
          data: { name: keyName },
        });
      },

      // Validate that disable comments for this rule include a CXSPA ticket reference.
      // Reports on the comment line itself, which is not suppressed by the same disable directive.
      'Program:exit'() {
        const sourceCode = context.sourceCode;
        const comments = sourceCode.getAllComments();

        for (const comment of comments) {
          if (comment.type !== 'Line') {
            continue;
          }
          const match = comment.value.match(DISABLE_NEXT_LINE_REGEX);
          if (!match) {
            continue;
          }
          if (!RULE_PATTERN.test(match[1])) {
            continue;
          }
          if (!CXSPA_REGEX.test(comment.value)) {
            context.report({
              loc: comment.loc,
              messageId: 'missingCxspaTicket',
            });
          }
        }
      },
    };
  },
});
