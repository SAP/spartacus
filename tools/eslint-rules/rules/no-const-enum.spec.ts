import {
  RuleTester,
} from '@angular-eslint/test-utils';
import { rule, RULE_NAME } from './no-const-enum';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `enum Values {
      value = 'value',
    }`
  ],
  invalid: [
    {
      code: `const enum Color { Red, Green, Blue }`,
      errors: [{messageId: "noConstEnum"}]
    }
  ],
});
