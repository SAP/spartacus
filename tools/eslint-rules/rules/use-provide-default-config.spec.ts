import {
  convertAnnotatedSourceToFailureCase,
  RuleTester,
} from '@angular-eslint/test-utils';
import { rule, RULE_NAME } from './use-provide-default-config';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `provideDefaultConfig(someConfig)`,
    `provideDefaultConfig(<someConfigInterface>{
      test: true
    })`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'should fail when provideConfig is found and underline the entire call expression',
      annotatedSource: `
        providers: [
          provideConfig(someOtherConfig)
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ]
      `,
      messageId: 'useProvideDefaultConfig',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'should fail when provideConfig is found with inline provided config and underline the entire call expression',
      annotatedSource: `
        providers: [
          provideConfig(<someConfigInterface>{
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            test: true
            ~~~~~~~~~~
          })
          ~~
        ]
      `,
      messageId: 'useProvideDefaultConfig',
    }),
  ],
});
