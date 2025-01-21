import {
  convertAnnotatedSourceToFailureCase,
  RuleTester,
} from '@angular-eslint/test-utils';
import { rule, RULE_NAME } from './use-provide-default-feature-toggles';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `provideDefaultFeatureToggles(someFeatureToggles)`,
    `provideDefaultFeatureToggles(<someFeatureTogglesInterface>{
      test: true
    })`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'should fail when provideFeatureToggles is found and underline the entire call expression',
      annotatedSource: `
        providers: [
          provideFeatureToggles(someOtherFeatureToggles)
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ]
      `,
      messageId: 'useProvideDefaultFeatureToggles',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'should fail when provideFeatureToggles is found with inline provided config and underline the entire call expression',
      annotatedSource: `
        providers: [
          provideFeatureToggles(<someFeatureTogglesInterface>{
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            test: true
            ~~~~~~~~~~
          })
          ~~
        ]
      `,
      messageId: 'useProvideDefaultFeatureToggles',
    }),
  ],
});
