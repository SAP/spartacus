import {
  convertAnnotatedSourceToFailureCase,
  RuleTester,
} from '@angular-eslint/test-utils';
import { rule, RULE_NAME } from './no-const-enum';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `enum Values = {}`,
    `enum Values = {
      Value = 1
      value = 2
    }`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'should fail because const enum was used',
      annotatedSource: `
        const enum LAUNCH_CALLER {
          DP_SHOW_CONFIRMATION_DIALOG = 'DP_SHOW_CONFIRMATION_DIALOG',
        }
      `,
      messageId: 'noConstEnum',
    }),
  ],
});
