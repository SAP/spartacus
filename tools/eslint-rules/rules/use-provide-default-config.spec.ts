import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './use-provide-default-config';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

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
    }) as TSESLint.InvalidTestCase<'useProvideDefaultConfig', never[]>, // type cast used as convertAnnotatedSourceToFailureCase simplifies testing, but TSESLint v6 requires never[] instead of readonly unknown[]
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
    }) as TSESLint.InvalidTestCase<'useProvideDefaultConfig', never[]>, // type cast used as convertAnnotatedSourceToFailureCase simplifies testing, but TSESLint v6 requires never[] instead of readonly unknown[]
  ],
});
