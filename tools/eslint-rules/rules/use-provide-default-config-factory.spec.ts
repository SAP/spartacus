import {
  convertAnnotatedSourceToFailureCase,
  RuleTester,
} from '@angular-eslint/test-utils';
import { rule, RULE_NAME } from './use-provide-default-config-factory';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `provideDefaultConfigFactory(someConfig)`,
    `provideDefaultConfigFactory(<someConfigInterface>{
      test: true
    })`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'should fail when provideConfigFactory is found and underline the entire call expression',
      annotatedSource: `
        providers: [
          provideConfigFactory(someOtherConfig)
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ]
      `,
      messageId: 'useProvideDefaultConfigFactory',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'should fail when provideConfigFactory is found with inline provided config and underline the entire call expression',
      annotatedSource: `
        providers: [
          provideConfigFactory(<someConfigInterface>{
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            test: true
            ~~~~~~~~~~
          })
          ~~
        ]
      `,
      messageId: 'useProvideDefaultConfigFactory',
    }),
  ],
});
