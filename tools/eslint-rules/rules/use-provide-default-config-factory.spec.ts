import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './use-provide-default-config-factory';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

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
    }) as TSESLint.InvalidTestCase<'useProvideDefaultConfigFactory', never[]>, // type cast used as convertAnnotatedSourceToFailureCase simplifies testing, but TSESLint v6 requires never[] instead of readonly unknown[]
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
    }) as TSESLint.InvalidTestCase<'useProvideDefaultConfigFactory', never[]>, // type cast used as convertAnnotatedSourceToFailureCase simplifies testing, but TSESLint v6 requires never[] instead of readonly unknown[]
  ],
});
