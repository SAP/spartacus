/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { hasImplementsInterface } from './utils/implements-interface-utils';
import { isPropertyInitialized } from './utils/typescript-ast-utils';

export const RULE_NAME = 'ngrx-fail-action-must-initialize-error';
const ERROR_PROPERTY_NAME = 'error';
const ERROR_ACTION_INTERFACE = 'ErrorAction';

/**
 * ESLint rule that enforces proper error initialization in NgRx failure actions that implement the `ErrorAction` interface.
 *
 * This rule checks that any class implementing the `ErrorAction` interface and having 'Fail' in its name
 * properly initializes its `error` property, either through a constructor, property initializer or across the class hierarchy.
 *
 * **NOTE:** To ensure errors are properly handled in NgRx, failure actions that implements `ErrorAction` interface must have the `error` property initialized.
 * This allows the `ErrorActionService` to catch and forward them to the global `ErrorHandler`.
 * In Server-Side Rendering (SSR), this results in an Error Response to the client.
 * If an action fails without the `error` property set, the final HTML may be broken and returned with a 200 status, negatively impacting SEO.
 *
 * @example
 * // ❌ Invalid - error property not initialized
 * export class LoadProductFail implements ErrorAction {
 *   readonly type = LOAD_PRODUCT_FAIL;
 *   error: any; // Not initialized
 * }
 *
 * // ✅ Valid - error initialized in constructor
 * export class LoadProductFail implements ErrorAction {
 *   readonly type = LOAD_PRODUCT_FAIL;
 *   constructor(public error: any) {}
 * }
 *
 * // ✅ Valid - error initialized as property
 * export class LoadProductFail implements ErrorAction {
 *   readonly type = LOAD_PRODUCT_FAIL;
 *   error = 'error';
 * }
 *
 * // ✅ Valid - error initialized in parent class
 * class MyParentActionFail implements ErrorAction {
 *   readonly type = LOAD_PRODUCT_FAIL;
 *   error = 'error';
 * }
 *
 * export class LoadProductFail extends MyParentActionFail implements ErrorAction {
 *   readonly type = LOAD_PRODUCT_FAIL;
 * }
 */
export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensures declared `error` property in NgRx Failure Actions is initialized',
    },
    schema: [],
    messages: {
      missingErrorInitialization:
        '[Spartacus] NgRx Failure Action that implements `ErrorAction` interface must initialize the `error` property. You can do this in the constructor (e.g. `constructor(public error: Object) {}`) or as a property initializer (e.g. `this.error = <some-value>`)',
    },
    // Removing fixable since we don't want to enforce any particular initialization pattern
    fixable: undefined,
  },
  defaultOptions: [],
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    const checker = services.program.getTypeChecker();

    return {
      'ClassDeclaration[id.name=/Fail/]'(node: TSESTree.ClassDeclaration) {
        const classType = checker.getTypeAtLocation(
          services.esTreeNodeToTSNodeMap.get(node)
        );

        if (!hasImplementsInterface(node, ERROR_ACTION_INTERFACE)) {
          return;
        }

        if (!isPropertyInitialized(classType, ERROR_PROPERTY_NAME)) {
          context.report({
            node: node.id ?? node,
            messageId: 'missingErrorInitialization',
          });
        }
      },
    };
  },
});
