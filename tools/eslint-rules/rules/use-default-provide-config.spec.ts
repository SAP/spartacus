import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './use-default-provide-config';

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
      messageId: 'useDefaultProvideConfig',
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
      messageId: 'useDefaultProvideConfig',
    }),
  ],
});
