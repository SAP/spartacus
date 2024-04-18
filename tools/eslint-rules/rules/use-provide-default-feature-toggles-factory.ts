/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This file sets you up with structure needed for an ESLint rule.
 *
 * It leverages utilities from @typescript-eslint to allow TypeScript to
 * provide autocompletions etc for the configuration.
 *
 * Your rule's custom logic will live within the create() method below
 * and you can learn more about writing ESLint rules on the official guide:
 *
 * https://eslint.org/docs/developer-guide/working-with-rules
 *
 */

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/use-provide-default-feature-toggles-factory"
export const RULE_NAME = 'use-provide-default-feature-toggles-factory';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: ``,
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      useProvideDefaultFeatureTogglesFactory:
        '[Spartacus] provideFeatureTogglesFactory() is intended for library consumers. To allow for better extensibility, please provide default feature toggles factory inside Spartacus libraries using provideDefaultFeatureTogglesFactory().',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      'CallExpression[callee.name=provideFeatureTogglesFactory]'(
        node: TSESTree.CallExpression
      ) {
        context.report({
          node,
          messageId: 'useProvideDefaultFeatureTogglesFactory',
        });
      },
    };
  },
});
