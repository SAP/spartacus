import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './use-provide-default-feature-toggles';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

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
    }) as TSESLint.InvalidTestCase<'useProvideDefaultFeatureToggles', never[]>, // type cast used as convertAnnotatedSourceToFailureCase simplifies testing, but TSESLint v6 requires never[] instead of readonly unknown[]
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
    }) as TSESLint.InvalidTestCase<'useProvideDefaultFeatureToggles', never[]>, // type cast used as convertAnnotatedSourceToFailureCase simplifies testing, but TSESLint v6 requires never[] instead of readonly unknown[]
  ],
});
