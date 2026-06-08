/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

export const RULE_NAME = 'feature-toggles-must-be-private';

/**
 * ESLint rule that enforces that `FeatureToggles` must always be injected
 * as a private property.
 *
 * Reason: same as for `FeatureConfigService` (see
 * `feature-config-service-must-be-private`). Feature toggles are an internal
 * implementation detail. Exposing the injected `FeatureToggles` token as
 * `protected` / `public` leaks the toggle-checking surface into our
 * customer-facing extension API. Once a toggle is removed (which is the
 * normal end-of-life of a toggle), removing the property would become a
 * Typescript breaking change for customers who reference it from a subclass.
 *
 * Counterpart of `feature-config-service-must-be-private` for the alternative
 * way of consuming feature flags (`inject(FeatureToggles)` is preferred over
 * `inject(FeatureConfigService)` inside `provideDefaultConfigFactory()` to
 * avoid circular DI).
 *
 * @example
 * // ❌ Invalid - no access modifier (defaults to public)
 * featureToggles = inject(FeatureToggles);
 *
 * // ❌ Invalid - protected modifier
 * protected featureToggles = inject(FeatureToggles);
 *
 * // ❌ Invalid - public modifier
 * public featureToggles = inject(FeatureToggles);
 *
 * // ✅ Valid - private modifier
 * private featureToggles = inject(FeatureToggles);
 *
 * // ✅ Valid - private modifier with readonly
 * private readonly featureToggles = inject(FeatureToggles);
 *
 * // ✅ Valid - different property name is fine
 * private toggles = inject(FeatureToggles);
 */
export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensures that FeatureToggles is always injected as a private property',
    },
    schema: [],
    messages: {
      featureTogglesMustBePrivate:
        '[Spartacus] FeatureToggles must be injected as a private property. Add the "private" modifier to this property.',
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    return {
      // Use CSS-like selector to efficiently filter only properties that:
      // 1. Have a CallExpression as value
      // 2. Call the 'inject' function
      // 3. Pass 'FeatureToggles' as the first argument
      'PropertyDefinition[value.type="CallExpression"][value.callee.name="inject"][value.arguments.0.name="FeatureToggles"]'(
        node: TSESTree.PropertyDefinition
      ) {
        // Check if the property has the 'private' modifier
        const hasPrivateModifier = node.accessibility === 'private';

        if (!hasPrivateModifier) {
          context.report({
            node,
            messageId: 'featureTogglesMustBePrivate',
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
              const insertPosition = propertyStart;

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
