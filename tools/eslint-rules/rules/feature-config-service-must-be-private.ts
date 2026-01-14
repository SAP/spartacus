/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

export const RULE_NAME = 'feature-config-service-must-be-private';

/**
 * ESLint rule that enforces that FeatureConfigService must always be injected as a private property.
 *
 * Reason: we don't want expose such properties in public API, because we want to be able to remove
 *         them easily (without causing Typescript breaking changes) anytime later
 *
 * This rule ensures that all properties injected with FeatureConfigService have the 'private' access modifier.
 * Properties without an explicit modifier are public by default in TypeScript, which this rule prevents.
 * Protected or public FeatureConfigService properties are also not allowed.
 *
 * @example
 * // ❌ Invalid - no access modifier (defaults to public)
 * featureConfigService = inject(FeatureConfigService);
 *
 * // ❌ Invalid - protected modifier
 * protected featureConfigService = inject(FeatureConfigService);
 *
 * // ❌ Invalid - public modifier
 * public featureConfigService = inject(FeatureConfigService);
 *
 * // ✅ Valid - private modifier
 * private featureConfigService = inject(FeatureConfigService);
 *
 * // ✅ Valid - private modifier with readonly
 * private readonly featureConfigService = inject(FeatureConfigService);
 *
 * // ✅ Valid - different property name is fine
 * private featureConfig = inject(FeatureConfigService);
 */
export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensures that FeatureConfigService is always injected as a private property',
    },
    schema: [],
    messages: {
      featureConfigServiceMustBePrivate:
        '[Spartacus] FeatureConfigService must be injected as a private property. Add the "private" modifier to this property.',
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    return {
      // Use CSS-like selector to efficiently filter only properties that:
      // 1. Have a CallExpression as value
      // 2. Call the 'inject' function
      // 3. Pass 'FeatureConfigService' as the first argument
      'PropertyDefinition[value.type="CallExpression"][value.callee.name="inject"][value.arguments.0.name="FeatureConfigService"]'(
        node: TSESTree.PropertyDefinition
      ) {
        // Check if the property has the 'private' modifier
        const hasPrivateModifier = node.accessibility === 'private';

        if (!hasPrivateModifier) {
          context.report({
            node,
            messageId: 'featureConfigServiceMustBePrivate',
            fix(fixer) {
              // Add 'private' modifier at the start of the property
              const sourceCode = context.sourceCode;
              const propertyStart = node.range[0];

              // Get any decorators before the property
              const decorators = node.decorators || [];

              // If there's a 'protected' or 'public' modifier, we need to replace it
              if (
                node.accessibility === 'protected' ||
                node.accessibility === 'public'
              ) {
                // Find the modifier token and replace it
                const tokens = sourceCode.getTokens(node);
                const modifierToken = tokens.find(
                  (token) =>
                    token.value === 'protected' || token.value === 'public'
                );

                if (modifierToken) {
                  return fixer.replaceText(modifierToken, 'private');
                }
              }

              // Otherwise, insert 'private ' at the appropriate position
              let insertPosition = propertyStart;

              // If there are decorators, we need to insert after them
              if (decorators.length > 0) {
                const lastDecorator = decorators[decorators.length - 1];
                const afterDecorator = lastDecorator.range[1];

                // Insert right after the decorator, the space will be preserved
                return fixer.insertTextAfterRange(
                  [afterDecorator, afterDecorator],
                  ' private'
                );
              }

              // No decorators, insert at the property start
              return fixer.insertTextBeforeRange(
                [insertPosition, insertPosition],
                'private '
              );
            },
          });
        }
      },
    };
  },
});
