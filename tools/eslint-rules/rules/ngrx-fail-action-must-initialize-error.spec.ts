/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuleTester } from '@angular-eslint/test-utils';
import { join } from 'path';
import { rule, RULE_NAME } from './ngrx-fail-action-must-initialize-error';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      project: '../../tsconfig.spec.json',
      tsconfigRootDir: join(__dirname, '/fixtures'),
    },
  },
});

const filename = 'file.ts';

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      name: 'Property initializer',
      code: `
        export interface ErrorAction {
          error: Object;
        }

        export class SearchProductsFail implements ErrorAction {
            readonly type = SEARCH_PRODUCTS_FAIL;
            error = 'some error'; // Property initializer
        }
      `,
      filename,
    },
    {
      name: 'Constructor parameter',
      code: `
        export interface ErrorAction {
          error: Object;
        }

        export class SearchProductsFail implements ErrorAction {
            readonly type = SEARCH_PRODUCTS_FAIL;
            constructor(public error: any) {} // Constructor parameter
        }
      `,
      filename,
    },
    {
      name: 'Constructor assignment',
      code: `
        export interface ErrorAction {
          error: Object;
        }

        export class SearchProductsFail implements ErrorAction {
            readonly type = SEARCH_PRODUCTS_FAIL;
            error: Object;
            constructor(public payload: any) {
                this.error = payload; // Constructor assignment
            }
        }
      `,
      filename,
    },
    {
      name: 'Constructor body assignment',
      code: `
        export interface ErrorAction {
          error: Object;
        }

        export class SearchProductsFail implements ErrorAction {
            readonly type = SEARCH_PRODUCTS_FAIL;
            error: any;
            constructor() {
                this.error = 'error'; // Constructor body assignment
            }
        }
      `,
      filename,
    },
    {
      name: 'Class not implementing ErrorAction',
      code: `
        export interface ErrorAction {
          error: Object;
        }

        export class SearchProductsFail {
            readonly type = SEARCH_PRODUCTS_FAIL;
          constructor(public payload: any) {}
        }
      `,
      filename,
    },
    {
      name: 'Class with Fail but not implementing ErrorAction',
      code: `
        export class LoadProductsFail {
            readonly type = LOAD_PRODUCTS_FAIL;
            constructor(public payload: Error) {}
        }
      `,
      filename,
    },
    {
      name: 'Multiple interfaces implementation',
      code: `
        export interface ErrorAction { 
          error: Object; 
        }
        
        export interface PayloadAction { 
          payload: any; 
        }
        
        export class ComplexFail implements ErrorAction, PayloadAction {
          readonly type = COMPLEX_FAIL;
          constructor(public payload: any) {
            this.error = payload;
          }
        }
      `,
      filename,
    },
    {
      name: 'Inheritance case',
      code: `
        export interface ErrorAction { error: Object; }
        export class ParentFailAction implements ErrorAction {
          error = new Error();
        }
        export class DerivedFail extends ParentFailAction {
          readonly type = DERIVED_FAIL;
        }
      `,
      filename,
    },
    {
      name: 'Inheritance case - with constructor param',
      code: `
        export interface ErrorAction { error: Object; }
        export class ParentFailAction implements ErrorAction {
          constructor(public error: Object) {};
        }
        export class DerivedFail extends ParentFailAction {
          readonly type = DERIVED_FAIL;
        }
      `,
      filename,
    },
    {
      name: 'Inheritance case - parent does not implement ErrorAction',
      code: `
        export interface ErrorAction { error: Object; }
        export class ParentFailAction {
          constructor(public error: Object) {};
        }
        export class DerivedFail extends ParentFailAction implements ErrorAction {
          readonly type = DERIVED_FAIL;
        }
      `,
      filename,
    },
    {
      name: 'Grandparent inheritance case - with constructor param',
      code: `  
        export interface ErrorAction { error: Object; }  
        export class GrandparentFailAction implements ErrorAction {  
          constructor(public error: Object) {}; 
        }  
        export class ParentFailAction extends GrandparentFailAction {  
          readonly type = PARENT_FAIL;  
        }  
        export class ChildFailAction extends ParentFailAction {  
          readonly type = CHILD_FAIL;  
        }  
      `,
      filename,
    },
    {
      name: 'Grandparent inheritance case',
      code: `  
        export interface ErrorAction { error: Object; }  
        export class GrandparentActionFail implements ErrorAction {  
          error = new Error();  
        }  
        export class ParentActionFail extends GrandparentActionFail {  
          readonly type = PARENT_FAIL;  
        }  
        export class ChildActionFail extends ParentActionFail {  
          readonly type = CHILD_FAIL;  
        }  
      `,
      filename,
    },
    {
      name: 'Grandparent inheritance case - grandparent does not implement ErrorAction',
      code: `  
        export interface ErrorAction { error: Object; }  
        export class GrandparentActionFail {  
          error = new Error();  
        }  
        export class ParentActionFail extends GrandparentActionFail {  
          readonly type = PARENT_FAIL;  
        }  
        export class ChildActionFail extends ParentActionFail implements ErrorAction {  
          readonly type = CHILD_FAIL;  
        }  
      `,
      filename,
    },
  ],
  invalid: [
    {
      name: 'Missing error initialization in class',
      code: `
        export interface ErrorAction {
          error: Object;
        }

        export class SearchProductsFail implements ErrorAction {
          readonly type = SEARCH_PRODUCTS_FAIL;
          error: Object;
          constructor(public payload: any) {}
        }
      `,
      errors: [
        { messageId: 'missingErrorInitialization', line: 6, column: 22 },
      ],
      filename,
    },
    {
      name: 'Missing error initialization in class',
      code: `
        export interface ErrorAction {
          error: Object;
        }

        export class SearchProductsFail implements ErrorAction {
          readonly type = SEARCH_PRODUCTS_FAIL;
          error: Object;
        }
      `,
      errors: [
        { messageId: 'missingErrorInitialization', line: 6, column: 22 },
      ],
      filename,
    },
    {
      name: 'Missing error initialization in inherited class',
      code: `
        export interface ErrorAction { 
          error: Object; 
        }
        
        export class BaseFailAction implements ErrorAction {
          error: Error;
        }
       
        export class DerivedFail extends BaseFailAction implements ErrorAction {
          readonly type = DERIVED_FAIL;
        }
      `,
      errors: [
        { messageId: 'missingErrorInitialization', line: 6, column: 22 }, // BaseFailAction
        { messageId: 'missingErrorInitialization', line: 10, column: 22 }, // DerivedFail
      ],
      filename,
    },
    {
      name: 'Multiple interfaces with uninitialized error',
      code: `
        export interface ErrorAction { 
          error: Object;
        }
        
        export interface PayloadAction { 
          payload: any; 
        }
        
        export class ComplexFail implements ErrorAction, PayloadAction {
          readonly type = COMPLEX_FAIL;
          payload = {};
          error: Object;
        }
      `,
      errors: [
        { messageId: 'missingErrorInitialization', line: 10, column: 22 }, // ComplexFail
      ],
      filename,
    },
    {
      name: 'Typed error property without initialization',
      code: `
        export interface ErrorAction { 
          error: Object;
        }
        
        export class TypedFail implements ErrorAction {
          readonly type = TYPED_FAIL;
          error: Object;
        }
      `,
      errors: [
        { messageId: 'missingErrorInitialization', line: 6, column: 22 },
      ],
      filename,
    },
  ],
});
