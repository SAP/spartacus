import {
  convertAnnotatedSourceToFailureCase,
  RuleTester,
} from '@angular-eslint/test-utils';
import { rule, RULE_NAME } from './use-provide-default-feature-toggles-factory';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `provideDefaultFeatureTogglesFactory(someFeatureTogglesFactory)`,
    `provideDefaultFeatureTogglesFactory(() => {
      test: true
    })`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'should fail when provideFeatureTogglesFactory is found and underline the entire call expression',
      annotatedSource: `
        providers: [
          provideFeatureTogglesFactory(someFeatureTogglesFactory)
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ]
      `,
      messageId: 'useProvideDefaultFeatureTogglesFactory',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'should fail when provideFeatureTogglesFactory is found with inline provided config and underline the entire call expression',
      annotatedSource: `
        providers: [
          provideFeatureTogglesFactory(() => {
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            test: true
            ~~~~~~~~~~
          })
          ~~
        ]
      `,
      messageId: 'useProvideDefaultFeatureTogglesFactory',
    }),
  ],
});
