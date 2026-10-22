/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuleTester } from '@angular-eslint/test-utils';
import * as templateParser from '@angular-eslint/template-parser';
import { rule, RULE_NAME } from './no-hardcoded-text';

const ruleTester = new RuleTester({
  languageOptions: { parser: templateParser },
});

// The rule only lints external `.html` component templates, so every test case
// must be given an `.html` filename.
const FILENAME = 'test.component.html';

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // Translated text via the cxTranslate pipe (BoundText - not visited).
    { code: `{{ 'myKey' | cxTranslate }}`, filename: FILENAME },
    // Interpolated/bound values are dynamic, not hardcoded.
    { code: `<span>{{ product?.name }}</span>`, filename: FILENAME },
    // Control-flow blocks must NOT be flagged (the whole reason for this rule).
    {
      code: `@if (loading$ | async) {
        <span>{{ 'spinner.loading' | cxTranslate }}</span>
      }`,
      filename: FILENAME,
    },
    {
      code: `@for (item of items; track item) {
        <li>{{ item.name }}</li>
      }`,
      filename: FILENAME,
    },
    {
      code: `@switch (type) {
        @case ('a') { {{ 'x' | cxTranslate }} }
        @default { {{ 'y' | cxTranslate }} }
      }`,
      filename: FILENAME,
    },
    // Bound attributes are dynamic.
    {
      code: `<img [alt]="'product.image' | cxTranslate" />`,
      filename: FILENAME,
    },
    {
      code: `<button [attr.aria-label]="'close' | cxTranslate"></button>`,
      filename: FILENAME,
    },
    // Non-translatable literal attributes are ignored.
    {
      code: `<div class="cx-foo" id="bar" role="button"></div>`,
      filename: FILENAME,
    },
    // Whitespace / punctuation / numbers only.
    { code: `<span>{{ count }} / {{ total }}</span>`, filename: FILENAME },
    // Inline templates (virtual filename) are out of scope.
    {
      code: `<div>Hardcoded Hello World</div>`,
      filename: 'inline-template-foo.component.html',
    },
    // Text inside ignored tags (script/style/pre/code) is not user-facing copy.
    { code: `<pre>Hardcoded Here</pre>`, filename: FILENAME },
    { code: `<code>const x = oneTwo;</code>`, filename: FILENAME },
  ],
  invalid: [
    {
      code: `<div>Hardcoded Hello World</div>`,
      filename: FILENAME,
      errors: [{ messageId: 'hardcodedText' }],
    },
    {
      code: `<img alt="A product image" />`,
      filename: FILENAME,
      errors: [{ messageId: 'hardcodedAttribute' }],
    },
    {
      code: `<input placeholder="Enter your name" />`,
      filename: FILENAME,
      errors: [{ messageId: 'hardcodedAttribute' }],
    },
    {
      code: `<button title="Click me" aria-label="Close dialog"></button>`,
      filename: FILENAME,
      errors: [
        { messageId: 'hardcodedAttribute' },
        { messageId: 'hardcodedAttribute' },
      ],
    },
    {
      // Hardcoded text still flagged when mixed with control-flow around it.
      code: `@if (expanded) {
        <div>Some visible label</div>
      }`,
      filename: FILENAME,
      errors: [{ messageId: 'hardcodedText' }],
    },
  ],
});
