/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import {
  fixMissingImplementsInterface,
  hasImplementsInterface,
} from './utils/implements-interface-utils';
import { fixPossiblyMissingImport } from './utils/import-utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/no-ngrx-fail-action-without-error-action-implementation"
export const RULE_NAME =
  'no-ngrx-fail-action-without-error-action-implementation';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: ``,
    },
    schema: [], // no options
    messages: {
      missingImplementsErrorAction:
        '[Spartacus] NgRx Failure Action class should have `implements ErrorAction`. Otherwise it might be not handled properly by `ErrorActionService`',
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    return {
      'ClassDeclaration[id.name=/Fail/]'(node: TSESTree.ClassDeclaration) {
        const Constants = {
          ErrorAction: 'ErrorAction',
          SpartacusCore: '@spartacus/core',
        };

        if (!hasImplementsInterface(node, Constants.ErrorAction)) {
          context.report({
            node: node.id ?? node,
            messageId: 'missingImplementsErrorAction',
            fix(fixer) {
              const sourceCode = context.sourceCode;
              return [
                ...fixMissingImplementsInterface({
                  node,
                  interfaceName: Constants.ErrorAction,
                  sourceCode,
                  fixer,
                }),

                ...fixPossiblyMissingImport({
                  importedIdentifier: Constants.ErrorAction,
                  importPath: Constants.SpartacusCore,
                  sourceCode,
                  fixer,
                }),
              ];
            },
          });
        }
      },
    };
  },
});
