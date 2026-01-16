/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ESLintUtils } from '@typescript-eslint/utils';

export const RULE_NAME = 'no-const-enum';

/**
 * ESLint rule that enforces proper enum usage - because const enum's cannot be used together with the setting `isolatedModules: true`.
 *
 * @example
 * // ❌ Invalid - const enum was used
 *   const enum LAUNCH_CALLER {
 *     PICKUP_IN_STORE = 'PICKUP_IN_STORE',
 *   }
 *
 * // ✅ Valid - enum was used
 *  enum LAUNCH_CALLER {
 *    PICKUP_IN_STORE = 'PICKUP_IN_STORE',
 *  }
 */
export const rule =ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'forbid the usage of const enums',
    },
    schema: [],
    messages: {
      noConstEnum:
        "Usage of `const enum` is forbidden.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      TSEnumDeclaration(node) {
        if (node.const) {
          context.report({
            node,
            messageId: "noConstEnum",
          });
        }
      },
    };
  },
});
