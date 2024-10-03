import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './use-provide-default-feature-toggles-factory';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

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
    }) as TSESLint.InvalidTestCase<
      'useProvideDefaultFeatureTogglesFactory',
      never[]
    >, // type cast used as convertAnnotatedSourceToFailureCase simplifies testing, but TSESLint v6 requires never[] instead of readonly unknown[]
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
    }) as TSESLint.InvalidTestCase<
      'useProvideDefaultFeatureTogglesFactory',
      never[]
    >, // type cast used as convertAnnotatedSourceToFailureCase simplifies testing, but TSESLint v6 requires never[] instead of readonly unknown[]
  ],
});
